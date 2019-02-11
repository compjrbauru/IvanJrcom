import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { buttonVerified } from '../../@core/animations/animations';
import { AuthService } from '../../services/auth.service';
import { NotificacaoService } from '../../services/notificacao.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [buttonVerified('buttonregister')],
})
export class RegisterComponent implements OnInit {
  form: any = {};

  constructor(
    private usuarioService: UsuarioService,
    private notificacao: NotificacaoService,
    private authService: AuthService,
    private router: Router,
  ) { }


  ngOnInit() { }


  submit() {
    const email = this.form['formEvent'].value.email;
    const pass = this.form['formEvent'].value.Senha;
    this.authService.signupUser(email, pass).then(res => {
      if (res === 'success') {
        const user = this.authService.getUser();
        user.sendEmailVerification().then(() => {
          const { senha: removedSenha, ConfirmarSenha: removedConfirmarSenha, ...form } = this.form['formEvent'].value;
          this.usuarioService.addUsuario(form); // Adiciona o usuario
          this.notificacao.ngxtoaster(
            'Cadastro',
            'Usuario Cadastrado com sucesso! Verifique seu Email!',
            true,
          );
          this.router.navigate(['/home']);
        });
      } else if (res === 'auth/email-already-in-use') {
        // Email ja cadastrado!
        this.notificacao.ngxtoaster(
          'Erro Cadastro',
          'Este Email já está cadastrado!',
          false,
        );
      } else {
        // imprime o erro especificado pelo firebase
        this.notificacao.ngxtoaster('Erro Cadastro', res, false);
      }
    });
  }
}
