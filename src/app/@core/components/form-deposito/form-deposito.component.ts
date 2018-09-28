import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-form-deposito',
  templateUrl: './form-deposito.component.html',
  styleUrls: ['./form-deposito.component.scss'],
})
export class FormDepositoComponent implements OnInit, DoCheck {
  formDeposito: FormGroup;
  @Input() resolvedEvento: any = null;
  @Output() formEmitter = new EventEmitter<any>();
  resolvedaux: any;
  verified = false;

  constructor(private formbuilder: FormBuilder) { }

  ngOnInit() {
    this.formDeposito = this.formbuilder.group({
      nome: ['', Validators.required],
      conta: ['', Validators.required],
      agencia: ['', Validators.required],
      tipo: ['corrente', Validators.required],
    });
    this.patchValues(this.resolvedEvento);
    this.onFormValueChanges();
    this.formEmitter.emit(this.formDeposito);
  }

  onFormValueChanges() {
    this.formDeposito.valueChanges.subscribe(() => {
      this.formEmitter.emit(this.formDeposito);
    });
  }

  ngDoCheck() {
    this.patchValues(this.resolvedEvento);
  }

  patchValues(resolvedEvento: any = []) {
    if (resolvedEvento && resolvedEvento.length !== 0 && resolvedEvento !== this.resolvedaux) {
      this.resolvedaux = resolvedEvento;
      this.formDeposito.patchValue({
        ...resolvedEvento,
      });
      this.verified = true;
    }
  }


}
