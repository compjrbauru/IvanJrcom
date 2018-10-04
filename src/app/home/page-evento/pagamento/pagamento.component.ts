import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorage } from '@ngx-pwa/local-storage';

import { UsuarioService } from '../../../services/usuario.service';
import { AuthService } from './../../../services/auth.service';

@Component({
  selector: 'ngx-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss'],
})
export class PagamentoComponent implements OnInit, OnDestroy {
  compra: any;
  userInfo: any;
  protected reCaptcha: FormGroup;

  constructor(
    private localStorage: LocalStorage,
    private usuarioservice: UsuarioService,
    private authservice: AuthService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.reCaptcha = this.fb.group({
      recaptcha: ['', Validators.required]
    });
    this.localStorage.getItem('compra').subscribe(response => {
      this.compra = response;
      console.log(this.compra);
      this.localStorage.clear();
    });
    this.usuarioservice.getUsuarioEmail(this.authservice.ReturnEmail()).subscribe(res => {
      this.userInfo = res[0];
    });
  }

  ngOnDestroy() {
    this.localStorage.clear();
  }


}
