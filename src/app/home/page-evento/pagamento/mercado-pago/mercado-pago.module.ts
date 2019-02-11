import { BoletoComponent } from './boleto/boleto.component';
import { CartaoComponent } from './cartao/cartao.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    CartaoComponent,
    BoletoComponent,
  ],
  exports: [
    CartaoComponent,
    BoletoComponent,
  ],
})
export class MercadoPagoModule { }
