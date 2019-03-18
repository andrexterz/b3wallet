import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { APP_BASE_HREF, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {NgxMaskModule} from 'ngx-mask';
import { AppComponent } from './app.component';

import {
  PapelComponent,
  EmpresaComponent,
  OperacaoComponent,
  NotaCorretagemComponent,
  ProventoComponent,
  NotaComponent,
  LoginComponent,
  MensagemComponent,
  OptionButtonComponent
} from './components';

import {
  PapelService,
  EmpresaService,
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
    PapelComponent,
    OperacaoComponent,
    NotaCorretagemComponent,
    ProventoComponent,
    NotaComponent,
    LoginComponent,
    MensagemComponent,
    OptionButtonComponent,
    EmpresaComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
     NgxMaskModule.forRoot({}),
    RouterModule.forRoot([
      {path: 'dashboard', component: PapelComponent},
      {path:  'papeis', component: PapelComponent},
      {path: 'empresas', component: EmpresaComponent},
      {path: 'operacoes', component: OperacaoComponent},
      {path: 'proventos', component: ProventoComponent},
      {path: 'notas', component: NotaComponent},
      {path: 'login', component: LoginComponent},
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
    ])
  ],
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'},
              {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
              LoginService, EmpresaService, PapelService, OperacaoService, ProventoService, NotaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
