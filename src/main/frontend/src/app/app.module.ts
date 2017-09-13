import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms'

import { AppComponent } from './app.component';
import { AcaoComponent } from './acao.component';
import { TipoOperacaoComponent } from './tipo-operacao.component';
import { DashboardComponent } from './dashboard.component';
import {AcaoService } from './acao.service';
import {OperacaoService } from './tipo-operacao.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AcaoComponent,
    TipoOperacaoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'acao/edit/:id', component: AcaoComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'portfolio', component: TipoOperacaoComponent},
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
    ])
  ],
  providers: [AcaoService, OperacaoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
