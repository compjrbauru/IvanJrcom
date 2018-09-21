import { NgModule } from '@angular/core';

import { ThemeModule } from '../../../@theme/theme.module';
import { FormRegistroComponent } from './form-registro.component';




const REGISTER_COMPONENTS = [FormRegistroComponent];

@NgModule({
    imports: [ThemeModule],
    declarations: [...REGISTER_COMPONENTS],
    exports: [...REGISTER_COMPONENTS],
    providers: [],
})
export class FormRegistroModule { }
