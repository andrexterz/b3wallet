import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms'

import { AppComponent } from './app.component';
import { AcaoComponent } from './acao/acao.component';
import { TipoOperacaoComponent } from './operacao/tipo-operacao.component';
import {AcaoService } from './acao/acao.service';
import {OperacaoService } from './operacao/tipo-operacao.service';
import { OperacaoComponent } from './operacao/operacao.component';

@NgModule({
  declarations: [
    AppComponent,
    AcaoComponent,
    TipoOperacaoComponent,
    OperacaoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'acoes', component: AcaoComponent},
      {path: 'portfolio', component: TipoOperacaoComponent}
    ])
  ],
  providers: [AcaoService, OperacaoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
