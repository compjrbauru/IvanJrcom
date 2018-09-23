import { config } from './../../../../config/config';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-stripe',
  template:
  `
  <div>
  <button class="btn btn-success" (click)="openCheckout()">Comprar com cartão</button>
  </div>
  `,
})

export class StripeComponent implements OnInit {
  constructor() { }

  ngOnInit() { }

  openCheckout() {
    const handler = (<any>window).StripeCheckout.configure({
      key: config.stripe.key,
      locale: 'auto',
      token: function (token: any) {
        console.log(token);
      },
    });

    handler.open({
      name: 'Comprar Ingresso',
      currency: 'brl',
      amount: 2000,
    });
  }
}
