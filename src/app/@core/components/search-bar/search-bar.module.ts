import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThemeModule } from './../../../@theme-home/theme.module';
import { SearchBarComponent } from './search-bar.component';

const SEARCHBAR_COMPONENTS = [SearchBarComponent];

@NgModule({
  imports: [ThemeModule, CommonModule],
  declarations: [SEARCHBAR_COMPONENTS],
  exports: [SEARCHBAR_COMPONENTS],
})
export class SearchBarModule {}
