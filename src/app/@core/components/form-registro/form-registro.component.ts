import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidatorNumMin } from './Validators/ValidatorNumMin';
import { ValidatorSenha } from './Validators/ValidatorSenha';

@Component({
  selector: 'ngx-form-registro',
  templateUrl: './form-registro.component.html',
  styleUrls: ['./form-registro.component.scss'],
})
export class FormRegistroComponent implements OnInit, DoCheck {
  public formEvent: FormGroup;
  @Output() formEmitter = new EventEmitter<any>();
  @Input() resolvedEvento: any = null;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formEvent = this.formBuilder.group(
      {
        Senha: ['', Validators.required],
        ConfirmarSenha: ['', Validators.required],
        registroCompleto: [true, Validators.required],
        nome: ['', Validators.required],
        sobrenome: ['', Validators.required],
        CPF: ['', Validators.required],
        RG: ['', Validators.required],
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
      {
        validator: [
          ValidatorSenha.MesmaSenha,
          ValidatorNumMin.DigitosRestantes,
        ],
      },
    );
    this.patchValues(this.resolvedEvento);
    this.onFormValueChanges();
    this.formEmitter.emit(this.formEvent);
  }

  onFormValueChanges() {
    this.formEvent.valueChanges.subscribe(() => {
      this.formEmitter.emit(this.formEvent);
    });
  }

  ngDoCheck() {
    this.patchValues(this.resolvedEvento);
  }

  resolvenascimento(nascimento: any) {
    if (nascimento && nascimento.hasOwnProperty('seconds') && !(typeof nascimento === 'string')) {
      nascimento = nascimento.toDate();
      const mnth = ('0' + (nascimento.getMonth() + 1)).slice(-2);
      const day = ('0' + nascimento.getDate()).slice(-2);
      const hours = ('0' + nascimento.getHours()).slice(-2);
      const minutes = ('0' + nascimento.getMinutes()).slice(-2);
      return [nascimento.getFullYear(), mnth, day + 'T' + hours + ':' + minutes].join(
        '-',
      );
    } else {
      return null;
    }
  }

  patchValues(resolvedEvento: any = []) {
    if (resolvedEvento && !(typeof resolvedEvento.nascimento === 'string')) {
      const time = this.resolvenascimento(resolvedEvento.nascimento);
      resolvedEvento.nascimento = time;
      this.formEvent.patchValue({
        ...resolvedEvento,
      });
    }
  }
}
