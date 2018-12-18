import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { debounceTime, distinctUntilChanged, filter, tap, map, switchMap } from 'rxjs/operators';

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
  search: boolean = false;
  @Output() pesquisa: EventEmitter<any> = new EventEmitter();

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
    this.onFormValueChanges();
  }

  date_sort(a: any, b: any) {
    return a.data.seconds - b.data.seconds;
  }

  onFormValueChanges() {
    this.searchForm.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged((previous, current) => previous.evento === current.evento && previous.local === current.local && previous.categoria === current.categoria),
      tap(this.notHasLenght),
      filter(response => response.evento.length > 1 || response.local.length > 1 || response.categoria !== 'null'),
      tap(this.showSpinner),
      map((response) => {
        response.evento = response.evento.toLowerCase();
        response.local = response.local.toLowerCase();
        return response;
      }),
      switchMap((formValue) => this.searchservice.searchEvento(formValue, ['nomeBusca', 'localBusca'])),
    ).subscribe((response: any[]) => {
      response.length ? this.eventos = response : null;
      this.search = this.eventos ? true : false;
      this.spinner.hide();
    });
  }

  private notHasLenght = (response: any): void => {
    if (response.evento.length < 1 && response.local.length < 1 && response.categoria === 'null') {
      this.pesquisa.emit(false);
      this.eventos = null;
    }
  }

  private showSpinner = (): void => {
    this.spinner.show();
    this.pesquisa.emit(true);
  }
}
