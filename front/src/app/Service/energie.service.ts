import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnergieService {

  private apiUrl = environment.apiUrl;


  constructor(private http: HttpClient) { }

  addInformation(energie: any, id: number, annee: number): Observable<number> {
    const url = `${this.apiUrl}/energie/addInfo/${id}/${annee}`;
    return this.http.post<number>(url, energie);
  }
  calculer(anne: number, id: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/energie/calc/${anne}/${id}`);
  }
}
