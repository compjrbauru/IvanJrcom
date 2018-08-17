import { ThemeModule } from './../../@theme-home/theme.module';
import { PageEventoRoutingModule } from './page-evento-routing.module';
import { EventoService } from '../../services/evento.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageEventoComponent } from './page-evento.component';

@NgModule({
  imports: [CommonModule, PageEventoRoutingModule, ThemeModule],
  declarations: [PageEventoComponent],
  providers: [EventoService],
})
export class PageEventoModule { }
