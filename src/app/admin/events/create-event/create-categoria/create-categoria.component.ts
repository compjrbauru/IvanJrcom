import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../../../services/evento.service';
import { CategoriaService } from '../../../../services/categoria.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'ngx-create-categoria',
  templateUrl: './create-categoria.component.html',
  styleUrls: ['./create-categoria.component.scss'],
})
export class CreateCategoriaComponent implements OnInit {
  
  categoria: any;
  formCategoria: FormGroup;


  constructor(
    private eventoService: EventoService,
    private categoriaService: CategoriaService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.formCategoria = this.formBuilder.group({
        id: [''],
        count: [''],
        idsevento: [''],
        nome: ['', Validators.required],
        busca: [''],
    });
  }

  OnSubmit(form: any) {
    this.categoriaService.addCategoria(form);
    this.formCategoria.reset();
  }

}
