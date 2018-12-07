import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IngressosService } from '../../../../services/ingressos.service';
import { CompraService } from './../../../../services/compra.service';
import { EventoService } from './../../../../services/evento.service';
import { NotificacaoService } from './../../../../services/notificacao.service';

@Component({
  selector: 'ngx-deposito-confirmation',
  template:
    `
  <div>
  <button [disabled]="!valid" class="btn btn-hero-success btn-demo" (click)="compraDeposito()">Comprar</button>
  </div>
  `,
})
export class DepositoConfirmationComponent implements OnInit {
  @Input() valid: any;
  @Input() userInfo: any;
  @Input() compraInfo: any;

  constructor(
    private compraservice: CompraService,
    private notific: NotificacaoService,
    private route: Router,
    private eventoservice: EventoService,
    private ingressoService: IngressosService,
  ) { }

  ngOnInit() {
  }

  compraDeposito() {
    const { ingressos: ingressos, evento: evento, ingressosTotal: ingressosTotal, ...valorTotal } = this.compraInfo;
    const idIngressos = this.ingressoService.addIngressos(ingressos, evento);
    for (const tipoIngresso of Object.keys(ingressos)) {
      evento.ingressos[tipoIngresso].disponiveis = evento.ingressos[tipoIngresso].disponiveis - ingressos[tipoIngresso];
    }
    evento.ingressos.lote.disponiveis = evento.ingressos.lote.disponiveis - ingressosTotal;
    this.eventoservice.patchData(evento, evento.id);
    const compra = {
      userid: this.userInfo.id,
      idEvento: evento.id,
      nomeEvento: evento.nome,
      idIngressos: idIngressos,
      compraVerificada: false,
      tipo: 'desposito',
      ...valorTotal,
    };
    this.compraservice.addCompra(compra);
    this.notific.ngxtoaster(
      'Compra realizada com sucesso!',
      'Entre nas configurações de usuário para ver o estado de sua compra',
      true,
    );
    this.route.navigate(['/home']);
  }

}
