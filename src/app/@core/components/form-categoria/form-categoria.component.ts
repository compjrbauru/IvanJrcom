import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-form-categoria',
  templateUrl: './form-categoria.component.html',
  styleUrls: ['./form-categoria.component.scss'],
})
export class FormCategoriaComponent implements OnInit, DoCheck {
  formCategoria: FormGroup;
  resolvedaux: any;
  verified = false;
  @Input() resolvedEvento: any = null;
  @Output() formEmitter = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formCategoria = this.formBuilder.group({
      nome: ['', Validators.required],
      id: [''],
      busca: [''],
      count: [''],
      idsevento: [''],
      mostrarHome: [false, Validators.required],
      url: ['', Validators.required],
      pathurl: ['', Validators.required],
    });
    this.patchValues(this.resolvedEvento);
    this.onFormValueChanges();
    this.formEmitter.emit(this.formCategoria);
  }

  onFormValueChanges() {
    this.formCategoria.valueChanges.subscribe(() => {
      this.formEmitter.emit(this.formCategoria);
    });
  }

  ngDoCheck() {
    this.patchValues(this.resolvedEvento);
  }

  patchValues(resolvedEvento: any = []) {
    if (resolvedEvento && resolvedEvento.length !== 0 && resolvedEvento !== this.resolvedaux) {
      this.resolvedaux = resolvedEvento;
      this.formCategoria.patchValue({
        ...resolvedEvento,
      });
      this.verified = true;
    }
  }

}
