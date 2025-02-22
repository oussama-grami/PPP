import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArboricultureService {


  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addInformation(arboriculture: any, id: number, annee: number): Observable<number> {
    const url = `${this.apiUrl}/arboriculture/addInfo/${id}/${annee}`;
    return this.http.post<number>(url, arboriculture);
  }
}
