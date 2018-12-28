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
    index: number = null;
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
        this.index = null;
    }

    editAnalise(analise: Analise, index: number): void {
      this.selectedAnalise = analise;
      this.index = index;
    }

    saveAnalise(): void {
      let analise: Analise = Object.assign(new Analise(), this.selectedAnalise);
      this.analiseService.saveAnalise(analise).subscribe(obj => {
        let savedObj: Analise = Object.assign(new Analise(), obj);
        if (this.index !== null) {
          this.analises[this.index] = savedObj;
        } else {
          this.analises.push(savedObj);
        }
      });
      this.close();
    }

    deleteAnalise(analise: Analise, index: number): void {
      console.log("implement to delete -> ", analise, " at ", index);
    }

    close(): void {
        this.selectedAnalise = null;
     }

    //compare method for directive compareWith
    byAcao(itemA: any, itemB: any): boolean {
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
