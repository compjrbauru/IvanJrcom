import { Subject } from 'rxjs/Subject';
import { EventoService } from './../../../services/evento.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { QueryService } from '../../../services/query.service';
import { NotificacaoService } from '../../../services/notificacao.service';

@Component({
  selector: 'ngx-mostrarhome',
  templateUrl: './mostrarhome.component.html',
  styleUrls: ['./mostrarhome.component.scss'],
})
export class MostrarhomeComponent implements OnInit {
  eventos: Observable<any>;
  catID$ = new Subject<string>();
  eventoIdAsync: Observable<any>;

  constructor(
    private eventoService: EventoService,
    private queryService: QueryService,
    private notificao: NotificacaoService,
  ) { }

  ngOnInit() {
    this.eventos = this.eventoService.getAll();
    this.catID$.next('');
    this.eventoIdAsync = this.queryService.eventoIdAsync(this.catID$);
  }

  editmostrarhome(data) {
    const evento = data.eventData;
    const mostraHome = data.event.newData.mostraHome;
    evento.mostraHome = mostraHome;
    this.eventoService.patchData(evento, evento.id).then(ok => {
      this.notificao.ngxtoaster('Mostra Home', 'Alteracao feita com sucesso!', true);
    }).catch(fail => {
      this.notificao.ngxtoaster('Mostra Home', 'Alteração falhou!', false);
    });
  }
}
