import { NgModule } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';

import { ThemeModule } from '../../../@theme/theme.module';
import { CarouselLocalComponent } from './carousel-local.component';

const MAIN_COMPONENTS = [CarouselLocalComponent];

@NgModule({
    imports: [ThemeModule, CarouselModule],
    declarations: [...MAIN_COMPONENTS],
    exports: [...MAIN_COMPONENTS],
})

export class CarouselLocalModule {}
