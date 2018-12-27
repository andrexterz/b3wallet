import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import {APP_BASE_HREF} from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import { AppComponent } from './app.component';
import { AcaoComponent } from './acao/acao.component';
import {AcaoService } from './acao/acao.service';
import {OperacaoService } from './operacao/operacao.service';
import { OperacaoComponent } from './operacao/operacao.component';
import { AnaliseComponent } from './analise/analise.component';

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
    MomentModule,
    RouterModule.forRoot([
      {path: 'dashboard', component: AcaoComponent},
      {path: 'portfolio', component: OperacaoComponent},
      {path: 'analise', component: AnaliseComponent},
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
    ])
  ],
  providers: [AcaoService, OperacaoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
