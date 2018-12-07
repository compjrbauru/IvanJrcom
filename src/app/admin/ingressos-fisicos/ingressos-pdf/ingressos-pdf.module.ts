import { ThemeModule } from './../../../@theme-admin/theme.module';
import { NgModule } from '@angular/core';
import { IngressosPdfComponent } from './ingressos-pdf.component';
import { QRCodeModule } from 'angularx-qrcode';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
    imports: [
      ThemeModule,
      QRCodeModule,
      PipesModule,
    ],
    declarations: [IngressosPdfComponent],
    exports: [IngressosPdfComponent],
  })
  export class IngressosPdfModule {}
