import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { PayServicesService } from '../../services/pay-services.service';
import {
  StripeCardElementOptions,
  StripeElementsOptions, PaymentMethod
} from '@stripe/stripe-js';


@Component({
  selector: 'app-create-token',
  templateUrl: './create-token.component.html',
})
export class CreateTokenComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  token: PaymentMethod;
  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'es'
  };

  stripeTest: FormGroup;

  constructor(private fb: FormBuilder, private stripeService: StripeService, private payServices: PayServicesService) { }

  ngOnInit(): void {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });


  }

  createToken(): void {
    const name = this.stripeTest.get('name').value;
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        console.log(result)
        if (result.token) {
          // return this.token = result.token.card;
          // Use the token
          console.log(result.token.id);
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }

  createPayMethod(): void {
    // this.createToken();
    // const name = this.stripeTest.get('name').value;
    this.stripeService.createPaymentMethod({
      type: 'card',
      card: this.card.element,
      billing_details: {
        name: 'Nicolas RM',
        email: 'xxxxxxxx@gmail.com',
        phone: '962-270-4564'
      }
    }).subscribe((resp) => {
      console.log((resp));
      if (!resp.error) {
        console.log(resp.paymentMethod);
        this.token = resp.paymentMethod;

        // if (this.token) {
        this.payServices.payMethod(this.token).subscribe((res) => {
          console.log(res);
        });
        // }
      }
    });
  }
}
