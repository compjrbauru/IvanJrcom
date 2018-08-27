import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
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
    private spinner: NgxSpinnerService,
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
        debounceTime(300),
        distinctUntilChanged(),
      )
      .subscribe(res => {
        if (res.evento.length > 1 || res.local.length > 1) {
          this.eventos = null;
          this.pesquisa.emit(true);
          this.spinner.show();
          res.evento = res.evento.toLowerCase();
          res.local = res.local.toLowerCase();
          if (res.evento !== '') {
            this.searchservice
              .searchEvento(res.evento, 'nomeBusca')
              .subscribe(res1 => {
                if (res.local !== '') {
                  res1 = res1.filter((el: any) => {
                    return el.localBusca.indexOf(res.local) > -1;
                  });
                }
                if (res.categoria !== 'null') {
                  res1 = res1.filter((el: any) => {
                    return el.categoria.indexOf(res.categoria) > -1;
                  });
                }
                this.spinner.hide();
                res1.length === 0
                  ? (this.eventos = 'NAO ENCONTRADO')
                  : (this.eventos = res1);
              });
          } else {
            this.searchservice
              .searchEvento(res.local, 'localBusca')
              .subscribe(res2 => {
                if (res.categoria !== 'null') {
                  res2 = res2.filter((el: any) => {
                    return el.categoria.indexOf(res.categoria) > -1;
                  });
                }
                this.spinner.hide();
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
