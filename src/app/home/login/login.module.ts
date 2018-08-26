import { NgModule } from '@angular/core';
import { ToasterModule } from 'angular2-toaster';

import { ThemeModule } from '../../@theme-home/theme.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

const LOGIN_COMPONENTS = [LoginComponent];

@NgModule({
  imports: [LoginRoutingModule, ThemeModule, ToasterModule.forRoot()],
  declarations: [...LOGIN_COMPONENTS],
})
export class LoginModule {}
