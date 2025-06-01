
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CompanyOwner } from '../Models/companyOwner';
@Injectable({
  providedIn: 'root'
})
export class CompanyOwnerService {
  private readonly API_URL = '/api/company-owners';

  constructor(private http: HttpClient) {}

  createCompanyOwner(data: CompanyOwner): Observable<any> {
    return this.http.post<any>(this.API_URL, data);
  }

  // For testing purposes - simulates API call
  simulateCreateCompanyOwner(data: CompanyOwner): Observable<any> {
    console.log('Company Owner Data:', data);

    // Simulate API delay and response
    return of({ success: true, message: 'Company owner created successfully', data })
      .pipe(delay(2000));
  }
}
