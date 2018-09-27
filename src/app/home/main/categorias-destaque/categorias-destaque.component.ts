import { Component, OnInit } from '@angular/core';

import { CategoriaService } from './../../../services/categoria.service';

@Component({
  selector: 'ngx-categorias-destaque',
  templateUrl: './categorias-destaque.component.html',
  styleUrls: ['./categorias-destaque.component.scss'],
})
export class CategoriasDestaqueComponent implements OnInit {
  categoriasDestaque: any;

  constructor(private categoriaservice: CategoriaService) { }

  ngOnInit() {
    this.categoriaservice.getCategoriaDestaque().subscribe(res => this.categoriasDestaque = res);
  }

}
