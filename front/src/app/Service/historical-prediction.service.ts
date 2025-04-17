import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';



import { CarbonFootprintData } from '../Models/carbonFooprintData';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HistoricalPredictionService {

  private apiUrl = 'http://localhost:8080/carbonHistory';

   constructor(private http: HttpClient) {
     
    }
    getData(): Observable<CarbonFootprintData[]> {
      return this.http.get<CarbonFootprintData[]>(`${this.apiUrl}/all`);
    }
    addData(newData: CarbonFootprintData): Observable<void> {

      return this.http.post<void>(`${this.apiUrl}/save`, newData);
    }

    addManyData(newData: CarbonFootprintData[]): Observable<void> {

      return this.http.post<void>(`${this.apiUrl}/saveAll`, newData);
    }
    
  
  updateData(id: number, updatedData: CarbonFootprintData): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/update/${id}`, updatedData);
  }
  deleteData(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
  
  

  predictValues(): Observable<CarbonFootprintData[]> {
    return this.http.post<CarbonFootprintData[]>(`${this.apiUrl}/forecast`, {});


  }

  saveData(data: CarbonFootprintData[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/save`, data);
  }
  
}
