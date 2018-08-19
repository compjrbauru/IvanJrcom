import { NgModule } from '@angular/core';

import { ShowEventoModule } from '../../@core/components/show-evento/show-evento.module';
import { ThemeModule } from '../../@theme/theme.module';
import { CarouselLocalModule } from './carousel/carousel-local.module';
import { MainComponent } from './main.component';
import { EventoService } from '../../services/evento.service';
import { InvitePageModule } from '../../@core/components/invite-page/invite-page.module';

const MAIN_COMPONENTS = [MainComponent];

@NgModule({
  imports: [ThemeModule, ShowEventoModule, InvitePageModule, CarouselLocalModule],
  declarations: [...MAIN_COMPONENTS],
  providers: [EventoService],
})
export class MainModule {}
