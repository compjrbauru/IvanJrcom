import { config } from './../../../../config/config';
import { Component, OnInit, Input } from '@angular/core';

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
  @Input() preco: any;
  constructor() { }

  ngOnInit() { }

  openCheckout() {
    const handler = (<any>window).StripeCheckout.configure({
      key: config.stripe.key,
      locale: 'auto',
      token: function (token: any) {
      },
    });

    handler.open({
      name: 'Comprar Ingresso',
      currency: 'brl',
      amount: this.preco,
    });
  }
}
