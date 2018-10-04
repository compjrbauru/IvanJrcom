import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme-home/theme.module';
import { RegisterComponent } from '../register/register.component';
import { FormRegistroModule } from './../../@core/components/form-registro/form-registro.module';
import { RegisterRoutingModule } from './register-routing.module';


const REGISTER_COMPONENTS = [RegisterComponent];

@NgModule({
  imports: [RegisterRoutingModule, ThemeModule, CommonModule, FormRegistroModule],
  declarations: [...REGISTER_COMPONENTS],
  providers: [],
})
export class RegisterModule { }
