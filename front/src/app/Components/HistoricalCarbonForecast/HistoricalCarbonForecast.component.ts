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
export class HistoricalCarbonForecastComponent implements OnInit ,AfterViewChecked {
  loading:boolean=false;
  hasUnsavedPrediction:boolean=false;
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
  @ViewChild('carbonChart') chartRef: ElementRef | undefined; // Add this ViewChild
  scrolledToNewRow: boolean = false;
  warningMessage:string|null='' ;

  constructor(private carbonFootprintService: HistoricalPredictionService) {}

  ngOnInit(): void {
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
    this.carbonFootprintService.getData().subscribe(data => {
      this.carbonData = data;
      this.chartData = this.carbonData.map(item => item.value);
      this.chartLabels = this.carbonData.map(item => item.date);
      this.createChart();
    });
  }

  createChart(): void {
    // Don't create chart if loading (canvas might not be in DOM)
    if (this.loading) {
      return;
    }

    // Check if canvas element exists and is visible
    const canvasElement = document.getElementById('carbonChart') as HTMLCanvasElement;
    if (!canvasElement) {
      console.error('Canvas element with id "carbonChart" not found or not visible');
      return;
    }

    // Additional check to ensure canvas is properly rendered
    if (canvasElement.offsetWidth === 0 || canvasElement.offsetHeight === 0) {
      console.warn('Canvas element not properly rendered, retrying...');
      setTimeout(() => this.createChart(), 50);
      return;
    }

    // Destroy existing chart
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }

    const labelsToShow = this.chartLabels.slice(-18);
    const dataToShow = this.chartData.slice(-18);
    const carbonDataToShow = this.carbonData.slice(-18);

    try {
      this.chart = new Chart(canvasElement, {
        type: 'line',
        data: {
          labels: labelsToShow,
          datasets: [{
            label: 'Carbon Footprint',
            data: dataToShow,
            borderColor: 'rgba(1, 65, 49, 0.5)',
            backgroundColor: 'rgba(188, 206, 168, 0.2)',
            fill: true,
            pointBackgroundColor: (ctx) => {
              const index = ctx.dataIndex;
              return carbonDataToShow[index].predicted ? 'rgba(76, 175, 80, 1)' : 'rgba(1, 65, 49, 0.8)';
            },
            pointRadius: (ctx) => {
              const index = ctx.dataIndex;
              return carbonDataToShow[index].predicted ? 5: 5;
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
      console.log('Chart created successfully');
    } catch (error) {
      console.error('Failed to create chart:', error);
    }
  }

  saveNewElement(): void {
    if (this.newEntry && this.newEntry.date && this.newEntry.value !== null && this.newEntry.value !== undefined){
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
            this.warningMessage = 'An error occurred while saving the data.'+error.toString();
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
    this.loading = true;
    this.hasUnsavedPrediction=true;
    if (this.carbonData.length<6)
    {
      console.error('Not enough data to predict values. At least 6 records are required.');
      this.loading = false;
      return;
    }
    this.carbonFootprintService.predictValues().subscribe({
      next: (predictedData) => {
        console.log("the predicted data is ", predictedData);
        this.carbonData = [...this.carbonData, ...predictedData];
        this.chartData = this.carbonData.map(item => item.value);
        this.chartLabels = this.carbonData.map(item => item.date);
        this.loading = false;

        // Use setTimeout with longer delay to ensure DOM is fully rendered
        setTimeout(() => {
          this.createChart();
        }, 100);
      },
      error: (error) => {
        console.error('Error predicting values:', error);
        this.loading = false;
      }
    });
  }

  savePredictions(){
    const predictedData = this.carbonData.filter(item => item.predicted);
    console.log("the predicted data is ", predictedData);
    this.carbonFootprintService.saveData(predictedData).subscribe({
      next: () => {
        this.loadData();
        this.hasUnsavedPrediction = false;
      },
      error: (error) => {
        console.error('Error saving predictions:', error);
      }
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
      this.carbonFootprintService.updateData(element.id, updatedElement).subscribe({
        next: () => {
          this.editingElementId = null;
          this.loadData();
        },
        error: (error) => {
          console.error('Error updating element:', error);
        }
      });
    }
  }
}
