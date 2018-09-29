import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { DepositoService } from './../../../services/deposito.service';

@Component({
  selector: 'ngx-edit-deposito',
  templateUrl: './edit-deposito.component.html',
  styleUrls: ['./edit-deposito.component.scss']
})
export class EditDepositoComponent implements OnInit {
  form: any = {};
  contas: Observable<any>;
  contasID$ = new Subject<string>();
  contasID: Observable<any>;
  eventoResolver: any = [];

  constructor(private depositoservice: DepositoService) { }

  ngOnInit() {
    this.contas = this.depositoservice.getContaDeposito();
    this.contasID$ = new Subject<string>();
    this.contasID = this.depositoservice.getContaDepositoID(this.contasID$);
  }

  resolver(event) {
    this.eventoResolver = event ? event[0] : null;
  }

  Submit(form: any) {
  }

  excluirConta() {
  }

}
