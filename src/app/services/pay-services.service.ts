import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaymentMethod } from '@stripe/stripe-js';
import { Subscribable, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PayServicesService {

  constructor(private http: HttpClient) {

  }

  payMethod(token: PaymentMethod) {
    return this.http.post('http://localhost:3000/', { id: token.id, amount: 10000 });
  }
}
