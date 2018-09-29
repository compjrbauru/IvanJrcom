import { Component, OnInit } from '@angular/core';

import { NotificacaoService } from '../../../services/notificacao.service';
import { DepositoService } from './../../../services/deposito.service';

@Component({
  selector: 'ngx-create-deposito',
  templateUrl: './create-deposito.component.html',
  styleUrls: ['./create-deposito.component.scss']
})
export class CreateDepositoComponent implements OnInit {
  form: any = {};

  constructor(private depositoservice: DepositoService, private notific: NotificacaoService, ) { }

  ngOnInit() {
  }

  Submit(form: any) {
    this.depositoservice.addContaDeposito(form.value);
    this.form['formDeposito'].reset();
    this.notific.ngxtoaster('Conta criada com sucesso!', '', true);
  }
}
