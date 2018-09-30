import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThemeModule } from './../../../@theme-home/theme.module';
import { FormDepositoComponent } from './form-deposito.component';

@NgModule({
    imports: [ThemeModule, CommonModule],
    declarations: [FormDepositoComponent],
    exports: [FormDepositoComponent],
})
export class FormDepositoModule { }
