import 'style-loader!angular2-toaster/toaster.css';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BodyOutputType, Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { enterComponent } from '../../@core/animations/animations';
import { NotificacaoService } from './../../services/notificacao.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [enterComponent('cardanimation')],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private notificacao: NotificacaoService,
    private toasterService: ToasterService,
  ) {}

  config: ToasterConfig;

  ngOnInit() {
    this.formLogin = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  resetPass() {}

  loginFacebook() {}

  submit(form: any) {
    this.notificacao.showSnackbar(
      'Senha incorreta ou  o usuário não existe',
      null,
      3000,
    );
    /*     this.notificacao.showToast(
      this.config,
      'error',
      'Erro Login',
      'Senha incorreta ou  o usuário não existe',
      'toast-top-full-width',
      'slideDown',
      3000,
      5,
    ); */
    this.config = new ToasterConfig({
      positionClass: 'toast-top-full-width',
      timeout: 3000,
      newestOnTop: true,
      tapToDismiss: true,
      preventDuplicates: true,
      animation: 'slideDown',
      limit: 5,
    });
    const toast: Toast = {
      type: 'error',
      title: 'Erro Login',
      body: 'Senha incorreta ou  o usuário não existe',
      timeout: 3000,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }
}
