import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

import { IngressosService } from '../../../services/ingressos.service';
import { CompraService } from './../../../services/compra.service';
import { RouterHelper } from '../../../@core/utils/helpers/router-helper';

@Component({
  selector: 'ngx-user-compra',
  templateUrl: 'user-compra.component.html',
  styleUrls: ['user-compra.component.scss'],
})
export class UserCompraComponent implements OnInit {
  ingressosAsync: Observable<any>[] = [];
  compraAsync: Observable<any>;
  userInfo: any;

  constructor(
    private route: ActivatedRoute,
    private ingressosService: IngressosService,
    private compraService: CompraService,
  ) {}

  ngOnInit() {
    this.userInfo = RouterHelper.getValues(this.route, 'userInfo');
    this.route.paramMap
      .pipe(
        switchMap(
          (params: ParamMap) =>
            (this.compraAsync = this.compraService
              .getCompraId(params.get('idCompra'))
              .pipe(
                map(compra => compra[0]),
                tap(
                  compra =>
                    (this.ingressosAsync = compra.idIngressos.map(
                      idIngresso =>
                        this.ingressosService
                          .getingresso(idIngresso)
                          .pipe(map(ingresso => ingresso[0])),
                    )),
                ),
              )),
        ),
        take(1),
      )
      .subscribe();
  }

  imagemupdate($event: any) {

  }
}
