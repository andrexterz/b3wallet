import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';
import { AcaoComponent } from './acao/acao.component';
import {AcaoService } from './acao/acao.service';
import {OperacaoService } from './operacao/operacao.service';
import { OperacaoComponent } from './operacao/operacao.component';
import { AnaliseComponent } from './analise/analise.component';
import { AnaliseService } from './analise/analise.service';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    AcaoComponent,
    OperacaoComponent,
    AnaliseComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'dashboard', component: AcaoComponent},
      {path: 'portfolio', component: OperacaoComponent},
      {path: 'analise', component: AnaliseComponent},
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
    ])
  ],
  providers: [{provide: LOCALE_ID, useValue: 'pt'}, AcaoService, OperacaoService, AnaliseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
