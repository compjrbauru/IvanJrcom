import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';

import { ShowEventoModule } from '../show-evento/show-evento.module';
import { ThemeModule } from './../../../@theme-home/theme.module';
import { SearchBarComponent } from './search-bar.component';

const SEARCHBAR_COMPONENTS = [SearchBarComponent];

@NgModule({
  imports: [ThemeModule, CommonModule, ShowEventoModule, NgxSpinnerModule],
  declarations: [SEARCHBAR_COMPONENTS],
  exports: [SEARCHBAR_COMPONENTS],
})
export class SearchBarModule {}
