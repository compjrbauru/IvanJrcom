import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { NotificacaoService } from './../../services/notificacao.service';
import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { buttonVerified } from '../../@core/animations/animations';
import { ValidatorSenha } from './Validators/ValidatorSenha';
import { ValidatorNumMin } from './Validators/ValidatorNumMin';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [buttonVerified('buttonregister')],
})
export class RegisterComponent implements OnInit {
  public novoRegistro: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private usuarioService: UsuarioService,
              private notificacao: NotificacaoService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.novoRegistro = this.formBuilder.group({
      Senha: ['', Validators.required],
      ConfirmarSenha: ['', Validators.required],
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      CPF: ['', Validators.required],
      RG: ['', Validators.required],
      telefone: this.formBuilder.group({
        dd: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
        numero: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(9)]]}),
      nascimento: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      Cidade: ['', Validators.required],
      Estado: ['', Validators.required]},
      { validator: [ ValidatorSenha.MesmaSenha,
        ValidatorNumMin.DigitosRestantes]});
   }

  submit() {
    const email = this.novoRegistro.value.email;
    const pass = this.novoRegistro.value.Senha;
    this.authService.signupUser(email, pass).then(res => {
      if (res === 'success') {
        const user = this.authService.getUser();

        user.sendEmailVerification().then( () => {
          const form = this.novoRegistro.value;
          form.id = user.uid; // Adiciona o uid do usuario como campo id

          this.usuarioService.addUsuario(form); // Adiciona o usuario

          this.notificacao.ngxtoaster(
            'Cadastro',
            'Usuario Cadastrado com sucesso!',
            true,
          );
          this.router.navigate(['/home']);
        });
      } else if (res === 'auth/email-already-in-use') { // Email ja cadastrado!
        this.notificacao.ngxtoaster(
          'Erro Cadastro',
          'Este Email já está cadastrado!',
          false,
        );
      } else { // imprime o erro especificado pelo firebase
        this.notificacao.ngxtoaster(
          'Erro Cadastro',
          res,
          false,
        );
      }
    });
  }
}
