import { NotificacaoService } from './../../../services/notificacao.service';
import { TableModule } from './../../table/table.module';
import { TableComponent } from './../../table/table.component';
import { EventoService } from './../../../services/evento.service';
import { ThemeModule } from './../../../@theme-home/theme.module';
import { NgModule } from '@angular/core';
import { MostrarhomeComponent } from './mostrarhome.component';
import { QueryService } from '../../../services/query.service';

@NgModule({
  imports: [ThemeModule, TableModule],
  declarations: [MostrarhomeComponent],
  providers: [EventoService, QueryService, NotificacaoService],
  exports: [MostrarhomeComponent],
})
export class MostrarhomeModule { }
