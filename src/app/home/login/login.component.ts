import 'style-loader!angular2-toaster/toaster.css';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
    this.notificacao.ngxtoaster(
      'Erro Login',
      'Senha incorreta ou  o usuário não existe',
      false,
    );
  }
}
