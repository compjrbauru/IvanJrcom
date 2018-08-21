import { Observable } from 'rxjs';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, DoCheck } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { timestamp } from 'rxjs/operators';

@Component({
  selector: 'ngx-form-evento',
  templateUrl: './form-evento.component.html',
  styleUrls: ['./form-evento.component.scss'],
})
export class FormEventoComponent implements OnInit, DoCheck {
  @Input() categorias: Observable<any>;
  @Input() resolvedEvento: any = null;
  @Output() formEmitter = new EventEmitter<any>();
  formEvent: FormGroup = null;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formEvent = this.formBuilder.group({
      nome: ['', Validators.required],
      categoria: ['', Validators.required],
      data: ['', Validators.required],
      descricao: ['', Validators.required],
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
      url: [null,
        Validators.pattern(`(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+
        [a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+
        [a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})`)],
      id: [''],
    });
    this.patchValues(this.resolvedEvento);


    this.onFormValueChanges();
  }

  ngDoCheck() {
    this.patchValues(this.resolvedEvento);
  }

  resolveData(data: any) {
    if (data && data.hasOwnProperty('seconds') && !(typeof data === 'string')) {
      data = data.toDate();
      const mnth = ('0' + (data.getMonth() + 1)).slice(-2);
      const day  = ('0' + data.getDate()).slice(-2);
      const hours  = ('0' + data.getHours()).slice(-2);
      const minutes = ('0' + data.getMinutes()).slice(-2);
      return [ data.getFullYear(), mnth, day + 'T' + hours + ':' + minutes ].join('-');
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
    this.formEvent.valueChanges.subscribe(form => {
      this.formEmitter.emit(this.formEvent);
    });
  }

}
