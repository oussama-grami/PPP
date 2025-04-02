import { Injectable } from '@angular/core';



export interface CarbonFootprintData {
  id: number;
  date: string;
  value: number;
}
@Injectable({
  providedIn: 'root'
})
export class HistoricalPredictionService {

  private staticData: CarbonFootprintData[] = [
    { id:1,date: '2023-01-01', value: 350 },
    { id:2,date: '2023-02-01', value: 300 },
    { id:3,date: '2023-03-01', value: 290 },
    { id:4,date: '2023-04-01', value: 280 },
  ];

  constructor() {}

  getData(): CarbonFootprintData[] {
    return this.staticData;
  }
}
