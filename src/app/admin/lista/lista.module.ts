import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ListaComponent } from './lista.component';

@NgModule({
  declarations: [
    ListaComponent,
  ],
  imports: [
    BrowserModule,
  ],
  exports: [
    ListaComponent,
  ],
  entryComponents: [
    ListaComponent,
  ],
})

export class ListaModule { }
