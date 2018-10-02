import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { CategoriaService } from './../../../services/categoria.service';

@Component({
  selector: 'ngx-categorias-destaque',
  templateUrl: './categorias-destaque.component.html',
  styleUrls: ['./categorias-destaque.component.scss'],
})
export class CategoriasDestaqueComponent implements OnInit {
  categoriasAsync: Observable<any>;

  constructor(private categoriaservice: CategoriaService, private router: Router) { }

  ngOnInit() {
    this.categoriasAsync = this.categoriaservice.getCategoriaDestaque();
  }

}
