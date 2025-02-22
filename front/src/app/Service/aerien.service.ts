import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Categorie} from "../enumerations/Categorie";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AerienService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addInformation(deplacemet: any, id: number, annee: number): Observable<number> {
    const url = `${this.apiUrl}/deplacemet/addInfo/${id}/${annee}`;
    return this.http.post<number>(url, deplacemet);
  }
  calculer(anne: number, id: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/deplacemet/calc/${anne}/${id}`);
  }
}
