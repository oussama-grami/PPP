import {Component, OnInit} from '@angular/core';
import {Chart, registerables} from 'chart.js';
import 'chartjs-plugin-datalabels';
import {ScoreService} from "../../Service/score.service";

@Component({
  selector: 'app-esgdiagram',
  templateUrl: './esgdiagram.component.html',
  styleUrls: ['./esgdiagram.component.css'],
})
export class ESGdiagramComponent implements OnInit {
  Scores: number[] = [];

  constructor(private scService: ScoreService) {
  }

  chart!: Chart<'radar', number[], string>;

  ngOnInit(): void {
    /*this.scService.getScore(1, 2023).subscribe((scores: number[]) => {
      for (const [index, value] of scores.entries()) {
        this.Scores[index] = scores[index] + 1;
      }
      this.createChart();
    });*/
    this.Scores = [3, 4, 2, 5, 3, 4, 2, 5, 3, 4, 2, 5, 3, 4, 2];
    this.createChart();
  }

  createChart(): void {
    const canvas = document.getElementById('myChart1') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      Chart.register(...registerables);

      const customPlugin = {
        id: 'customBeforeDraw',
        beforeDraw: (chart: any, args: any, options: any) => {
          const ctx = chart.ctx;
          const { xCenter, yCenter, drawingArea: radius } = chart.scales.r;
          const labelsCoordonates = chart.scales.r._pointLabelItems;

          // Environment section
          let environment = new Path2D();
          environment.moveTo(xCenter, yCenter);
          environment.arc(xCenter, yCenter, radius, (4.375 * Math.PI / 3 - Math.PI / 30), (2.13 * Math.PI - Math.PI / 30), false);
          ctx.fillStyle = 'rgba(1,65,49,0.25)';
          ctx.fill(environment);

          ctx.beginPath();
          ctx.moveTo(xCenter, yCenter);
          ctx.lineTo(((labelsCoordonates[14].x + labelsCoordonates[0].x) / 2) - 8, (labelsCoordonates[14].y + labelsCoordonates[0].y) / 2);
          ctx.strokeStyle = "white";
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.closePath();

          // Social section
          let social = new Path2D();
          social.moveTo(xCenter, yCenter);
          social.arc(xCenter, yCenter, radius, (2.13 * Math.PI - Math.PI / 30), (2.35 * Math.PI / 3 - Math.PI / 30), false);
          ctx.fillStyle = 'rgba(118,184,42,0.25)';
          ctx.fill(social);

          ctx.beginPath();
          ctx.moveTo(xCenter, yCenter);
          ctx.lineTo((labelsCoordonates[4].x + labelsCoordonates[5].x) / 2 + 16, (labelsCoordonates[4].y + labelsCoordonates[5].y) / 2 + 4);
          ctx.strokeStyle = "white";
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.closePath();

          // Governance section
          let governance = new Path2D();
          governance.moveTo(xCenter, yCenter);
          governance.arc(xCenter, yCenter, radius, (2.35 * Math.PI / 3 - Math.PI / 30), (4.375 * Math.PI / 3 - Math.PI / 30), false);
          ctx.fillStyle = 'rgba(122,182,143,0.25)';
          ctx.fill(governance);

          ctx.beginPath();
          ctx.moveTo(xCenter, yCenter);
          ctx.lineTo((labelsCoordonates[11].x + labelsCoordonates[12].x) / 2 - 4, (labelsCoordonates[8].y + labelsCoordonates[9].y) / 2 + 14);
          ctx.strokeStyle = "white";
          ctx.lineWidth = 1;
          ctx.stroke();
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
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: false,
            },
            datalabels: {
              display: true,
              align: 'center',
              formatter: (value, context) => {
                const index = context.dataIndex;
                if (index < 5) {
                  return 'Environment';
                } else if (index < 10) {
                  return 'Social';
                } else {
                  return 'Governance';
                }
              }
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
