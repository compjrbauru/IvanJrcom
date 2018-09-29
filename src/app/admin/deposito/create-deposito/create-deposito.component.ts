import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-create-deposito',
  templateUrl: './create-deposito.component.html',
  styleUrls: ['./create-deposito.component.scss']
})
export class CreateDepositoComponent implements OnInit {
  form: any = {};

  constructor() { }

  ngOnInit() {
  }

  Submit(form: any) {
    console.log(form);
  }
}
