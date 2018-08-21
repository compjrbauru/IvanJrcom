import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

import { QueryService } from './../../../services/query.service';

@Component({
  selector: 'ngx-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  categorias = ['eletronica', 'metal', 'darkmetal'];
  searchForm: FormGroup;
  eventos: any;
  constructor(private fb: FormBuilder, private searchservice: QueryService) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      evento: new FormControl('', [Validators.required]),
      local: new FormControl('', [Validators.required]),
      categoria: new FormControl('null', [Validators.required]),
    });
    this.formOnChanges();
  }

  formOnChanges() {
    this.searchForm.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        filter((data: any) => data.evento.length > 1 || data.local.length > 1),
      )
      .subscribe(res => {
        this.searchservice.searchEvento(res);
      });
  }
}
