import {Component, OnInit} from '@angular/core';
import {Chart, registerables} from 'chart.js';
import 'chartjs-plugin-datalabels';
import { EsgResponse } from 'src/app/Models/esgResponse';
import {EsgService} from 'src/app/Service/esg.service';

@Component({
  selector: 'app-esgdiagram',
  templateUrl: './esgdiagram.component.html',
  styleUrls: ['./esgdiagram.component.css'],
})
export class ESGdiagramComponent implements OnInit {
  Scores: number[] = [];

  constructor(private esgService: EsgService) { }
  chart!: Chart<'radar', number[], string>;

  ngOnInit(): void {
    this.esgService.getResponses().subscribe((rawResponses: any[]) => {
      const responses: EsgResponse[] = rawResponses.map(item => ({
        category: item.category,
        responses: item.response
      }));
      this.Scores = []; // to store 15 normalized scores
  
      responses.forEach((responseCategory) => {
        if (responseCategory.responses) {
          responseCategory.responses.forEach((question: any) => {
            const normalizedScore = (question.score / 2) + 1;
            this.Scores.push(normalizedScore); 
          });
        }
      });
  
      this.createChart();
    });
  }
  
  

  createChart(): void {
    const canvas = document.getElementById('myChart1') as HTMLCanvasElement;
    canvas.width = 775;
    canvas.height = 775;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      Chart.register(...registerables); 
      const customPlugin = {
        id: 'customBeforeDraw',
        beforeDraw: (chart: any, args: any, options: any) => {
          const ctx = chart.ctx;
          const { xCenter, yCenter, drawingArea: radius } = chart.scales.r;
          const labelsCoordonates = chart.scales.r._pointLabelItems;

          let envirement = new Path2D();
          envirement.moveTo(xCenter, yCenter);
          envirement.arc(xCenter, yCenter, radius, (4.375 * Math.PI / 3 - Math.PI / 30), (2.13 * Math.PI - Math.PI / 30), false)
          ctx.fillStyle = 'rgba(1,65,49,0.25)';
          ctx.fill(envirement);

          // draw border
          ctx.beginPath()
          ctx.moveTo(xCenter, yCenter);
          ctx.lineTo(((labelsCoordonates[14].x + labelsCoordonates[0].x) / 2) - 8, (labelsCoordonates[14].y + labelsCoordonates[0].y) / 2)
          ctx.strokeStyle = "white"
          ctx.lineWidth = 1;
          ctx.stroke()
          ctx.closePath()

          // draw social
          let social = new Path2D();
          social.moveTo(xCenter, yCenter);
          social.arc(xCenter, yCenter, radius, (2.13 * Math.PI - Math.PI / 30), (2.35 * Math.PI / 3 - Math.PI / 30), false)
          ctx.fillStyle = 'rgba(118,184,42,0.25)';
          ctx.fill(social);

          // draw border
          ctx.beginPath()
          ctx.moveTo(xCenter, yCenter);
          ctx.lineTo((labelsCoordonates[4].x + labelsCoordonates[5].x) / 2 + 16, (labelsCoordonates[4].y + labelsCoordonates[5].y) / 2 + 4);
          ctx.strokeStyle = "white"
          ctx.lineWidth = 1;
          ctx.stroke()
          ctx.closePath()

          // draw governance
          let governance = new Path2D();
          governance.moveTo(xCenter, yCenter);
          governance.arc(xCenter, yCenter, radius, (2.35 * Math.PI / 3 - Math.PI / 30), (4.375 * Math.PI / 3 - Math.PI / 30), false)
          ctx.fillStyle = 'rgba(122,182,143,0.25)';
          ctx.fill(governance);

          // draw border
          ctx.beginPath()
          ctx.moveTo(xCenter, yCenter);
          ctx.lineTo((labelsCoordonates[11].x + labelsCoordonates[12].x) / 2 - 4, (labelsCoordonates[8].y + labelsCoordonates[9].y) / 2 + 14);
          ctx.strokeStyle = "white"
          ctx.lineWidth = 1;
          ctx.stroke()
          ctx.closePath();
        }
      };

      Chart.register(customPlugin);

      this.chart = new Chart(ctx, {
        type: 'radar', 
        data: {
          labels: [
            "1.Reducing GHG emissions",
            '2.Waste management and recycling',
            '3.Valorising renewable energy',
            '4.Water management',
            '5.Biodiversity and the environment',
            '6.Diversity and inclusion',
            '7.Health and safety at work',
            '8.Employee well-being',
            '9.Policies on working conditions',
            '10.Engagement with local communities',
            '11.Governance policies',
            '12.Transparency and integrity of the company',
            '13.Conflicts of interest and responsible management',
            '14.Ethics and responsibility for business',
            '15. stakeholder involvement'
          ],
          datasets: [
            {
              label: 'Entreprise',
              data: this.Scores,
              backgroundColor: '#7D7D7D57',
              borderColor: 'rgba(109, 109, 109, 1)', 
              pointBackgroundColor: 'rgba(109, 109, 109, 1)', 
              pointBorderColor: 'rgba(109, 109, 109, 1)', 
              pointRadius: 0, 
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
            datalabels: {
              display: true,
              align: 'center',
            },
          },
          scales: {
            r: {
              ticks: {
                display: false,
                stepSize: 1
              },
              grid: {
                circular: true,
                color: 'white',
                lineWidth: 1
              },
              beginAtZero: true,
              suggestedMin: 0,
              suggestedMax: 5,
              angleLines: {
                color: "white",
                borderDash: [6, 4],
                lineWidth: 1
              }
            }
          },
        },
      });
    }
  }
}
