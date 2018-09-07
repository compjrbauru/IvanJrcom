import { ThemeModule } from './../../../@theme-home/theme.module';
import { NgModule } from '@angular/core';
import { SobreNosComponent } from './sobre-nos.component';
import { SobreService } from '../../../services/sobre.service';

@NgModule({
  imports: [ThemeModule],
  declarations: [SobreNosComponent],
  providers: [SobreService],
  exports: [SobreNosComponent],
})
export class SobreNosModule { }
