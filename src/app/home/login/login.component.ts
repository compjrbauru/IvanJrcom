import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { enterComponent } from '../../@core/animations/animations';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from './../../services/auth.service';
import { NotificacaoService } from './../../services/notificacao.service';
import { ResetPassComponent } from './reset-pass.component';

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
  ) { }

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
    this.authService.authFacebook().then(
      (res: any) => {
        if (res === 'sucesso') {
          this.notificacao.ngxtoaster('Login', 'Realizado com Sucesso!', true);
          this.router.navigate(['/home']);
          this.getUserData().subscribe((res1: any) => {
            if (res1[0].registroCompleto === false) {
              this.notificacao.ngxtoaster(
                'Registro incompleto',
                'Por favor, para realizar compras complete seu registro nas configurações de usuário.',
                false,
                { timeOut: 10750, easeTime: 1000 },
              );
            }
            this.authService.setLocal(res1[0]);
          });
        } else if (typeof res === 'object') {
          this.usuarioService.addUsuario(res).subscribe(user => this.authService.setLocal(user));
          this.router.navigate(['/home']);
          this.notificacao.ngxtoaster('Login', 'Realizado com Sucesso!', true);
          this.notificacao.ngxtoaster(
            'Registro incompleto',
            'Por favor, para realizar compras complete seu registro nas configurações de usuário.',
            false,
            { timeOut: 10750, easeTime: 1000 },
          );
        } else {
          this.notificacao.ngxtoaster('Erro Login', 'Login Falhou!', false);
        }
      },
      error => {
        this.notificacao.ngxtoaster('Erro Login', 'Login Falhou!', false);
      },
    );
  }

  getUserData() {
    return this.usuarioService.getUsuarioEmail(this.authService.ReturnEmail());
  }

  submit(form: any) {
    this.authService.signInWithEmail(form.email, form.password).then(res => {
      if (res === 'sucesso') {
        this.notificacao.ngxtoaster('Login', 'Realizado com Sucesso!', true);
        this.getUserData().subscribe(userData => {
          this.authService.setLocal(userData[0]);
        });
        this.router.navigate(['/home']);
      } else if (res === 'auth/invalid-email') {
        // Email invalido
        this.notificacao.ngxtoaster('Erro Login', 'Email Invalido!', false);
      } else if (res === 'auth/user-not-found') {
        // Erro no login, usuario nao encontrado
        this.notificacao.ngxtoaster(
          'Erro Login',
          'Este Email não está cadastrado!',
          false,
        );
      } else if (res === 'auth/wrong-password') {
        // Erro no login, senha incorreta
        this.notificacao.ngxtoaster('Erro Login', 'Senha Incorreta!', false);
      } else {
        this.notificacao.ngxtoaster('Erro Login', res, false);
      }
    });
  }
}
