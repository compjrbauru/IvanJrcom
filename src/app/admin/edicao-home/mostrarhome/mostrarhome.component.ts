import { EventoService } from './../../../services/evento.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificacaoService } from '../../../services/notificacao.service';

@Component({
  selector: 'ngx-mostrarhome',
  templateUrl: './mostrarhome.component.html',
  styleUrls: ['./mostrarhome.component.scss'],
})
export class MostrarhomeComponent implements OnInit {
  eventos: Observable<any>;

  constructor(
    private eventoService: EventoService,
    private notificao: NotificacaoService,
  ) { }

  ngOnInit() {
    this.eventos = this.eventoService.getAll();
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
