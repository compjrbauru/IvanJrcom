import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-form-registro',
  templateUrl: './form-registro.component.html',
  styleUrls: ['./form-registro.component.scss'],
})
export class FormRegistroComponent implements OnInit {
  public formEvent: FormGroup;
  @Output() formEmitter = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    const RGvalidator: ValidatorFn = (form: AbstractControl) => {
      const error = {
        RGvalidator: 'O número de RG não é valido',
      };
      return (form.get('RG').value.length < 9 && !form.get('RG').untouched) ? error : null;
    };
    const CPFvalidator: ValidatorFn = (form: AbstractControl) => {
      const error = {
        CPFvalidator: 'O número de CPF não é valido',
      };
      return (form.get('CPF').value.length < 11 && !form.get('CPF').untouched) ? error : null;
    };
    const PassValidator: ValidatorFn = (form: AbstractControl) => {
      const error = {
        PassValidator: 'As senhas não combinam',
      };
      return (form.get('Senha').value !== form.get('ConfirmarSenha').value) ? error : null;
    };
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
      { validator: [RGvalidator, CPFvalidator, PassValidator] },
    );
    this.onFormValueChanges();
    this.formEmitter.emit(this.formEvent);
  }

  onFormValueChanges() {
    this.formEvent.valueChanges.subscribe(() => {
      this.formEmitter.emit(this.formEvent);
    });
  }

}
