import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CategoriaService } from '../../../services/categoria.service';

@Component({
  selector: 'ngx-form-categoria',
  templateUrl: './form-categoria.component.html',
  styleUrls: ['./form-categoria.component.scss'],
})
export class FormCategoriaComponent implements OnInit {
  categoria: any;
  formCategoria: FormGroup;

  constructor(
    private categoriaService: CategoriaService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.formCategoria = this.formBuilder.group({
      id: [''],
      count: [''],
      idsevento: [''],
      nome: ['', Validators.required],
      busca: [''],
      mostrarHome: [''],
    });
  }

  OnSubmit(form: any) {
    this.categoriaService.addCategoria(form);
    this.formCategoria.reset();
  }


}
