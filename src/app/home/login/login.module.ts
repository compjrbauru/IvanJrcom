import { NgModule } from '@angular/core';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ThemeModule } from '../../@theme-home/theme.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

const LOGIN_COMPONENTS = [LoginComponent];

@NgModule({
  imports: [LoginRoutingModule, ThemeModule, TooltipModule],
  declarations: [...LOGIN_COMPONENTS],
})
export class LoginModule {}
