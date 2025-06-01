
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CompanyOwner } from '../Models/companyOwner';
@Injectable({
  providedIn: 'root'
})
export class CompanyOwnerService {
  private readonly API_URL = '/api/'; // add api call here

  constructor(private http: HttpClient) {}

  createCompanyOwner(data: CompanyOwner): Observable<any> {
    //replace with actual API call aziz
    return this.http.post<any>(this.API_URL, data);
  }


}
