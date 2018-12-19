import { FormControl, Validators } from '@angular/forms';
import { NotificacaoService } from '../../services/notificacao.service';
import { AuthService } from '../../services/auth.service';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'ngx-reset-pass',
  template: `
    <div class="modal-header">
      <span> Resetar Senha </span>
      <button class="close" aria-label="Close" (click)="closeDialog()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
        <label for="email">E-mail</label>
        <input [formControl]= "email" id="email" type="email" required
         placeholder="E-mail" class="form-control"/>
    </div>
    <div class="modal-footer">
        <button class="btn btn-md btn-primary" [disabled]="!email.valid" (click)="resetPass(email)">Resetar Senha</button>
    </div>
  `,
  providers: [NotificacaoService],
})
export class ResetPassComponent {
  email: FormControl;

  constructor(
    public dialogRef: MatDialogRef<any>,
    private authService: AuthService,
    private notificacao: NotificacaoService,
  ) {
    this.email = new FormControl('', Validators.email);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  resetPass() {
    this.authService.resetPassword(this.email.value).then(res => {
      if (res === 'success') {
        this.notificacao.ngxtoaster('Resetar Senha', 'Instrucoes enviadas para o Email!', true);
      } else if (res === 'auth/user-not-found') {
        this.notificacao.ngxtoaster('Resetar Senha', 'Usuario nao encontrado!', false);
      } else if (res === 'auth/invalid-email') {
        this.notificacao.ngxtoaster('Resetar Senha', 'Email Invalido!', false);
      } else {
        this.notificacao.ngxtoaster('Resetar Senha', res, false);
      }
    });
    this.closeDialog();
  }
}
