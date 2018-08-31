import { NgModule } from '@angular/core';

import { CreateCategoriaComponent } from './create-categoria.component';
import { ThemeModule } from '../../../../@theme-admin/theme.module';


const CREATECATEGORIA_COMPONENTS = [CreateCategoriaComponent];

@NgModule({
  imports: [ThemeModule],
  declarations: [...CREATECATEGORIA_COMPONENTS],
  exports: [...CREATECATEGORIA_COMPONENTS],
})
export class CreateCategoriaModule {}
