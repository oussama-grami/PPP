import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsommablesService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addInformation(consommables: any, id: number, annee: number): Observable<number> {
    const url = `${this.apiUrl}/consommables/addInfo/${id}/${annee}`;
    return this.http.post<number>(url, consommables);
  }
  calculer(anne: number, id: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/consommables/calc/${anne}/${id}`);
  }
}
