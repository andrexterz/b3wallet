import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Analise } from './analise';
import { Acao } from '../acao/acao';
import { AcaoService } from '../acao/acao.service';
import { AnaliseService } from './analise.service';
import { MensagemService } from '../mensagem/mensagem.service';

@Component({
  selector: 'analise-component',
  templateUrl: './analise.component.html'
})
export class AnaliseComponent implements OnInit {
    acoes: Acao[] = [];
    analises: Analise[] = [];
    selectedAnalise: Analise = null;
    selectedListItem: Set<number> = new Set();

    constructor(
      private route: ActivatedRoute,
      private location: Location,
      private analiseService: AnaliseService,
      private acaoService: AcaoService,
      private mensagemService: MensagemService
    ) {}

    ngOnInit(): void {
      this.acaoService.getAcoes().subscribe(acoes => this.acoes = acoes.map(acao => Object.assign(new Acao(), acao)));
      this.analiseService.getAnalises().subscribe(response => this.analises = response.body.map(analise => Object.assign(new Analise(), analise)));
    }

    listAnalises(): Object {
      let obj: Object = new Object();
      this.analises.forEach(analise => {
        if (obj.hasOwnProperty(analise.acao.codigo)) {
          obj[analise.acao.codigo].push(analise);
        } else {
            obj[analise.acao.codigo] = [analise];
        }
      });
      return obj;
    }

    addAnalise(): void {
        this.selectedAnalise = new Analise();
    }

    edit(analise: Analise): void {
      this.selectedAnalise = Object.assign(new Analise(), analise);
    }

    save(): void {
      if (this.selectedAnalise) {
        this.analiseService.saveAnalise(this.selectedAnalise).subscribe(response => {
          let savedObj: Analise = Object.assign(new Analise(), response.body);
          let index  = this.analises.findIndex(o => o.id == savedObj.id);
          if (index >= 0) {
            this.analises[index] = savedObj;
          } else {
            this.analises.push(savedObj);
          }
          this.mensagemService.showMessage(savedObj.acao.codigo, "anotação salva com sucesso", "success");
        }, error => {
          this.mensagemService.showMessage("Erro ao salvar anotação", error.message, "error");
          console.log(error);
        });
      }
      this.close();
    }

    delete(analise: Analise): void {
      let confirmDelete = confirm("Remover análise " + analise.acao.codigo + ": " + (analise.anotacao.length <= 10 ? analise.anotacao: analise.anotacao.slice(0, 10).trim()) + "...?");
      if (confirmDelete) {
        let index = this.analises.findIndex(o => o.id == analise.id);
        this.analiseService.deleteAnalise(analise).subscribe(res => {

          if (res) {
            this.analises.splice(index, 1);
            //todo: add modal info or error
          }
        });
      }
    }

    close(): void {
        this.selectedAnalise = null;
     }

    //compare method for directive compareWith
    comparator(itemA: any, itemB: any): boolean {
        try {
            return itemA.id == itemB.id;
        } catch (e) {
            return false;
        }
    }

    expandListItem(index: number): void {
      if (this.selectedListItem.has(index)) {
        this.selectedListItem.delete(index);
      } else {
        this.selectedListItem.add(index);
      }
    }

    isExpanded(index: number):boolean {
      return this.selectedListItem.has(index);
    }
}
