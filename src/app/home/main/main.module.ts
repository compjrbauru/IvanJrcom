import { NgModule } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';

import { ShowEventoModule } from './../../@core/components/show-evento/show-evento.module';
import { ThemeModule } from './../../@theme/theme.module';
import { MainComponent } from './main.component';

const MAIN_COMPONENTS = [MainComponent];

@NgModule({
  imports: [ThemeModule, ShowEventoModule, QRCodeModule],
  declarations: [...MAIN_COMPONENTS]
})
export class MainModule {}
