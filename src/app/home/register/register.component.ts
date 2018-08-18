import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidatorSenha } from './Validators/ValidatorSenha';
import { ValidatorNumMin } from './Validators/ValidatorNumMin';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

public novoRegistro: FormGroup;

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService) { }

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
    this.usuarioService.addUsuario(this.novoRegistro.value);
  }

}
