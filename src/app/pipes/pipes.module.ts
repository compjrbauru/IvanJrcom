import { DocToNomePipe } from './docToNome.pipe';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';

@NgModule({
  imports: [],
  declarations: [
    DocToNomePipe,
  ],
  exports: [
    DocToNomePipe,
  ],
  providers: [
    DatePipe,
  ],
})
export class PipesModule {
  static forRoot() {
    return {
      ngModule: PipesModule,
      providers: [],
    };
  }
}
