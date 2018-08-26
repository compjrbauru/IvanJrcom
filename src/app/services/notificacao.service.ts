import 'style-loader!angular2-toaster/toaster.css';

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class NotificacaoService {
  constructor(
    private notific: MatSnackBar,
    private toasterService: ToasterService,
    private toastr: ToastrService,
  ) {}

  config: ToasterConfig;

  /* ngx toast */
  ngxtoaster(titulo: string, msg: string, sucesso: boolean) {
    sucesso ? this.toastr.success(titulo, msg) : this.toastr.error(titulo, msg);
  }

  /* Angular material */
  showSnackbar(msg: any, action: any, duracao: any) {
    this.notific.open(msg, action, {
      duration: duracao,
    });
  }
}
