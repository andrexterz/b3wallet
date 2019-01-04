import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';
import { AcaoComponent } from './acao/acao.component';
import {AcaoService } from './acao/acao.service';
import {OperacaoService } from './operacao/operacao.service';
import { OperacaoComponent } from './operacao/operacao.component';
import { AnaliseComponent } from './analise/analise.component';
import { AnaliseService } from './analise/analise.service';

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
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'dashboard', component: AcaoComponent},
      {path: 'portfolio', component: OperacaoComponent},
      {path: 'analise', component: AnaliseComponent},
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
    ])
  ],
  providers: [AcaoService, OperacaoService, AnaliseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
