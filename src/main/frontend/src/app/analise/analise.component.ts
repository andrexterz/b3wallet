import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Analise } from './analise';
import { Acao } from '../acao/acao';
import { AcaoService } from '../acao/acao.service';
import { AnaliseService } from './analise.service';

@Component({
  selector: 'analise-component',
  templateUrl: './analise.component.html',
  styleUrls: ['./analise.component.css']
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
    ) {}

    ngOnInit(): void {
      this.acaoService.getAcoes().subscribe(acoes => this.acoes = acoes.map(acao => Object.assign(new Acao(), acao)));
      this.analiseService.getAnalises().subscribe(analises => this.analises = analises.map(analise => Object.assign(new Analise(), analise)));
    }

    listAnalises(): Object {
      let obj:Object = new Object();
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

    editAnalise(analise: Analise): void {
      this.selectedAnalise = Object.assign(new Analise(), analise);
    }

    saveAnalise(): void {
      if (this.selectedAnalise) {
        this.analiseService.saveAnalise(this.selectedAnalise).subscribe(obj => {
          let savedObj: Analise = Object.assign(new Analise(), obj);
          let index  = this.analises.findIndex(o => o.id == savedObj.id);
          if (index >= 0) {
            this.analises[index] = savedObj;
          } else {
            this.analises.push(savedObj);
          }
        });
      }
      this.close();
    }

    deleteAnalise(analise: Analise): void {
      let confirmDelete = confirm("Remover análise " + analise.acao.codigo + ": " + analise.anotacao.slice(10).trim() + "...?");
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
