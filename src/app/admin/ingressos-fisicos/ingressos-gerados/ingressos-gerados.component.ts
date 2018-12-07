import { Component, OnInit } from '@angular/core';
import { IngressosService } from '../../../services/ingressos.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngx-ingressos-gerados',
  templateUrl: 'ingressos-gerados.component.html',
})

export class IngressosGeradosComponent implements OnInit {
  ingressosAsync: Observable<any>;
  resolvedIngressoGerados: any;

  constructor(
    private ingressosService: IngressosService,
  ) { }

  ngOnInit() {
    this.ingressosAsync = this.ingressosService.getAllIngressosFisiscos();
  }

  resolver(event) {
    this.resolvedIngressoGerados = event;
  }

}

