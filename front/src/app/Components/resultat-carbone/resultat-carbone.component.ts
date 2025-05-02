import { Component, OnInit, OnDestroy } from '@angular/core';
import { CarburantService } from '../../Service/carburant.service';
import { EnergieService } from '../../Service/energie.service';
import { ConsommablesService } from '../../Service/consommables.service';
import { AerienService } from '../../Service/aerien.service';
import { FretService } from '../../Service/fret.service';
import { ImmobilisationService } from '../../Service/immobilisation.service';
import { forkJoin, Subscription } from 'rxjs';
import { CarbonFootprintService } from '../../Service/carbon-footprint.service';
import { CarbonResponse } from '../../api/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resultat-carbone',
  templateUrl: './resultat-carbone.component.html',
  styleUrls: ['./resultat-carbone.component.css'],
})
export class ResultatCarboneComponent implements OnInit, OnDestroy {
  value = 50;
  emE: number = 0;
  emC: number = 0;
  emD: number = 0;
  emF: number = 0;
  emI: number = 0;
  emCo: number = 0;
  total: number = 0;
  percentageA: number = 0;
  percentageE: number = 0;
  percentageC: number = 0;
  percentageI: number = 0;
  percentageCo: number = 0;
  percentageF: number = 0;

  // Flag to track loading state
  isLoading: boolean = true;

  // Flag to check if recommendations are available
  hasRecommendations: boolean = false;

  // Store recommendations
  recommendations: CarbonResponse | null = null;

  // Track subscription
  private recommendationsSubscription: Subscription | null = null;

  constructor(
    private carService: CarburantService,
    private eneService: EnergieService,
    private conService: ConsommablesService,
    private depService: AerienService,
    private fretService: FretService,
    private immService: ImmobilisationService,
    private carbonFootprintService: CarbonFootprintService,
    private router: Router
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);

    // Subscribe to recommendations changes
    this.recommendationsSubscription =
      this.carbonFootprintService.recommendations$.subscribe(
        (response: CarbonResponse | null) => {
          this.recommendations = response;
          this.hasRecommendations = !!response;

          // If we have recommendations, we can stop showing loading state
          if (this.recommendations) {
            this.isLoading = false;
          }
        }
      );

    // Check if recommendations already exist in the service
    if (this.carbonFootprintService.recommendations) {
      this.recommendations = this.carbonFootprintService.recommendations;
      this.hasRecommendations = true;
      this.isLoading = false;
    }

    const observables = [
      this.carService.calculer(2023, 1),
      this.eneService.calculer(2023, 1),
      this.conService.calculer(2023, 1),
      this.depService.calculer(2023, 1),
      this.fretService.calculer(2023, 1),
      this.immService.calculer(2023, 1),
    ];

    forkJoin(observables).subscribe({
      next: (results: number[]) => {
        [this.emC, this.emE, this.emCo, this.emD, this.emF, this.emI] = results;

        this.total =
          this.emI + this.emE + this.emD + this.emCo + this.emF + this.emC;

        if (this.total !== 0) {
          this.percentageA = (this.emD / this.total) * 100;
          this.percentageE = (this.emE / this.total) * 100;
          this.percentageI = (this.emI / this.total) * 100;
          this.percentageC = (this.emC / this.total) * 100;
          this.percentageCo = (this.emCo / this.total) * 100;
          this.percentageF = (this.emF / this.total) * 100;
        }

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading emission calculations:', err);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  // Navigate to recalculate
  recalculateFootprint(): void {
    // Clear existing recommendations
    this.carbonFootprintService.clearRecommendations();
    // Navigate to the first step in the form
    this.router.navigate(['/info']);
  }

  ngOnDestroy(): void {
    // Clean up subscription when component is destroyed
    if (this.recommendationsSubscription) {
      this.recommendationsSubscription.unsubscribe();
    }
  }
}
