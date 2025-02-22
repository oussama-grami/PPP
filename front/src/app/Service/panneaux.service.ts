import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PanneauxService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addInformation(panneaux: any, id: number, annee: number): Observable<string> {
    const url = `${this.apiUrl}/panneaux/addInfo/${id}/${annee}`;
    return this.http.post(url, panneaux, { responseType: 'text' });
  }
}
