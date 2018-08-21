import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CategoriaService } from './../../../services/categoria.service';
import { EventoService } from './../../../services/evento.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'ngx-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent implements OnInit {
  form: any = {};
  categorias: Observable<any>;
  categoria: any;
  constructor(
    private eventoService: EventoService,
    private categoriaService: CategoriaService,
  ) { }

  ngOnInit() {
    this.categorias = this.categoriaService.getCategoria();
  }

  submit(form: any) {
    form.data = new Date(form.data);
    this.eventoService.addData(form);
    this.categoria = this.categoriaService.searchrcategoriabynome(form.categoria).subscribe(
      (res: any) => {
        this.categoriaService.patchCategoria(res[0], form);
        this.categoria.unsubscribe();
      },
    );

    alert('Evento criado com sucesso!');

    this.form['formEvent'].reset();
   }

}
