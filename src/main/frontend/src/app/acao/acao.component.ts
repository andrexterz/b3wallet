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

    selectedAcao: Acao = null;
    acoes: Acao[] = [];

    constructor(
      private acaoService: AcaoService,
      private route: ActivatedRoute,
      private location: Location) {
      }

    ngOnInit(): void {
        this.acaoService.getAcoes().subscribe(acoes => this.acoes = acoes.map(acao => Object.assign(new Acao(), acao)));
    }

    addAcao(): void {
        this.selectedAcao = new Acao();
    }

    editAcao(acao: Acao): void {
         this.selectedAcao = Object.assign({}, acao);
    }

    saveAcao(): void {
        if (this.selectedAcao) {
            this.acaoService.saveAcao(this.selectedAcao).subscribe(obj => {
                let savedObj: Acao = Object.assign(new Acao(), obj);
                let index = this.acoes.findIndex(o => o.id == savedObj.id);
                if (index >= 0) {
                    this.acoes[index] = savedObj;
                } else {
                    this.acoes.push(savedObj);
                }
            });

        }
        this.close();
    }

    close(): void {
      this.selectedAcao = null;
    }
}
