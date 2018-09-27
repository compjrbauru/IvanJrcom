import { LocalStorage } from '@ngx-pwa/local-storage';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'ngx-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss'],
})
export class PagamentoComponent implements OnInit, OnDestroy {
  compra: any;

  constructor(
    private localStorage: LocalStorage,
  ) { }

  ngOnInit() {
    this.localStorage.getItem('compra').subscribe(response => {
      this.compra = response;
      this.localStorage.clear();
    });
  }

  ngOnDestroy() {
     this.localStorage.clear();
  }

}
