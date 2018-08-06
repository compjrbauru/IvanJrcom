import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ThemeModule } from '../@theme-home/theme.module';
import { MainModule} from './main/main.module';
import { RegisterComponent } from './register/register.component';

const HOME_COMPONENTS = [HomeComponent];

@NgModule({
  imports: [HomeRoutingModule, ThemeModule, MainModule],
  declarations: [...HOME_COMPONENTS],
})
export class HomeModule {}
