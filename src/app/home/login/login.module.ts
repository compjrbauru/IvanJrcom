import { ResetPassComponent } from './reset-pass.component';
import { AuthService } from './../../services/auth.service';
import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme-home/theme.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { UsuarioService } from '../../services/usuario.service';
import { MatDialogModule } from '@angular/material';

const LOGIN_COMPONENTS = [LoginComponent, ResetPassComponent];

@NgModule({
  entryComponents: [ResetPassComponent],
  imports: [LoginRoutingModule, ThemeModule, MatDialogModule],
  declarations: [...LOGIN_COMPONENTS],
  providers: [UsuarioService],
})
export class LoginModule {}
