import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import 'chartjs-plugin-datalabels'; // Import the chartjs-plugin-datalabels
import Chart from 'chart.js/auto'
import {CarburantService} from "../../Service/carburant.service";
import {EnergieService} from "../../Service/energie.service";
import {ConsommablesService} from "../../Service/consommables.service";
import {AerienService} from "../../Service/aerien.service";
import {FretService} from "../../Service/fret.service";
import {ImmobilisationService} from "../../Service/immobilisation.service";
import {forkJoin} from "rxjs";
@Component({
  selector: 'app-carbone-diagram',
  templateUrl: './carbone-diagram.component.html',
  styleUrls: ['./carbone-diagram.component.css']
})
export class CarboneDiagramComponent implements OnInit {
  chart!: Chart<'doughnut', number[], string>;
  emE : number=0;
  emC : number=0;
  emD : number=0;
  emF : number=0;
  emI : number=0;
  emCo : number=0;
  scope1et2 : number=0;
  scope3 : number=0;
  constructor(private carService : CarburantService,private eneService : EnergieService,private conService : ConsommablesService,private depService : AerienService,private fretService : FretService,private  immService : ImmobilisationService) {}


  ngOnInit(): void {
    const observables = [
      this.carService.calculer(2023, 1),
      this.eneService.calculer(2023, 1),
      this.conService.calculer(2023, 1),
      this.depService.calculer(2023, 1),
      this.fretService.calculer(2023, 1),
      this.immService.calculer(2023, 1),
    ];

    forkJoin(observables).subscribe((results: number[]) => {
      [this.emC, this.emE,this.emCo,this.emD,this.emF,this.emI] = results;

      this.scope1et2 = this.emE + this.emC;
      this.scope3 = + this.emD + this.emCo + this.emF +this.emI;
    this.createChart();
    });
  }
  createChart(): void {
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Scope 1+2', 'Scope 3'],
          datasets: [
            {
              label: 'Dataset 1',
              data: [this.scope1et2, this.scope3],
              backgroundColor: ['#014131', '#76B82A'],
            }
          ]
        },
        options: {
          cutoutPercentage: 50,
          responsive: true,
          elements: {
            arc: {
              weight : 20,
              borderAlign: "inner",
              borderWidth: 10, // Adjust the border width here (e.g., 1 or 2)
              spacing: 0,
              borderRadius: 15,
            }
          },
          plugins: {
            legend: {
              position: 'bottom',
              maxWidth: 500,
              padding: 20
            },
            datalabels: {
              display: true,
              anchor: 'start', // Position the labels under the chart
              align: 'bottom', // Align the labels to the top of the data points
            }
          },
          layout: {
            padding: {
              top: 20 // Add a margin of 20px to the top of the chart
            }
          }
        } as ChartOptions<'doughnut'>
      });
    }
  }
}
