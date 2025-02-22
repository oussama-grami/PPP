import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Categorie} from "../enumerations/Categorie";
import {Partie} from "../enumerations/Partie";
import {Esg} from "../Models/esg";
import {Observable} from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private apiUrl = environment.apiUrl;


  constructor(private http : HttpClient) { }


  addScore(v: number, id: number, annee: number, esgId: number) {
    this.http.post(`${this.apiUrl}/score/addScore/${v}/${id}/${annee}/${esgId}`, {}).subscribe(
      response => {
        console.log('Success:', response);
      },
      error => {
        console.log('Error:', error);
      }
    );
  }
  getScore(id: number, annee: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/score/getScore/${id}/${annee}`);
  }
  calculerScore(id: number, annee: number,categorie: Categorie): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/score/calculerScore/${id}/${annee}/${categorie}`);
  }
  getval( annee: number,id: number,categorie: Categorie,partie : Partie): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/score/scoreEsg/${annee}/${id}/${categorie}/${partie}`);
  }

}
