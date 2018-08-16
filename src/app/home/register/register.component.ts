import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { buttonVerified } from '../../@core/animations/animations';
import { ValidatorSenha } from './Validators/ValidatorSenha';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [buttonVerified('buttonregister')],
})
export class RegisterComponent implements OnInit {
  public novoRegistro: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.novoRegistro = this.formBuilder.group(
      {
        Username: ['', Validators.required],
        Senha: ['', Validators.required],
        ConfirmarSenha: ['', Validators.required],
        nome: ['', Validators.required],
        sobrenome: ['', Validators.required],
        CPF: [
          '',
          [
            Validators.required,
            Validators.min(10000000000),
            Validators.max(99999999999),
          ],
        ],
        RG: [
          '',
          [
            Validators.required,
            Validators.min(100000000),
            Validators.max(999999999),
          ],
        ],
        telefone: this.formBuilder.group({
          dd: [
            '',
            [
              Validators.required,
              Validators.minLength(2),
              Validators.maxLength(2),
            ],
          ],
          numero: [
            '',
            [
              Validators.required,
              Validators.minLength(8),
              Validators.maxLength(9),
            ],
          ],
        }),
        nascimento: ['', Validators.required],
        email: ['', [Validators.email, Validators.required]],
        Cidade: ['', Validators.required],
        Estado: ['', Validators.required],
      },
      { validator: ValidatorSenha.MesmaSenha },
    );
  }

  submit() {
    // Enviar os dados do forms | salvos em novoRegistro.value
  }
}
