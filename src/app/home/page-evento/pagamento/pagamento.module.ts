import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxCaptchaModule } from 'ngx-captcha';

import { ThemeModule } from '../../../@theme-home/theme.module';
import { DepositoConfirmationModule } from './deposito-confirmation/deposito-confirmation.module';
import { PagamentoRoutingModule } from './pagamento-routing.module';
import { PagamentoComponent } from './pagamento.component';
import { StripeModule } from './stripe/stripe.module';

const PAGAMENTO_IMPORTS = [
  CommonModule,
  PagamentoRoutingModule,
  ThemeModule,
  StripeModule,
  DepositoConfirmationModule,
  NgxCaptchaModule,
];

@NgModule({
  imports: [...PAGAMENTO_IMPORTS],
  declarations: [PagamentoComponent],
})
export class PagamentoModule { }
