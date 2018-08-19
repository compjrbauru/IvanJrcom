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
    fem: number,
    masc: number,
    uni: number,
  };

  minus(type: string) {
    if (type === 'fem')
      this.qty.fem--;
    else if (type === 'masc')
      this.qty.masc--;
    else if (type === 'uni')
      this.qty.uni--;
  }

  plus(type: any) {
    if (type === 'fem')
      this.qty.fem++;
    else if (type === 'masc')
      this.qty.masc++;
    else if (type === 'uni')
      this.qty.uni++;
  }

  constructor(private route: ActivatedRoute, private eventoService: EventoService) { }

  ngOnInit() {
    this.qty = {
      fem: 0,
      masc: 0,
      uni: 0,
    }
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
