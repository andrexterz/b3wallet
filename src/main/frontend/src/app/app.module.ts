import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { APP_BASE_HREF, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';

import {
  AcaoComponent,
  OperacaoComponent,
  ProventoComponent,
  NotaComponent,
  LoginComponent,
  MensagemComponent
} from './components';

import {
  AcaoService,
  OperacaoService,
  ProventoService,
  NotaService,
  LoginService,
  TokenInterceptor
} from './services';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent,
    AcaoComponent,
    OperacaoComponent,
    ProventoComponent,
    NotaComponent,
    LoginComponent,
    MensagemComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'dashboard', component: AcaoComponent},
      {path: 'portfolio', component: OperacaoComponent},
      {path: 'provento', component: ProventoComponent},
      {path: 'nota', component: NotaComponent},
      {path: 'login', component: LoginComponent},
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
    ])
  ],
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'},
              {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
              LoginService, AcaoService, OperacaoService, ProventoService, NotaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
