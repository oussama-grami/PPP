import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';



export interface CarbonFootprintData {
  id: number;
  date: string;
  value: number;
  predicted?: boolean ;
}
@Injectable({
  providedIn: 'root'
})
export class HistoricalPredictionService {

  private staticData: CarbonFootprintData[] = [
    { id:1,date: '2023-01-01', value: 350 , predicted: false},
    { id:2,date: '2023-02-01', value: 300, predicted: false},
    { id:3,date: '2023-03-01', value: 290 , predicted: false},
    { id:4,date: '2023-04-01', value: 280 , predicted: false},
  ];

  constructor() {}

  getData(): Observable<CarbonFootprintData[]> {
    this.staticData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return of(this.staticData);
  }
  addData(newData: CarbonFootprintData): Observable<void> {

    this.staticData.push(newData);
    return of(undefined);
  }
  updateData(updatedData: CarbonFootprintData): Observable<void> {
    const index = this.staticData.findIndex(item => item.id === updatedData.id);
    if (index !== -1) {
      this.staticData[index] = updatedData;
    }
    return of(undefined);
  }
  deleteData(id: number): Observable<void> {
    this.staticData = this.staticData.filter(item => item.id !== id);
    return of(undefined);
  }
  getDataById(id: number): Observable<CarbonFootprintData | undefined> {
    const data = this.staticData.find(item => item.id === id);
    return of(data);
  }

  predictValues(): Observable<CarbonFootprintData[]> {
    const predictedData: CarbonFootprintData[] = this.staticData.map(item => ({
      ...item,
      id: this.staticData.length + 1 + this.staticData.indexOf(item), // Assign new unique IDs
      date: new Date(new Date(item.date).setMonth(new Date(item.date).getMonth() + 1)).toISOString().split('T')[0], // Predict for the next month
      value: item.value * 1.1 ,predicted: true // Example prediction logic
    }));
    
    return of(predictedData);
  }
  saveData(predictedData: CarbonFootprintData[]): Observable<void> {
    this.staticData.push(...predictedData);
    return of(undefined);
  }
}
