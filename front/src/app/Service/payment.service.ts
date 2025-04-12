import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = environment.apiUrl + '/api/payment';

  constructor(private http: HttpClient) { }

  createPaymentIntent(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create-payment-intent`, data);
  }

  confirmPaymentSuccess(paymentIntentId: string): Observable<any> {
    const params = new HttpParams().set('payment_intent', paymentIntentId);

    // Spécifier explicitement le type de réponse attendu
    return this.http.post<any>(`${this.apiUrl}/payment-success`, {}, { params });
  }
}
