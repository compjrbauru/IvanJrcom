import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EdicaoSobreComponent } from './edicao-sobre.component';
import { ThemeModule } from '../../../@theme-admin/theme.module';
import { SobreService } from '../../../services/sobre.service';
import { NotificacaoService } from '../../../services/notificacao.service';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
  ],
  declarations: [EdicaoSobreComponent],
  exports: [EdicaoSobreComponent],
  providers: [SobreService, NotificacaoService],
})
export class EdicaoSobreModule { }
