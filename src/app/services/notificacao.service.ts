import 'style-loader!angular2-toaster/toaster.css';

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class NotificacaoService {
  constructor(private notific: MatSnackBar, private toastr: ToastrService) {}

  /* ngx toast */
  ngxtoaster(titulo: string, msg: string, sucesso: boolean) {
    sucesso ? this.toastr.success(msg, titulo) : this.toastr.error(msg, titulo);
  }

  /* Angular material */
  showSnackbar(msg: any, action: any, duracao: any) {
    this.notific.open(msg, action, {
      duration: duracao,
    });
  }
}
