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
  routesEnum = RoutesEnum;
  newEntry: CarbonFootprintData | null = null; // Stores the new entry
  editingElementId: number | null = null; // Stores the ID of the element being edited
  carbonData: CarbonFootprintData[] = [];
  chartData: number[] = [];
  chartLabels: string[] = [];
  chart: any;

  displayedColumns: string[] = ['date', 'value', 'actions'];
  @ViewChild('newRow') newRowRef: ElementRef | undefined;
  @ViewChild('tableContainer') tableContainerRef: ElementRef | undefined;
  scrolledToNewRow: boolean = false; // Flag to check if scrolled to new row
  warningMessage:string|null='' ;// Stores the warning message

  constructor(private carbonFootprintService: HistoricalPredictionService) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewChecked(): void {
    if (this.newRowRef && this.tableContainerRef && !this.scrolledToNewRow) {
      const newRowEl = this.newRowRef.nativeElement;
      const tableContainerEl = this.tableContainerRef.nativeElement;

      // Scroll the table container to make newRow visible
      const offsetTop = newRowEl.offsetTop;
      tableContainerEl.scrollTo({ top: offsetTop, behavior: 'smooth' });

      this.scrolledToNewRow = true;
    }
  }

  addElement() {
    this.newEntry = { date: '', value: 0, predicted: false }; // Initialize new entry
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
          pointBackgroundColor: (ctx) => {
            const index = ctx.dataIndex;
            return carbonDataToShow[index].predicted ? 'red' : 'rgba(1, 65, 49, 0.8)';
          },
          pointRadius: (ctx) => {
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
    if (this.newEntry && this.newEntry.date && this.newEntry.value !== null && this.newEntry.value !== undefined){
      this.carbonFootprintService.addData(this.newEntry).subscribe({
        next: () => {
          this.newEntry = { date: '', value: 0, predicted: false }; // Initialize new entry
          this.loadData();  // Assuming you want to reload the data
          this.createChart();  // Assuming you want to recreate the chart
          this.warningMessage = null;  // Clear any previous warning
        },
        error: (error) => {
          if (error.status === 409) {  // Duplicate entry error
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

    this.carbonFootprintService.predictValues().subscribe(predictedData => {
      console.log("the predicted data is " ,predictedData); // Log the predicted data
      this.carbonData = [...this.carbonData, ...predictedData];
      this.chartData = this.carbonData.map(item => item.value);
      this.chartLabels = this.carbonData.map(item => item.date);
      this.createChart();
    });

  }
  savePredictions(){

    const predictedData = this.carbonData.filter(item => item.predicted);
    console.log("the predicted data is " ,predictedData); // Log the predicted data
    this.carbonFootprintService.saveData(predictedData).subscribe(() => {

      this.loadData();
      this.createChart();
    }
    );

  }

  deleteElement(id: number | undefined): void {
    if (id === undefined) return;

    this.carbonData = this.carbonData.filter(element => element.id !== id);

    this.carbonFootprintService.deleteData(id).subscribe({
      next: () => {
        this.loadData(); // Reload data to update chart
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
      this.carbonFootprintService.updateData(element.id,updatedElement).subscribe(() => {
        this.editingElementId = null; // Exit edit mode
        this.loadData(); // Reload data to update chart
        this.createChart();
      });
    }
  }
}
