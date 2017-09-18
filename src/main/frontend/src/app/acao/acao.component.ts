import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/map';
import { AcaoService } from './acao.service';
import { Acao } from "./acao";

@Component({
  selector: 'acao-component',
  templateUrl: './acao.component.html'
})
export class AcaoComponent implements OnInit {

    index: number = null;
    selectedAcao: Acao = null;
    acoes: Acao[] = [];


    constructor(private acaoService: AcaoService,
      private route: ActivatedRoute,
      private location: Location) {
      }

    ngOnInit(): void {
        this.acaoService.getAcoes().subscribe(acoes => this.acoes = acoes.map(acao => Object.assign(new Acao(), acao)));
    }


    editAcao(acao: Acao, index: number): void {
         this.selectedAcao = Object.assign({}, acao);
         this.index = index;
    }

    saveAcao(): void {
        if (this.selectedAcao) {
            this.acoes[this.index] = Object.assign(new Acao(), this.selectedAcao);
        }

        this.close();
    }

    close(): void {
      this.selectedAcao = null;
    }
}
