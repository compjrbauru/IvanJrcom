import { Component, DoCheck, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-form-evento',
  templateUrl: './form-evento.component.html',
  styleUrls: ['./form-evento.component.scss'],
})
export class FormEventoComponent implements OnInit, OnChanges {
  @Input() dependencies: any;
  @Input() resolvedEvento: any = null;
  @Output() formEmitter = new EventEmitter<any>();
  formEvent: FormGroup = null;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    const numeroIngressosValidation: ValidatorFn = (form: AbstractControl) => {
      const error = {
        numeroIngressos:
          'O número de ingressos disponíveis não é a soma de ingressos por gênero',
      };
      const soma =
        +form.get('ingressos').get('feminino').get('disponiveis').value +
        +form.get('ingressos').get('masculino').get('disponiveis').value +
        +form.get('ingressos').get('unisex').get('disponiveis').value;
      return +form.get('ingressos').get('lote').get('disponiveis').value === soma ? null : error;
    };
    const pagamentoValidation: ValidatorFn = (form: AbstractControl) => {
      const error = {
        pagamento: 'Selecione pelo menos um meio de pagamento',
      };
      return (
        form.get('pagamento').get('boleto').value === false &&
        form.get('pagamento').get('credito').value === false &&
        form.get('pagamento').get('deposito').value === false &&
        form.get('pagamento').get('fisica').value === false
      ) ? error : null;
    };
    const depositoValidation: ValidatorFn = (form: AbstractControl) => {
      const error = {
        deposito: 'Selecione uma conta para deposito',
      };
      return (
        form.get('pagamento').get('deposito').value === true &&
        form.get('pagamento').get('contaDeposito').value === ''
      ) ? error : null;
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
        pagamento: this.formBuilder.group({
          boleto: [false, Validators.required],
          credito: [false, Validators.required],
          deposito: [false, Validators.required],
          fisica: [false, Validators.required],
          contaDeposito: [''],
        }),
        id: [''],
        nomeBusca: null,
        localBusca: null,
      },
      { validator: [numeroIngressosValidation, pagamentoValidation, depositoValidation] },
    );
    this.patchValues(this.resolvedEvento);

    this.onFormValueChanges();
    this.formEmitter.emit(this.formEvent);
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('resolvedEvento' in changes && !changes.resolvedEvento.firstChange) {
      this.patchValues(this.resolvedEvento);
      if (
        this.formEvent.get('pagamento').get('deposito').value === false &&
        this.formEvent.get('pagamento').get('contaDeposito').value !== ''
      ) {
        this.formEvent.get('pagamento').get('contaDeposito').setValue('');
      }
    }
  }

  resolveData(data: any) {
    if (data && data.hasOwnProperty('seconds') && !(typeof data === 'string')) {
      data = new Date(data.seconds * 1000);
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
