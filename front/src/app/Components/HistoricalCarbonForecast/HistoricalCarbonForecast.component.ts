import { Component, OnInit } from '@angular/core';
import { CarbonFootprintData, HistoricalPredictionService } from '../../Service/historical-prediction.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-HistoricalCarbonForecast',
  templateUrl: './HistoricalCarbonForecast.component.html',
  styleUrls: ['./HistoricalCarbonForecast.component.css']
})
export class HistoricalCarbonForecastComponent implements OnInit {
  newEntry: CarbonFootprintData | null = null; // Stores the new entry
  editingElementId: number | null = null; // Stores the ID of the element being edited
  carbonData: CarbonFootprintData[] = [];
  chartData: number[] = [];
  chartLabels: string[] = [];
  chart: any;

  displayedColumns: string[] = ['date', 'value', 'actions'];

  constructor(private carbonFootprintService: HistoricalPredictionService) {}

  ngOnInit(): void {
    this.loadData();
    this.createChart();
  }

  loadData(): void {
    this.carbonData = this.carbonFootprintService.getData();
    
   
  
    this.chartData = this.carbonData.map(item => item.value);
    this.chartLabels = this.carbonData.map(item => item.date);
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
          borderColor: 'rgba(73, 73, 73, 0.43)',
          backgroundColor: 'rgba(1, 65, 49, 0.2)',
          fill: true
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
        }
      }
    });
  }

  addElement(): void {
    const lastId = this.carbonData.length > 0 ? this.carbonData[this.carbonData.length - 1].id : 0;
    this.newEntry = { id: lastId + 1, date: '', value: 0 };
  }

  saveNewElement(): void {
    if (this.newEntry && this.newEntry.date && this.newEntry.value) {
      this.carbonData.push(this.newEntry);
      //this.carbonFootprintService.saveData(this.carbonData); // Save the updated data
      this.newEntry = null; // Clear the new entry
      this.loadData(); // Reload data to update chart
      this.createChart();

    }
  }

  predict(): void {
    this.loadData();
    this.createChart();
  }
  savePrediction(){

  }

  deleteElement(id: number | undefined): void {
    if (id === undefined) return; // Avoid deleting undefined IDs
    this.carbonData = this.carbonData.filter(item => item.id !== id);
    this.createChart();
    console.log('Deleted element with ID:', id);
    console.log(this.carbonData);
  }

  startEdit(id: number | undefined): void {
    if (id === undefined) return; 
    const elementToEdit = this.carbonData.find(item => item.id === id);
    if (elementToEdit) {
      this.editingElementId = id;
    
    }
  }
  
  saveEdit(element: CarbonFootprintData, newValue: number): void {
    element.value = newValue; // Update the value
    this.editingElementId = null; // Exit edit mode
    this.createChart(); 
  }
}
