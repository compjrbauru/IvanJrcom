import { NgModule } from '@angular/core';
import { ShowCategoriaRoutingModule } from './show-categoria-routing.module';
import { ShowCategoriaComponent } from './show-categoria.component';
import { ThemeModule } from '../../@theme/theme.module';



@NgModule({
    imports: [ThemeModule, ShowCategoriaRoutingModule],
    declarations: [ShowCategoriaComponent],
  })
  export class ShowCategoriaModule {}
