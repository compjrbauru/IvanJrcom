import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThemeModule } from '../../../../@theme-home/theme.module';
import { DepositoConfirmationComponent } from './deposito-confirmation.component';




@NgModule({
    imports: [CommonModule, ThemeModule],
    exports: [DepositoConfirmationComponent],
    declarations: [DepositoConfirmationComponent],
})
export class DepositoConfirmationModule { }
