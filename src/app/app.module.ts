import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestore } from 'angularfire2/firestore';

import { config } from '../app/config/config';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { TableModule } from './admin/table/table.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriaService } from './services/categoria.service';
import { EventoService } from './services/evento.service';
import { NotificacaoService } from './services/notificacao.service';
import { QueryService } from './services/query.service';

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    HttpClientModule,
    AppRoutingModule,
    TableModule,
    AngularFireModule.initializeApp(config.fire),
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    QueryService,
    EventoService,
    AngularFirestore,
    CategoriaService,
    NotificacaoService,
  ],
})
export class AppModule {}
