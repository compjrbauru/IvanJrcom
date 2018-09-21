import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThemeModule } from './../../../@theme-home/theme.module';
import { FormCategoriaComponent } from './form-categoria.component';

@NgModule({
    imports: [ThemeModule, CommonModule],
    declarations: [FormCategoriaComponent],
    exports: [FormCategoriaComponent],
})
export class FormCategoriaModule { }
