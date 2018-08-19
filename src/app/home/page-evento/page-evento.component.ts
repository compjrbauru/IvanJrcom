import { EventoService } from '../../services/evento.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-page-evento',
  templateUrl: './page-evento.component.html',
  styleUrls: ['./page-evento.component.scss'],
})
export class PageEventoComponent implements OnInit, OnDestroy {
  evento: any;
  id: number;
  private sub: any;
  private eventsub: any;
  private qty: {
    feminino: number,
    masculino: number,
    unisex: number,
  };
  private preco: any;

  minus(type: string) {
    if (this.qty[type] > 0) {
      this.preco -= +this.evento.ingressos[type].valor;
      this.qty[type]--;
    }
  }

  plus(type: string) {
    this.qty[type]++;
    this.preco += +this.evento.ingressos[type].valor;
  }

  constructor(private route: ActivatedRoute, private eventoService: EventoService) { }

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

}
