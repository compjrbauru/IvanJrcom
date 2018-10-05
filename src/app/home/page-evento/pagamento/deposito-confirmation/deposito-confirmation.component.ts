import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-deposito-confirmation',
  template:
    `
  <div>
  <button [disabled]="!valid" class="btn btn-hero-success btn-demo">Comprar</button>
  </div>
  `,
})
export class DepositoConfirmationComponent implements OnInit {
  @Input() valid: any;
  constructor() { }

  ngOnInit() {
  }

}
