import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ShowEventoModule } from '../show-evento/show-evento.module';
import { ThemeModule } from './../../../@theme-home/theme.module';
import { SearchBarComponent } from './search-bar.component';

const SEARCHBAR_COMPONENTS = [SearchBarComponent];

@NgModule({
  imports: [ThemeModule, CommonModule, ShowEventoModule],
  declarations: [SEARCHBAR_COMPONENTS],
  exports: [SEARCHBAR_COMPONENTS],
})
export class SearchBarModule {}
