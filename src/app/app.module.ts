import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// NGX-STRIPE
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from 'src/environments/environment';
import { CreateTokenComponent } from './components/create-token/create-token.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SimplePaymentIntentComponent } from './components/simple-payment-intent/simple-payment-intent.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CreateTokenComponent,
    SimplePaymentIntentComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot(environment.stripePK)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
