import { ThemeModule } from './../../../@theme-admin/theme.module';
import { NgModule } from '@angular/core';
import { IngressosPdfComponent } from './ingressos-pdf.component';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
    imports: [ThemeModule, QRCodeModule],
    declarations: [IngressosPdfComponent],
    exports: [IngressosPdfComponent],
  })
  export class IngressosPdfModule {}
