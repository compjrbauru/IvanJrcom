import { LocalStorage } from '@ngx-pwa/local-storage';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngx-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss'],
})
export class PagamentoComponent implements OnInit {
  compraAsync: Observable<any>;

  constructor(
    private localStorage: LocalStorage,
  ) { }

  ngOnInit() {
    this.compraAsync = this.localStorage.getItem('compra');
  }

}
