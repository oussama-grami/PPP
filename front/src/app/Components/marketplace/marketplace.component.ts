import {Component, OnInit} from '@angular/core';
import {Project} from "../../Models/project";
import {ProjectsService} from "../../Service/projects.service";
import {RoutesEnum} from "../../enumerations/Routes.enum";
import {forkJoin, Observable, of} from "rxjs";
import {mergeMap, map, finalize} from "rxjs/operators";

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css']
})
export class MarketplaceComponent implements OnInit {
  protected readonly RoutesEnum = RoutesEnum;
  public projects: Project[] = [];
  public displayedProjects: Project[] = [];
  countryFilters = ["South Africa", "Algeria", "Angola", "Tunisia"];
  typeFilters = ["Trees & Forests", "Biodiversity", "Renewable energies", "Waste management", "Soil management", "Tree planting"];
  isCertifiedChecked = false;
  isUncertifiedChecked = false;
  certification: boolean | null = null;
  mechanismType: string | null = null;
  public numberOfProjects = this.projects.length;
  public totalPages = Math.round(this.numberOfProjects/9);
  public currentPage: number = 1;
  isLoading = false;

  selectedCountries: Map<string, boolean> = new Map();
  selectedTypes: Map<string, boolean> = new Map();

  constructor(private projectService: ProjectsService) {
    // Initialiser les maps avec false (non coché)
    this.countryFilters.forEach(country => this.selectedCountries.set(country, false));
    this.typeFilters.forEach(type => this.selectedTypes.set(type, false));
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.isLoading = true;
    this.projectService.getProjects().pipe(
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe(data => {
      this.projects = data;
      this.numberOfProjects = this.projects.length;
      this.totalPages = Math.ceil(this.numberOfProjects / 9);
      this.displayedProjects = this.projects.slice(0, 9);
      console.log(this.projects);
    });
  }

  applyFilters() {
    // Activer le spinner pendant le chargement
    this.isLoading = true;

    // Récupérer les filtres actifs
    const selectedCountries = Array.from(this.selectedCountries.entries())
      .filter(([_, isSelected]) => isSelected)
      .map(([country, _]) => country);

    const selectedTypes = Array.from(this.selectedTypes.entries())
      .filter(([_, isSelected]) => isSelected)
      .map(([type, _]) => type);

    // Mise à jour de selectedFilters pour l'affichage
    this.selectedFilters = [
      ...selectedCountries,
      ...selectedTypes
    ];

    // Ajout des filtres de certification si sélectionnés
    if (this.certification === true) {
      this.selectedFilters.push("Certified");
    } else if (this.certification === false) {
      this.selectedFilters.push("Uncertified");
    }

    // Ajout du filtre de mécanisme si sélectionné
    if (this.mechanismType) {
      this.selectedFilters.push(this.mechanismType);
    }

    // Comme le backend n'accepte pas de tableaux pour les filtres pays et types,
    // nous devons faire plusieurs requêtes pour simuler une logique "OU"

    if (selectedCountries.length > 0 || selectedTypes.length > 0) {
      // Combinaisons de filtres à appliquer
      const filterCombinations: Array<{
        country?: string,
        category?: string,
        cost?: number,
        certified?: boolean | null,
        mechanism?: string | null,
        name?: string
      }> = [];

      // Si aucun pays n'est sélectionné, on utilise null (une seule requête)
      if (selectedCountries.length === 0) {
        if (selectedTypes.length === 0) {
          // Aucun pays, aucun type - une seule requête avec les autres filtres
          filterCombinations.push({
            cost: this.priceFilter !== 99 ? this.priceFilter : undefined,
            certified: this.certification,
            mechanism: this.mechanismType
          });
        } else {
          selectedTypes.forEach(type => {
            filterCombinations.push({
              category: type,
              cost: this.priceFilter !== 99 ? this.priceFilter : undefined,
              certified: this.certification,
              mechanism: this.mechanismType
            });
          });
        }
      } else {
        if (selectedTypes.length === 0) {
          // Plusieurs pays, aucun type - une requête par pays
          selectedCountries.forEach(country => {
            filterCombinations.push({
              country: country,
              cost: this.priceFilter !== 99 ? this.priceFilter : undefined,
              certified: this.certification,
              mechanism: this.mechanismType
            });
          });
        } else {
          // Plusieurs pays, plusieurs types - combinaison de pays et types
          selectedCountries.forEach(country => {
            selectedTypes.forEach(type => {
              filterCombinations.push({
                country: country,
                category: type,
                cost: this.priceFilter !== 99 ? this.priceFilter : undefined,
                certified: this.certification,
                mechanism: this.mechanismType
              });
            });
          });
        }
      }

      // Exécuter toutes les requêtes et fusionner les résultats
      const requests: Observable<Project[]>[] = filterCombinations.map(filter =>
        this.projectService.getFilteredProjects(filter)
      );

      forkJoin(requests).pipe(
        finalize(() => {
          this.isLoading = false;
        })
      ).subscribe(results => {
        // Fusionner tous les résultats et éliminer les doublons
        const allProjects = results.flat();
        const uniqueProjects = this.removeDuplicates(allProjects);

        this.projects = uniqueProjects;
        this.numberOfProjects = this.projects.length;
        this.totalPages = Math.ceil(this.numberOfProjects / 9);
        this.currentPage = 1;
        this.displayedProjects = this.projects.slice(0, 9);
      });
    } else {
      // Aucun filtre de pays ou type, simple requête avec les autres filtres
      this.projectService.getFilteredProjects({
        cost: this.priceFilter !== 99 ? this.priceFilter : undefined,
        certified: this.certification,
        mechanism: this.mechanismType
      }).pipe(
        finalize(() => {
          this.isLoading = false;
        })
      ).subscribe(filteredProjects => {
        this.projects = filteredProjects;
        this.numberOfProjects = this.projects.length;
        this.totalPages = Math.ceil(this.numberOfProjects / 9);
        this.currentPage = 1;
        this.displayedProjects = this.projects.slice(0, 9);
      });
    }
  }

  // Le reste du code reste inchangé...
  // Fonction pour éliminer les doublons dans la liste des projets
  removeDuplicates(projects: Project[]): Project[] {
    const uniqueIds = new Set<number>();
    return projects.filter(project => {
      if (!uniqueIds.has(project.id)) {
        uniqueIds.add(project.id);
        return true;
      }
      return false;
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    const startIndex = (page - 1) * 9;
    const endIndex = startIndex + 9;
    this.displayedProjects = this.projects.slice(startIndex, endIndex);
  }

  countryFiltersCopy: string[] = [];
  typeFiltersCopy: string[] = [];

  selectedFilters: string[] = [];
  countryDisplay = false;
  typeDisplay = false;
  priceDisplay = false;
  certificationDisplay = false;
  mecanismDisplay = false;
  searchTextForCountry: string = '';
  searchTextForType: string = '';
  priceFilter = 99;


  displayCountryFilter() {
    this.countryFiltersCopy = this.countryFilters;
    this.countryDisplay = !this.countryDisplay;
    if (this.countryDisplay == false) {
      this.searchTextForCountry = "";
    }
  }

  displayTypeFilter() {
    this.typeFiltersCopy = this.typeFilters;
    this.typeDisplay = !this.typeDisplay;
    if (this.typeDisplay == false) {
      this.searchTextForType = "";
    }
  }

  displayPriceFilter() {
    this.priceDisplay = !this.priceDisplay;
    if (!this.priceDisplay) {
      this.applyFilters();
    }
  }

  displayCertificationFilter() {
    this.certificationDisplay = !this.certificationDisplay;
  }

  displayMecanismFilter() {
    this.mecanismDisplay = !this.mecanismDisplay;
  }

  selectFilter() {
    if (this.isCertifiedChecked && this.isUncertifiedChecked) {
      this.certification = null;
    } else if (this.isCertifiedChecked) {
      this.certification = true;
    } else if (this.isUncertifiedChecked) {
      this.certification = false;
    } else {
      this.certification = null;
    }
    this.applyFilters();
  }

  clearFilters() {
    // Réinitialiser tous les filtres
    this.selectedFilters = [];
    this.countryDisplay = false;
    this.typeDisplay = false;
    this.priceDisplay = false;
    this.certificationDisplay = false;
    this.mecanismDisplay = false;
    this.priceFilter = 99;
    this.certification = null;
    this.mechanismType = null;
    this.isCertifiedChecked = false;
    this.isUncertifiedChecked = false;

    // Réinitialiser les maps de sélection
    this.countryFilters.forEach(country => this.selectedCountries.set(country, false));
    this.typeFilters.forEach(type => this.selectedTypes.set(type, false));

    // Réappliquer les filtres (tous réinitialisés)
    this.applyFilters();
  }

  removeFilter(filter: string) {
    const index = this.selectedFilters.indexOf(filter);
    if (index !== -1) {
      this.selectedFilters.splice(index, 1);

      // Mettre à jour l'état des checkboxes selon le filtre supprimé
      if (this.countryFilters.includes(filter)) {
        this.selectedCountries.set(filter, false);
      } else if (this.typeFilters.includes(filter)) {
        this.selectedTypes.set(filter, false);
      } else if (filter === "Certified") {
        this.isCertifiedChecked = false;
        this.certification = this.isUncertifiedChecked ? false : null;
      } else if (filter === "Uncertified") {
        this.isUncertifiedChecked = false;
        this.certification = this.isCertifiedChecked ? true : null;
      } else if (filter === "Removal") {
        this.mechanismType = null;
      } else if (filter === "Avoidance") {
        this.mechanismType = null;
      }

      this.applyFilters();
    }
  }

  filterPerCountry() {
    if (this.searchTextForCountry != '') {
      this.countryFiltersCopy = [];
      this.countryFilters.forEach(filter => {
        if (filter.toLowerCase().includes(this.searchTextForCountry.toLowerCase())) {
          this.countryFiltersCopy.push(filter);
        }
      });
    } else {
      this.countryFiltersCopy = this.countryFilters;
    }
  }

  filterPerType() {
    if (this.searchTextForType != '') {
      this.typeFiltersCopy = [];
      this.typeFilters.forEach(filter => {
        if (filter.toLowerCase().includes(this.searchTextForType.toLowerCase())) {
          this.typeFiltersCopy.push(filter);
        }
      });
    } else {
      this.typeFiltersCopy = this.typeFilters;
    }
  }

  onCertified() {
    this.isCertifiedChecked = !this.isCertifiedChecked;
    this.selectFilter();
  }

  onUncertified() {
    this.isUncertifiedChecked = !this.isUncertifiedChecked;
    this.selectFilter();
  }

  filterByType(typeFilter: string) {
    // Inverser l'état de sélection
    const currentState = this.selectedTypes.get(typeFilter) || false;
    this.selectedTypes.set(typeFilter, !currentState);

    this.applyFilters();
  }

  filterByMechanism(mechanism: string) {
    if (this.mechanismType === mechanism) {
      this.mechanismType = null;
      const index = this.selectedFilters.indexOf(mechanism);
      if (index !== -1) {
        this.selectedFilters.splice(index, 1);
      }
    } else {
      // Si l'autre mécanisme était sélectionné, le supprimer
      if (this.mechanismType) {
        const index = this.selectedFilters.indexOf(this.mechanismType);
        if (index !== -1) {
          this.selectedFilters.splice(index, 1);
        }
      }
      this.mechanismType = mechanism;
      if (!this.selectedFilters.includes(mechanism)) {
        this.selectedFilters.push(mechanism);
      }
    }

    this.applyFilters();
  }

  filterBy(evitement: string) {
    this.filterByMechanism("Avoidance");
  }

  filterByCountry(countryFilter: string) {
    // Inverser l'état de sélection
    const currentState = this.selectedCountries.get(countryFilter) || false;
    this.selectedCountries.set(countryFilter, !currentState);

    this.applyFilters();
  }
}
