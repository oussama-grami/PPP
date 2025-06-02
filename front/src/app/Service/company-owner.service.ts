import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CompanyOwner} from '../Models/companyOwner';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CompanyOwnerService {
  private readonly API_URL = environment.apiUrl + '/api/company-owners';

  constructor(private http: HttpClient) {
  }

  createCompanyOwner(data: CompanyOwner): Observable<any> {
    //replace with actual API call aziz
    return this.http.post<Number>(this.API_URL, data);
    //return of({ success: true, message: 'Company Owner created successfully' })
  }


}
