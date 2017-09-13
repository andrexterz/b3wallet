import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { AcaoService } from './acao.service';
import { Acao } from './acao';

@Component({
  selector: 'dashboard-component',
  templateUrl: './dashboard.component.html',
  providers: [AcaoService]
})
export class DashboardComponent implements OnInit {
  acoes: Acao[] = [];
  selectedAcao: Acao;
  isOperaocesOpened: boolean = false;

  constructor(private acaoService: AcaoService) {

  }

  ngOnInit(): void {
    this.acaoService.getAcoes().then(acoes => this.acoes = acoes);
  }


  onSelect(acao: Acao): void {
      this.selectedAcao = acao;
  }

  toggle() {
    this.isOperaocesOpened = !this.isOperaocesOpened;
  }

  add(): void {
    console.log("dashboard add op");
  }
}
