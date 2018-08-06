import { ThemeModule } from './../../@theme/theme.module';
import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';

const MAIN_COMPONENTS = [MainComponent];

@NgModule({
    imports: [ThemeModule],
    declarations: [...MAIN_COMPONENTS],
})

export class MainModule {}
