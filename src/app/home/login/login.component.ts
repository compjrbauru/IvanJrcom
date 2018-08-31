import { ResetPassComponent } from './reset-pass.component';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { enterComponent } from '../../@core/animations/animations';
import { NotificacaoService } from './../../services/notificacao.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { MatDialog } from '@angular/material';

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
    private authService: AuthService,
    private router: Router,
    private usuarioService: UsuarioService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.formLogin = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  resetPass() {
    this.dialog.open(ResetPassComponent, {
      height: '300px',
      width: '350px',
    });
  }

  loginFacebook() {
    this.authService.authFacebook().then((res: any) => {
      if (res === 'sucesso') {
        this.notificacao.ngxtoaster(
          'Login',
          'Realizado com Sucesso!',
          true,
        );
        this.router.navigate(['/home']);
      } else if (typeof res === 'object') {
        this.usuarioService.addUsuario(res);
        this.router.navigate(['/home']);
      } else {
        this.notificacao.ngxtoaster(
          'Erro Login',
          'Login Falhou!',
          false,
        );
      }
    }, error => {
      this.notificacao.ngxtoaster(
        'Erro Login',
        'Login Falhou!',
        false,
      );
    });
  }

  submit(form: any) {
    this.authService.signInWithEmail(form.email, form.password).then(res => {
      if (res === 'sucesso') {
        this.notificacao.ngxtoaster(
          'Login',
          'Realizado com Sucesso!',
          true,
        );
        this.router.navigate(['/home']);
      } else if (res === 'auth/invalid-email') { // Email invalido
        this.notificacao.ngxtoaster(
          'Erro Login',
          'Email Invalido!',
          false,
        );
      } else if (res === 'auth/user-not-found') { // Erro no login, usuario nao encontrado
        this.notificacao.ngxtoaster(
          'Erro Login',
          'Este Email não está cadastrado!',
          false,
        );
      } else if (res === 'auth/wrong-password') { // Erro no login, senha incorreta
        this.notificacao.ngxtoaster(
          'Erro Login',
          'Senha Incorreta!',
          false,
         );
      } else {
        this.notificacao.ngxtoaster(
        'Erro Login',
        res,
        false,
        );
      }
    });
  }
}
