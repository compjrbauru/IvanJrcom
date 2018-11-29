import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';

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
    private localStorage: LocalStorage,
    private eventoservice: EventoService,
  ) { }

  ngOnInit() {
  }

  compraDeposito() {
    const compra = {
      userid: this.userInfo.id,
      ...this.compraInfo,
      compraVerificada: false,
    };
    this.localStorage.getItem('eventoCompra').subscribe(res => {
      res.ingressos.masculino.disponiveis = res.ingressos.masculino.disponiveis - this.compraInfo.masculino;
      res.ingressos.feminino.disponiveis = res.ingressos.feminino.disponiveis - this.compraInfo.feminino;
      res.ingressos.unisex.disponiveis = res.ingressos.unisex.disponiveis - this.compraInfo.unisex;
      this.eventoservice.patchData(res, res.id);
    });
    this.compraservice.addCompra(compra);
    this.notific.ngxtoaster(
      'Compra realizada com sucesso!',
      'Entre nas configurações de usuário para ver o estado de sua compra',
      true,
    );
    this.route.navigate(['/home']);
  }

}

    /*    this.eventoservice.getID(this.compraInfo.idevento).pipe(map(res => res = res[0])).subscribe((res: any) => {
         res.ingressos.masculino.disponiveis = res.ingressos.masculino.disponiveis - this.compraInfo.masculino;
         res.ingressos.feminino.disponiveis = res.ingressos.feminino.disponiveis - this.compraInfo.feminino;
         res.ingressos.unisex.disponiveis = res.ingressos.unisex.disponiveis - this.compraInfo.unisex;
         this.eventoservice.patchData(res, res.id);
       }); */
