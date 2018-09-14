import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PagamentoComponent } from './pagamento.component';
import { ThemeModule } from '../../../@theme-home/theme.module';
import { PagamentoRoutingModule } from './pagamento-routing.module';


@NgModule({
  imports: [CommonModule, PagamentoRoutingModule, ThemeModule],
  declarations: [PagamentoComponent],
})
export class PagamentoModule { }
