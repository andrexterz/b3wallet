import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { APP_BASE_HREF, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';
import { TokenInterceptor } from './tokenInterceptor';
import { AcaoComponent } from './acao/acao.component';
import { AcaoService } from './services/acao.service';
import { OperacaoService } from './services/operacao.service';
import { AnaliseService } from './services/analise.service';
import { LoginService } from './services/login.service';
import { OperacaoComponent } from './operacao/operacao.component';
import { DividendoComponent } from './dividendo/dividendo.component';
import { AnaliseComponent } from './analise/analise.component';
import { LoginComponent } from './login/login.component';
import { MensagemComponent } from './mensagem/mensagem.component';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    AcaoComponent,
    OperacaoComponent,
    DividendoComponent,
    AnaliseComponent,
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
      {path: 'dividendo', component: DividendoComponent},
      {path: 'analise', component: AnaliseComponent},
      {path: 'login', component: LoginComponent},
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
    ])
  ],
  providers: [{provide: LOCALE_ID, useValue: 'pt'},
              {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
              LoginService, AcaoService, OperacaoService, AnaliseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
