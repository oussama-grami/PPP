import { Component, OnInit } from '@angular/core';
import { HistoricalPredictionService } from '../../Service/historical-prediction.service';
import { RoutesEnum } from 'src/app/enumerations/Routes.enum';
import { CarbonFootprintData } from '../../Models/carbonFooprintData';
import { ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register necessary components
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

@Component({
  selector: 'app-HistoricalCarbonForecast',
  templateUrl: './HistoricalCarbonForecast.component.html',
  styleUrls: ['./HistoricalCarbonForecast.component.css']
})
export class HistoricalCarbonForecastComponent implements OnInit, AfterViewChecked {
  routesEnum = RoutesEnum;
  newEntry: CarbonFootprintData | null = null;
  editingElementId: number | null = null;
  carbonData: CarbonFootprintData[] = [];
  chartData: number[] = [];
  chartLabels: string[] = [];
  chart: any;

  displayedColumns: string[] = ['date', 'value', 'actions'];
  @ViewChild('newRow') newRowRef: ElementRef | undefined;
  @ViewChild('tableContainer') tableContainerRef: ElementRef | undefined;
  scrolledToNewRow: boolean = false;
  warningMessage: string | null = '';

  constructor(private carbonFootprintService: HistoricalPredictionService) {}

  ngOnInit(): void {
    // Create empty chart immediately
    this.createEmptyChart();
    // Then load data
    this.loadData();
  }

  ngAfterViewChecked(): void {
    if (this.newRowRef && this.tableContainerRef && !this.scrolledToNewRow) {
      const newRowEl = this.newRowRef.nativeElement;
      const tableContainerEl = this.tableContainerRef.nativeElement;

      const offsetTop = newRowEl.offsetTop;
      tableContainerEl.scrollTo({ top: offsetTop, behavior: 'smooth' });

      this.scrolledToNewRow = true;
    }
  }

  addElement() {
    this.newEntry = { date: '', value: 0, predicted: false };
    this.scrolledToNewRow = false;
  }

  loadData(): void {
    this.carbonFootprintService.getData().subscribe({
      next: (data) => {
        this.carbonData = data;
        this.chartData = this.carbonData.map(item => item.value);
        this.chartLabels = this.carbonData.map(item => item.date);
        this.updateChart();
      },
      error: (error) => {
        console.error('Error loading data:', error);
        // Keep the empty chart if data loading fails
      }
    });
  }

  createEmptyChart(): void {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }

    this.chart = new Chart('carbonChart', {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Carbon Footprint',
          data: [],
          borderColor: 'rgba(1, 65, 49, 0.5)',
          backgroundColor: 'rgba(188, 206, 168, 0.2)',
          fill: true,
          pointBackgroundColor: 'rgba(1, 65, 49, 0.8)',
          pointRadius: 3,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Carbon Footprint Value'
            }
          }
        },
        plugins: {
          legend: {
            display: true
          }
        }
      }
    });
  }

  updateChart(): void {
    if (!this.chart) {
      this.createChart();
      return;
    }

    const labelsToShow = this.chartLabels.slice(-18);
    const dataToShow = this.chartData.slice(-18);
    const carbonDataToShow = this.carbonData.slice(-18);

    // Update chart data
    this.chart.data.labels = labelsToShow;
    this.chart.data.datasets[0].data = dataToShow;
    this.chart.data.datasets[0].pointBackgroundColor = (ctx: any) => {
      const index = ctx.dataIndex;
      return carbonDataToShow[index]?.predicted ? 'red' : 'rgba(1, 65, 49, 0.8)';
    };
    this.chart.data.datasets[0].pointRadius = (ctx: any) => {
      const index = ctx.dataIndex;
      return carbonDataToShow[index]?.predicted ? 4 : 3;
    };

    // Update the chart
    this.chart.update();
  }

  createChart(): void {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }

    const labelsToShow = this.chartLabels.slice(-18);
    const dataToShow = this.chartData.slice(-18);
    const carbonDataToShow = this.carbonData.slice(-18);

    this.chart = new Chart('carbonChart', {
      type: 'line',
      data: {
        labels: labelsToShow,
        datasets: [{
          label: 'Carbon Footprint',
          data: dataToShow,
          borderColor: 'rgba(1, 65, 49, 0.5)',
          backgroundColor: 'rgba(188, 206, 168, 0.2)',
          fill: true,
          pointBackgroundColor: (ctx: any) => {
            const index = ctx.dataIndex;
            return carbonDataToShow[index].predicted ? 'red' : 'rgba(1, 65, 49, 0.8)';
          },
          pointRadius: (ctx: any) => {
            const index = ctx.dataIndex;
            return carbonDataToShow[index].predicted ? 4 : 3;
          },
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Carbon Footprint Value'
            }
          }
        },
      }
    });
  }

  saveNewElement(): void {
    if (this.newEntry && this.newEntry.date && this.newEntry.value !== null && this.newEntry.value !== undefined) {
      this.carbonFootprintService.addData(this.newEntry).subscribe({
        next: () => {
          this.newEntry = { date: '', value: 0, predicted: false };
          this.loadData();
          this.warningMessage = null;
        },
        error: (error) => {
          if (error.status === 409) {
            this.warningMessage = 'A carbon footprint record already exists for this date.';
          } else {
            console.log(error);
            this.warningMessage = 'An error occurred while saving the data.' + error.toString();
          }
        }
      });
    }
  }

  closeWarning(): void {
    this.warningMessage = null;
  }

  predict(): void {
    console.log('Predicting values...');

    this.carbonFootprintService.predictValues().subscribe(predictedData => {
      console.log("the predicted data is", predictedData);
      this.carbonData = [...this.carbonData, ...predictedData];
      this.chartData = this.carbonData.map(item => item.value);
      this.chartLabels = this.carbonData.map(item => item.date);
      this.updateChart();
    });
  }

  savePredictions() {
    const predictedData = this.carbonData.filter(item => item.predicted);
    console.log("the predicted data is", predictedData);
    this.carbonFootprintService.saveData(predictedData).subscribe(() => {
      this.loadData();
    });
  }

  deleteElement(id: number | undefined): void {
    if (id === undefined) return;

    this.carbonData = this.carbonData.filter(element => element.id !== id);

    this.carbonFootprintService.deleteData(id).subscribe({
      next: () => {
        this.loadData();
        console.log('Deleted element with ID:', id);
      },
      error: (err) => {
        console.error('Error deleting element with ID:', id, err);
      }
    });
  }

  startEdit(id: number | undefined): void {
    if (id === undefined) return;
    const elementToEdit = this.carbonData.find(item => item.id === id);
    if (elementToEdit) {
      this.editingElementId = id;
    }
  }

  saveEdit(element: CarbonFootprintData, newValue: number): void {
    if (element.id !== undefined) {
      const updatedElement = { ...element, value: newValue };
      this.carbonFootprintService.updateData(element.id, updatedElement).subscribe(() => {
        this.editingElementId = null;
        this.newEntry=null;

        this.loadData();
      });
    }
  }
}
