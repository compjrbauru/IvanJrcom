import 'style-loader!angular2-toaster/toaster.css';

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { BodyOutputType, Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

@Injectable()
export class NotificacaoService {
  constructor(
    private notific: MatSnackBar,
    private toasterService: ToasterService,
  ) {}

  config: ToasterConfig;

  /* Angular material */
  showSnackbar(msg: any, action: any, duracao: any) {
    this.notific.open(msg, action, {
      duration: duracao,
    });
  }

  /* Nebular
        tipo = ['default', 'info', 'success', 'warning', 'error'];
        tipoanimacao = ['fade', 'flyLeft', 'flyRight', 'slideDown', 'slideUp'];
        posicao = ['toast-top-full-width', 'toast-bottom-full-width', 'toast-top-left', 'toast-top-center',
    '   toast-top-right', 'toast-bottom-right', 'toast-bottom-center', 'toast-bottom-left', 'toast-center']; */
  showToast(
    config: ToasterConfig,
    tipo: string,
    titulo: string,
    msg: string,
    posicao: string,
    tipoanimacao: string,
    tempo: number,
    limite: number,
  ) {
    config = new ToasterConfig({
      positionClass: posicao,
      timeout: tempo,
      newestOnTop: true,
      tapToDismiss: true,
      preventDuplicates: true,
      animation: tipoanimacao,
      limit: limite,
    });
    const toast: Toast = {
      type: tipo,
      title: titulo,
      body: msg,
      timeout: tempo,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }
}
