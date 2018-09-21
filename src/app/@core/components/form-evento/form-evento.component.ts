import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-form-evento',
  templateUrl: './form-evento.component.html',
  styleUrls: ['./form-evento.component.scss'],
})
export class FormEventoComponent implements OnInit, DoCheck {
  @Input()
  categorias: any;
  @Input()
  resolvedEvento: any = null;
  @Output()
  formEmitter = new EventEmitter<any>();
  formEvent: FormGroup = null;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    const numeroIngressosValidation: ValidatorFn = (form: AbstractControl) => {
      const error = {
        numeroIngressos:
          'O número de ingressos disponíveis não é a soma de ingressos por gênero',
      };
      // tslint:disable-next-line:max-line-length
      const soma =
        +form.get('ingressos').get('feminino').get('disponiveis').value +
        +form.get('ingressos').get('masculino').get('disponiveis').value +
        +form.get('ingressos').get('unisex').get('disponiveis').value;
      // tslint:disable-next-line:max-line-length
      return +form.get('ingressos').get('lote').get('disponiveis').value === soma ? null : error;
    };

    this.formEvent = this.formBuilder.group(
      {
        nome: ['', Validators.required],
        categoria: [null, Validators.required],
        data: ['', Validators.required],
        descricao: ['', Validators.required],
        local: ['', Validators.required],
        coordenadas: ['', Validators.required],
        ingressos: this.formBuilder.group({
          lote: this.formBuilder.group({
            disponiveis: ['', Validators.required],
            numero: ['1', Validators.required],
          }),
          feminino: this.formBuilder.group({
            disponiveis: [],
            valor: [],
          }),
          masculino: this.formBuilder.group({
            disponiveis: [],
            valor: [],
          }),
          unisex: this.formBuilder.group({
            disponiveis: [],
            valor: [],
          }),
          compramax: ['', Validators.required],
        }),
        mostraHome: null,
        url: ['', Validators.required],
        pathurl: ['', Validators.required],
        id: [''],
        nomeBusca: null,
        localBusca: null,
      },
      { validator: numeroIngressosValidation },
    );
    this.patchValues(this.resolvedEvento);

    this.onFormValueChanges();
    this.formEmitter.emit(this.formEvent);
  }

  ngDoCheck() {
    this.patchValues(this.resolvedEvento);

  }

  resolveData(data: any) {
    if (data && data.hasOwnProperty('seconds') && !(typeof data === 'string')) {
      data = data.toDate();
      const mnth = ('0' + (data.getMonth() + 1)).slice(-2);
      const day = ('0' + data.getDate()).slice(-2);
      const hours = ('0' + data.getHours()).slice(-2);
      const minutes = ('0' + data.getMinutes()).slice(-2);
      return [data.getFullYear(), mnth, day + 'T' + hours + ':' + minutes].join(
        '-',
      );
    } else {
      return null;
    }
  }

  patchValues(resolvedEvento: any = []) {
    if (resolvedEvento && !(typeof resolvedEvento.data === 'string')) {
      const time = this.resolveData(resolvedEvento.data);
      resolvedEvento.data = time;
      this.formEvent.patchValue({
        ...resolvedEvento,
      });
    }
  }

  onFormValueChanges() {
    this.formEvent.valueChanges.subscribe(() => {
      this.formEmitter.emit(this.formEvent);
    });
  }
}
