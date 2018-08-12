import { NgModule } from '@angular/core';

import { CreateCategoriaComponent } from './create-categoria.component';

const CREATECATEGORIA_COMPONENTS = [CreateCategoriaComponent];

@NgModule({
  imports: [],
  declarations: [...CREATECATEGORIA_COMPONENTS],
  exports: [...CREATECATEGORIA_COMPONENTS],
})
export class CreateCategoriaModule {}
