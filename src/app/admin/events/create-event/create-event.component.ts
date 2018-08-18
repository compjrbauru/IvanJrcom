import { CategoriaService } from './../../../services/categoria.service';
import { EventoService } from './../../../services/evento.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { timestamp } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Timestamp } from 'rxjs/internal/operators/timestamp';


@Component({
  selector: 'ngx-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent implements OnInit {

  formEvent: FormGroup;
  categorias: any;

  constructor(private formBuilder: FormBuilder, private eventoService: EventoService, private categoriaService: CategoriaService) { }

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

    this.categorias = this.categoriaService.getCategoria();
    console.log(this.categorias);
  }

  submit(form: any) {
    console.log(form);
    this.eventoService.addData(form);
    //this.categoriaService.patchCategoria(this.categorias, form);
   }

}
