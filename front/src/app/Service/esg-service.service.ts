import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Categorie} from "../enumerations/Categorie";
import {Partie} from "../enumerations/Partie";
import {Esg} from "../Models/esg";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EsgServiceService {
  private apiUrl = environment.apiUrl;


  constructor(private http : HttpClient) { }

  getEsg(categorie: Categorie, partie: Partie){
    return this.http.get<Esg>(`${this.apiUrl}/esg/getEsg/${categorie}/${partie}`);
  }

}
