import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme-home/theme.module';
import {RegisterComponent} from '../register/register.component';
import { RegisterRoutingModule } from './register-routing.module';


const REGISTER_COMPONENTS = [RegisterComponent];

@NgModule({
  imports: [RegisterRoutingModule, ThemeModule],
  declarations: [...REGISTER_COMPONENTS],
})
export class RegisterModule {}
