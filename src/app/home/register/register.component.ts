import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

public novoRegistro: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.novoRegistro = this.formBuilder.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.min(10000000000), Validators.max(99999999999)]],
      rg: ['', [Validators.required, Validators.min(100000000), Validators.max(999999999)]],
      telefone: formBuilder.group({
        dd: ['', [Validators.minLength(2), Validators.maxLength(2)]],
        numero: ['', [Validators.minLength(8), Validators.maxLength(9)]]}),
      nascimento: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      cidade: ['', Validators.required],
      estado: ['', Validators.required]});
   }

  ngOnInit() {  }

  submit() {
  // Enviar os dados do forms | salvos em novoRegistro.value
  }

}
