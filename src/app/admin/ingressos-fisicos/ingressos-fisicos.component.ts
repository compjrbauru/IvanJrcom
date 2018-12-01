import { IngressosService } from './../../services/ingressos.service';
import { EventoService } from './../../services/evento.service';
import { QueryService } from './../../services/query.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'ngx-ingressos-fisicos',
  templateUrl: './ingressos-fisicos.component.html',
  styleUrls: ['./ingressos-fisicos.component.scss'],
})
export class IngressosFisicosComponent implements OnInit {

  form: any = {};
  eventoAsync: Observable<any>;
  eventoIdAsync: Observable<any>;
  eventoResolver: any = [];
  catID$ = new Subject<string>();
  resolvedHTML: any;

  constructor(
    private eventoService: EventoService,
    private queryService: QueryService,
    private ingressosService: IngressosService,
  ) { }

  ngOnInit() {
    this.eventoAsync = this.eventoService.getAll();
    this.catID$.next('');
    this.eventoIdAsync = this.queryService.eventoIdAsync(this.catID$);
  }

  resolver(event) {
    this.eventoResolver = event ? event[0] : null;
  }

  resolveData(time: Date) {
    return  ('0' + time.getDate()).slice(-2) + '/'
    + ('0' + (time.getMonth() + 1)).slice(-2) + '/'
    + time.getFullYear() + '-'
    + ('0' + time.getHours()).slice(-2) + ':'
    + ('0' + time.getMinutes()).slice(-2) + ':'
    + ('0' + time.getSeconds()).slice(-2);
  }

  submit(formValue: any) {
    const newDate = this.resolveData(new Date());
    this.ingressosService.addData({ ...formValue, data: newDate });
    alert('Ingressos gerados com sucesso!');
    this.form['formIngressos'].reset();
  }

}


