import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { CategoriaService } from './../../../services/categoria.service';
import { QueryService } from './../../../services/query.service';

@Component({
  selector: 'ngx-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  categorias: any;
  searchForm: FormGroup;
  eventos: any;
  @Output()
  pesquisa: EventEmitter<any> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private searchservice: QueryService,
    private categoriaservice: CategoriaService,
  ) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      evento: new FormControl('', [Validators.required]),
      local: new FormControl('', [Validators.required]),
      categoria: new FormControl('null', [Validators.required]),
    });
    this.categorias = this.categoriaservice.getCategoria();
    this.formOnChanges();
  }

  formOnChanges() {
    const formChanges = this.searchForm.valueChanges;
    formChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
      )
      .subscribe(res => {
        if (res.evento.length > 1 || res.local.length > 1) {
          this.pesquisa.emit(true);
          if (res.evento !== '') {
            this.searchservice
              .searchEvento(res.evento, 'nome')
              .subscribe(res1 => {
                if (res.local !== '') {
                  res1 = res1.filter(function(el: any) {
                    return el.local.indexOf(res.local) > -1;
                  });
                }
                if (res.categoria !== 'null') {
                  res1 = res1.filter(function(el: any) {
                    return el.categoria.indexOf(res.categoria) > -1;
                  });
                }
                res1.length === 0
                  ? (this.eventos = 'NAO ENCONTRADO')
                  : (this.eventos = res1);
              });
          } else {
            this.searchservice
              .searchEvento(res.local, 'local')
              .subscribe(res2 => {
                if (res.categoria !== 'null') {
                  res2 = res2.filter(function(el: any) {
                    return el.categoria.indexOf(res.categoria) > -1;
                  });
                }
                res2.length === 0
                  ? (this.eventos = 'NAO ENCONTRADO')
                  : (this.eventos = res2);
              });
          }
        } else {
          this.pesquisa.emit(false);
          this.eventos = null;
        }
      });
  }
}
