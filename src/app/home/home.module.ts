import { ShowEventoModule } from './show-evento/show-evento.module';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ThemeModule } from '../@theme-home/theme.module';
import { MainModule} from './main/main.module';

const HOME_COMPONENTS = [HomeComponent];

@NgModule({
  imports: [HomeRoutingModule, ThemeModule, MainModule, ShowEventoModule],
  declarations: [...HOME_COMPONENTS],
})
export class HomeModule {}
