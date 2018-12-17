import { CartaoComponent } from './cartao/cartao.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [CartaoComponent],
  exports: [CartaoComponent],
})
export class MercadoPagoModule { }
