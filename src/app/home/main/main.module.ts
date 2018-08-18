import { NgModule } from '@angular/core';

import { ShowEventoModule } from '../../@core/components/show-evento/show-evento.module';
import { ThemeModule } from '../../@theme/theme.module';
import { CarouselLocalModule } from './carousel/carousel-local.module';
import { MainComponent } from './main.component';

const MAIN_COMPONENTS = [MainComponent];

@NgModule({
    imports: [ThemeModule, ShowEventoModule, CarouselLocalModule],
    declarations: [...MAIN_COMPONENTS],
})
export class MainModule {}
