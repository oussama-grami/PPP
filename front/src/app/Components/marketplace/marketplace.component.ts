import {Component, OnInit} from '@angular/core';
import {Project} from "../../Models/project";
import {ProjectsService} from "../../Service/projects.service";
import {RoutesEnum} from "../../enumerations/Routes.enum";

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css']
})
export class MarketplaceComponent implements OnInit {
  public projects :Project[] = [];
  public displayedProjects:Project[] = [];
  public  numberOfProjects  = this.projects.length;
  public totalPages = Math.round(this.numberOfProjects/9);
  public currentPage:number  = 1;
  constructor(private projectService: ProjectsService) {
  }
  ngOnInit() {
    window.scrollTo(0, 0);
    this.projectService.getProjects().subscribe(data =>{
      this.projects = data;
    });
    this.numberOfProjects = this.projects.length;
    this.totalPages = Math.round(this.numberOfProjects/9);
    this.displayedProjects = this.projects.slice(0,9);
  }
  countryFilters = ["South Africa","Algeria","Angola","Tunisia"]
  typeFilters = ["Trees & Forests","Biodiversity","Renewable energies","Waste management", "Soil management", "Tree planting"]

  onPageChange(page:number){
    this.currentPage = page;
    const startIndex = (page - 1) * 9;
    const endIndex = startIndex + 9;
    this.displayedProjects = this.projects.slice(startIndex, endIndex);
  }
  countryFiltersCopy: string[] = []
  typeFiltersCopy: string[] = []

  selectedFilters : string[]= []
  countryDisplay = false;
  typeDisplay = false;
  priceDisplay = false;
  certificationDisplay = false;
  mecanismDisplay = false;
  searchTextForCountry: string = ''
  searchTextForType: string = ''
  priceFilter=99


  displayCountryFilter(){
    this.countryFiltersCopy= this.countryFilters;
    this.countryDisplay = ! this.countryDisplay;
    if(this.countryDisplay == false){
      this.searchTextForCountry=""

    }
  }
  displayTypeFilter(){
    this.typeFiltersCopy= this.typeFilters;
    this.typeDisplay = ! this.typeDisplay;
    if(this.typeDisplay == false){
      this.searchTextForType=""

    }
  }
  displayPriceFilter(){
    this.priceDisplay = ! this.priceDisplay;
  }
  displayCertificationFilter(){
    this.certificationDisplay = ! this.certificationDisplay;
  }
  displayMecanismFilter(){
    this.mecanismDisplay = ! this.mecanismDisplay;
  }
  selectFilter(filter: string){
    let index = this.selectedFilters.indexOf(filter)
    if(index == -1){
      this.selectedFilters.push(filter);
    }
    else{
      this.selectedFilters.splice(index,1);
    }


  }
  clearFilters(){
    this.selectedFilters = []
    this.countryDisplay = false;
    this.typeDisplay = false;
    this.priceDisplay = false;
    this.certificationDisplay = false;
    this.mecanismDisplay = false;
  }

  removeFilter(filter : string){
    let index = this.selectedFilters.indexOf(filter);
    if(index !== -1){
      this.selectedFilters.splice(index,1);
    }
  }

  filterPerCountry() {
    if (this.searchTextForCountry != '') {
      this.countryFiltersCopy  = []
      this.countryFilters.forEach(filter => {
        if(filter.toLowerCase().includes(this.searchTextForCountry.toLowerCase())){
          this.countryFiltersCopy.push(filter)
        }
      })}

    else
      this.countryFiltersCopy = this.countryFilters
  }
  filterPerType() {
    if (this.searchTextForType != '') {
      this.typeFiltersCopy  = []
      this.typeFilters.forEach(filter => {
        if(filter.toLowerCase().includes(this.searchTextForType.toLowerCase())){
          this.typeFiltersCopy.push(filter)
        }
      })}

    else
      this.typeFiltersCopy = this.typeFilters
  }

  protected readonly RoutesEnum = RoutesEnum;
}
