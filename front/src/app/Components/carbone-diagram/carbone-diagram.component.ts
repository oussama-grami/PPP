import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import 'chartjs-plugin-datalabels';
import Chart from 'chart.js/auto';
import { CarbonFootprintService } from '../../Service/carbon-footprint.service';

@Component({
  selector: 'app-carbone-diagram',
  templateUrl: './carbone-diagram.component.html',
  styleUrls: ['./carbone-diagram.component.css']
})
export class CarboneDiagramComponent implements OnInit {
  chartCategories!: Chart<'doughnut', number[], string>;
  chartScopes!: Chart<'doughnut', number[], string>;

  // Emissions Data
  emE: number = 0;
  emC: number = 0;
  emD: number = 0;
  emF: number = 0;
  emI: number = 0;
  emCo: number = 0;

  // Scopes Data
  scope1: number = 0;
  scope2: number = 0;
  scope3: number = 0;

  constructor(private carbonService: CarbonFootprintService) {}

  ngOnInit(): void {
    this.carbonService.calculateEmissions(2023, 1).subscribe((results: number[]) => {
      [this.emC, this.emE, this.emCo, this.emD, this.emF, this.emI] = results;

      // Assuming energy (emE) contains both Scope 1 and 2 emissions
      this.scope1 = this.emC; // Fuel consumption (Scope 1)
      this.scope2 = this.emE; // Purchased electricity (Scope 2)
      this.scope3 = this.emD + this.emCo + this.emF + this.emI; // Other indirect emissions

      this.createCategoryChart();
      this.createScopeChart();
    });
  }

  // 🔹 Chart for the Seven Emissions Categories
  createCategoryChart(): void {
    const canvas = document.getElementById('categoryChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      this.chartCategories = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Carburant', 'Énergie', 'Consommables', 'Déplacements Aériens', 'Fret', 'Immobilisation'],
          datasets: [
            {
              label: 'Émissions par catégorie',
              data: [this.emC, this.emE, this.emCo, this.emD, this.emF, this.emI],
              backgroundColor: ['#4CAF50', '#1B5E20', '#FF9800', '#795548', '#76B82A', '#C0CA33']
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'bottom' },
            datalabels: { display: true, anchor: 'start', align: 'bottom' }
          }
        } as ChartOptions<'doughnut'>
      });
    }
  }

  // 🔹 Chart for the Three Scopes with real names
  createScopeChart(): void {
    const canvas = document.getElementById('scopeChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      this.chartScopes = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Direct emissions from owned or controlled sources',
            'Indirect emissions from the generation of purchased electricity',
            'Other indirect emissions'],
          datasets: [
            {
              label: 'Émissions par scope',
              data: [this.scope1, this.scope2, this.scope3],
              backgroundColor: ["#4CAF50", "#1E5631", "#A7D397"]
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'bottom' },
            datalabels: { display: true, anchor: 'start', align: 'bottom' }
          }
        }
      });
    }
  }
}
