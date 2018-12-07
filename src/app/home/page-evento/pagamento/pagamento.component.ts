import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';

import { RouterHelper } from '../../../@core/utils/helpers/router-helper';
import { config } from './../../../config/config';

@Component({
  selector: 'ngx-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss'],
})
export class PagamentoComponent implements OnInit, OnDestroy {
  recaptchaKey = config.recaptcha.key;
  compra: any;
  userInfo: any;
  protected reCaptcha: FormGroup;

  constructor(
    private localStorage: LocalStorage,
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.userInfo = RouterHelper.getValues(this.route, 'userInfo');
    this.reCaptcha = this.fb.group({
      recaptcha: ['', Validators.required],
    });
    this.localStorage.getItem('compra').subscribe(response => {
      this.compra = response;
      this.localStorage.clear();
    });
  }

  ngOnDestroy() {
    this.localStorage.clear();
  }


}
