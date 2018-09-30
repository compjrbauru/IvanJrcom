import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { NotificacaoService } from '../../../services/notificacao.service';
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

  constructor(private depositoservice: DepositoService, private notific: NotificacaoService) { }

  ngOnInit() {
    this.contas = this.depositoservice.getContaDeposito();
    this.contasID$ = new Subject<string>();
    this.contasID = this.depositoservice.getContaDepositoID(this.contasID$);
  }

  resolver(event) {
    this.eventoResolver = event ? event[0] : null;
  }

  Submit(form: any) {
    this.depositoservice.editContaDeposito(form.value);
    this.eventoResolver = [];
    this.form['formDeposito'].reset();
    this.notific.ngxtoaster('Conta editada com sucesso!', '', true);
  }

  excluirConta() {
    this.depositoservice.removeContaDeposito(this.eventoResolver.id);
    this.notific.ngxtoaster('Conta excluida com sucesso!', '', true);
  }

}
