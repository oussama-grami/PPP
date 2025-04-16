import { Component, OnInit } from '@angular/core';
import { HistoricalPredictionService } from '../../Service/historical-prediction.service';
import { Chart } from 'chart.js';
import { RoutesEnum } from 'src/app/enumerations/Routes.enum';
import { CarbonFootprintData } from '../../Models/carbonFooprintData';
import { ViewChild, ElementRef, AfterViewChecked } from '@angular/core';

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
      this.chart.destroy(); // Destroy old chart before creating a new one
      this.chart = null;
    }
  
    this.chart = new Chart('carbonChart', {
      type: 'line',
      data: {
        labels: this.chartLabels,
        datasets: [{
          label: 'Carbon Footprint',
          data: this.chartData,
          borderColor: 'rgba(1, 65, 49, 0.5)',
          backgroundColor: 'rgba(188, 206, 168, 0.2)',
          fill: true,
          pointBackgroundColor: this.carbonData.map(item => item.predicted ? 'red' : 'rgba(1, 65, 49, 0.8)'), // Red for predicted points
          pointRadius: this.carbonData.map(item => item.predicted ? 4 : 3), // Smaller dots for both actual and predicted data
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
            display: true,
            labels: {
              generateLabels: function(chart) {
                return [
                  {
                    text: 'Actual Data',
                    fillStyle: 'rgba(1, 65, 49, 0.8)',
                    strokeStyle: 'rgba(1, 65, 49, 0.8)',
                    lineWidth: 1
                  },
                  {
                    text: 'Predicted Data',
                    fillStyle: 'red',
                    strokeStyle: 'red',
                    lineWidth: 1
                  }
                ];
              },
              // Make legend boxes smaller
              boxWidth: 10,  // Smaller box size
              boxHeight: 10, // Smaller box size
            }
          }
        }
      }
    });
  }
  
  
  
  

  saveNewElement(): void {
    if (this.newEntry && this.newEntry.date && this.newEntry.value) {
    
      this.carbonFootprintService.addData(this.newEntry).subscribe(() => {
        this.newEntry = null; 
        this.loadData(); 
        this.createChart();
      });
    }
  }

  predict(): void {
    this.carbonFootprintService.predictValues().subscribe(predictedData => {
      this.carbonData = [...this.carbonData, ...predictedData];
      this.chartData = this.carbonData.map(item => item.value);
      this.chartLabels = this.carbonData.map(item => item.date);
      this.createChart();
    });
    console.log('Predicted data:', this.carbonData);
  
  }
  savePredictions(){
    const predictedData = this.carbonData.filter(item => item.predicted);
    this.carbonFootprintService.saveData(predictedData).subscribe(() => {

      this.createChart();
    }
    );

  }

  deleteElement(id: number | undefined): void {
    if (id === undefined) return;
  
    this.carbonData = this.carbonData.filter(element => element.id !== id);
  
    this.carbonFootprintService.deleteData(id).subscribe({
      next: () => {
        this.createChart();  
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
