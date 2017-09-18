import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms'
import { AppComponent } from './app.component';
import { AcaoComponent } from './acao/acao.component';
import {AcaoService } from './acao/acao.service';
import {OperacaoService } from './operacao/operacao.service';
import { OperacaoComponent } from './operacao/operacao.component';

@NgModule({
  declarations: [
    AppComponent,
    AcaoComponent,
    OperacaoComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'dashboard', component: AcaoComponent},
      {path: 'portfolio', component: OperacaoComponent},
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
    ])
  ],
  providers: [AcaoService, OperacaoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
