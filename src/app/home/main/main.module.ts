import { NgModule } from '@angular/core';

import { InvitePageModule } from '../../@core/components/invite-page/invite-page.module';
import { SearchBarModule } from '../../@core/components/search-bar/search-bar.module';
import { ShowEventoModule } from '../../@core/components/show-evento/show-evento.module';
import { ThemeModule } from '../../@theme/theme.module';
import { EventoService } from '../../services/evento.service';
import { ShowEvento2Module } from './../../@core/components/show-evento2/show-evento2.module';
import { CarouselLocalModule } from './carousel/carousel-local.module';
import { MainComponent } from './main.component';
import { RouterModule } from '@angular/router';

const MAIN_COMPONENTS = [MainComponent];
const MAIN_MODULES = [
  ShowEventoModule,
  InvitePageModule,
  CarouselLocalModule,
  SearchBarModule,
  ShowEvento2Module,
  RouterModule,
];

@NgModule({
  imports: [ThemeModule, ...MAIN_MODULES],
  declarations: [...MAIN_COMPONENTS],
  providers: [EventoService],
})
export class MainModule {}
