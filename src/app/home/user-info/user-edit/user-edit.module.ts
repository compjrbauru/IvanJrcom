import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThemeModule } from '../../../@theme-home/theme.module';
import { FormEditUserModule } from './../../../@core/components/form-editUser/form-editUser.module';
import { UserEditComponent } from './user-edit.component';
import { UserEditRoutingModule } from './user-edit.routing.module';


const USEREDIT_COMPONENTS = [UserEditComponent];

@NgModule({
    imports: [UserEditRoutingModule, ThemeModule, CommonModule, FormEditUserModule],
    declarations: [...USEREDIT_COMPONENTS],
    providers: [],
})
export class UserEditModule { }
