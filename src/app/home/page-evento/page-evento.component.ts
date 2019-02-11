import { UsuarioService } from './../../services/usuario.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EventoService } from '../../services/evento.service';

@Component({
  selector: 'ngx-page-evento',
  templateUrl: './page-evento.component.html',
  styleUrls: ['./page-evento.component.scss'],
})
export class PageEventoComponent implements OnInit, OnDestroy {
  evento: any;
  id: number;
  sub: any;
  eventsub: any;
  qty: {
    feminino: number,
    masculino: number,
    unisex: number,
  };
  qtyTotal: number = 0;
  preco: number = 0;

  minus(type: string) {
    if (this.qty[type] > 0) {
      this.preco -= +this.evento.ingressos[type].valor;
      this.qty[type]--;
      this.qtyTotal--;
    }
  }

  plus(type: string) {
    this.qty[type]++;
    this.qtyTotal++;
    this.preco += +this.evento.ingressos[type].valor;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventoService: EventoService,
    private usuarioService: UsuarioService,
  ) { }

  ngOnInit() {
    this.qty = {
      feminino: 0,
      masculino: 0,
      unisex: 0,
    };
    this.preco = 0;
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.eventsub = this.eventoService.getID(this.id).subscribe(response => {
        this.evento = response[0];
      });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.eventsub.unsubscribe();
  }

  comprar(): void {
    const compra: any = {
      ingressos: this.qty,
      valorTotal: this.preco,
      evento: this.evento,
      ingressosTotal: this.qtyTotal,
    };
    this.usuarioService.setItemCompra(compra).subscribe(() => {
      this.router.navigate([`/home/evento/${this.evento.id}/comprar`]);
    });
  }

}
