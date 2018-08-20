import { CategoriaService } from './../../../services/categoria.service';
import { EventoService } from './../../../services/evento.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'ngx-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent implements OnInit {

  formEvent: FormGroup;
  categorias: any;
  categoria: any;
  constructor(private formBuilder: FormBuilder, private eventoService: EventoService,
    private categoriaService: CategoriaService) { }

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

    this.formEvent.reset();
   }

}
