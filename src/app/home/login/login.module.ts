import { AuthService } from './../../services/auth.service';
import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme-home/theme.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

const LOGIN_COMPONENTS = [LoginComponent];

@NgModule({
  imports: [LoginRoutingModule, ThemeModule],
  declarations: [...LOGIN_COMPONENTS],
  providers: [AuthService],
})
export class LoginModule {}
