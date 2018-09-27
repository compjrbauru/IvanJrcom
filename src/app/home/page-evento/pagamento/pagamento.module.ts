import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PagamentoComponent } from './pagamento.component';
import { ThemeModule } from '../../../@theme-home/theme.module';
import { PagamentoRoutingModule } from './pagamento-routing.module';
import { StripeModule } from './stripe/stripe.module';

const PAGAMENTO_IMPORTS = [CommonModule, PagamentoRoutingModule, ThemeModule, StripeModule];

@NgModule({
  imports: [...PAGAMENTO_IMPORTS],
  declarations: [PagamentoComponent],
})
export class PagamentoModule { }
