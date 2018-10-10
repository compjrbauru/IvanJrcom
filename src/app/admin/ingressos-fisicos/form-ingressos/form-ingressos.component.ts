import { cloneDeep } from 'lodash';
import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-form-ingressos',
  templateUrl: './form-ingressos.component.html',
  styleUrls: ['./form-ingressos.component.scss'],
})
export class FormIngressosComponent implements OnInit, OnChanges {
  @Input()
  formReset: boolean;
  @Input()
  resolvedEvento: any = null;
  @Output()
  formEmitter = new EventEmitter<any>();
  formIngressos: FormGroup = null;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formIngressos = this.formBuilder.group({
      id: [''],
      data: [''],
      ingressos: [''],
      idEvento: [''],
      nomeEvento: [''],
      numeroIngressos: this.formBuilder.group({
        feminino: ['', Validators.required],
        masculino: ['', Validators.required],
        unisex: ['', Validators.required],
      }),
      valor: this.formBuilder.group({
        feminino: ['', Validators.required],
        masculino: ['', Validators.required],
        unisex: ['', Validators.required],
      }),
    });

    this.onFormValueChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    const evento = cloneDeep(changes.resolvedEvento.currentValue);
    if (!changes.resolvedEvento.isFirstChange())
      if (evento !== changes.resolvedEvento.previousValue.nome) {
        this.patchNome(this.resolvedEvento);
      }
  }

  patchNome(resolvedEvento: any = []) {
    this.formIngressos.patchValue( {
      id: '',
      data: '',
      ingressos: '',
      nomeEvento: resolvedEvento.nome,
      idEvento: resolvedEvento.id,
      numeroIngressos: {
        masculino: '',
        feminino: '',
        unisex: '',
      },
      valor: {
        masculino: '',
        feminino: '',
        unisex: '',
      },
    });
  }

  onFormValueChanges() {
    this.formIngressos.valueChanges.subscribe(() => {
      this.formEmitter.emit(this.formIngressos);
    });
  }

}
