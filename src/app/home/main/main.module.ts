import { ShowEventoModule } from './../../@core/components/show-evento/show-evento.module';
import { ThemeModule } from './../../@theme/theme.module';
import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { EventoService } from '../../services/evento.service';

const MAIN_COMPONENTS = [MainComponent];

@NgModule({
    imports: [ThemeModule, ShowEventoModule],
    declarations: [...MAIN_COMPONENTS],
    providers: [EventoService],
})

export class MainModule {}
