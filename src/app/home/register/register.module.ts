import { AuthService } from './../../services/auth.service';
import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme-home/theme.module';
import {RegisterComponent} from '../register/register.component';
import { RegisterRoutingModule } from './register-routing.module';
import { UsuarioService } from '../../services/usuario.service';


const REGISTER_COMPONENTS = [RegisterComponent];

@NgModule({
  imports: [RegisterRoutingModule, ThemeModule],
  declarations: [...REGISTER_COMPONENTS],
  providers: [UsuarioService, AuthService],
})
export class RegisterModule {}
