import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InvitePageModule } from '../../@core/components/invite-page/invite-page.module';
import { SearchBarModule } from '../../@core/components/search-bar/search-bar.module';
import { ShowEventoModule } from '../../@core/components/show-evento/show-evento.module';
import { ThemeModule } from '../../@theme/theme.module';
import { EventoService } from '../../services/evento.service';
import { ShowEvento2Module } from './../../@core/components/show-evento2/show-evento2.module';
import { CarouselLocalModule } from './carousel/carousel-local.module';
import { CategoriasDestaquModule } from './categorias-destaque/categorias-destaque.module';
import { MainComponent } from './main.component';
import { SobreNosModule } from './sobre-nos/sobre-nos.module';

const MAIN_COMPONENTS = [MainComponent];
const MAIN_MODULES = [
  ShowEventoModule,
  InvitePageModule,
  CarouselLocalModule,
  SearchBarModule,
  ShowEvento2Module,
  RouterModule,
  SobreNosModule,
  CategoriasDestaquModule,
];

@NgModule({
  imports: [ThemeModule, ...MAIN_MODULES],
  declarations: [...MAIN_COMPONENTS],
  providers: [EventoService],
})
export class MainModule { }
