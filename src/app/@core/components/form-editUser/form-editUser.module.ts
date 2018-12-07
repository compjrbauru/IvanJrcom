import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThemeModule } from '../../../@theme/theme.module';
import { FormEditUserComponent } from './form-editUser.component';




const EDITUSER_COMPONENTS = [FormEditUserComponent];

@NgModule({
    imports: [ThemeModule, CommonModule],
    declarations: [...EDITUSER_COMPONENTS],
    exports: [...EDITUSER_COMPONENTS],
    providers: [],
})
export class FormEditUserModule { }
