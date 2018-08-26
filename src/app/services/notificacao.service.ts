import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class NotificacaoService {
  constructor(private notific: MatSnackBar) {}

  showSnackbar(msg: any, action: any, duracao: any) {
    this.notific.open(msg, action, {
      duration: duracao,
    });
  }
}
