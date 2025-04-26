import { Injectable } from '@angular/core';
import {Transaction} from "../Models/transaction";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
transactions:Transaction[] = [];
  private apiUrl = `${environment.apiUrl}/transaction`;
  constructor(private http: HttpClient) { }
  ngOnInit(): void {

   }
  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl);
  }
  getTransactionById(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.apiUrl}/${id}`);
  }
  getPaginatedTransactions(skip: number = 1, limit: number = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/paginated?skip=${skip - 1}&limit=${limit}`);
  }
}
