import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material';

import { ThemeModule } from '../../@theme-home/theme.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ResetPassComponent } from './reset-pass.component';

const LOGIN_COMPONENTS = [LoginComponent, ResetPassComponent];

@NgModule({
  entryComponents: [ResetPassComponent],
  imports: [LoginRoutingModule, ThemeModule, MatDialogModule],
  declarations: [...LOGIN_COMPONENTS],
  providers: [],
})
export class LoginModule { }
