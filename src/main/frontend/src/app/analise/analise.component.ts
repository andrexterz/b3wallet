import { Component, OnInit } from '@angular/core';
import { Analise } from './analise';
import { Acao } from '../acao/acao';

@Component({
  selector: 'analise-component',
  templateUrl: './analise.component.html',
  styleUrls: ['./analise.component.css']
})
export class AnaliseComponent implements OnInit {
    acao: Acao = null;
    selectedAnalise: Analise = null;
    index: number = null;
  
    constructor() { }

    ngOnInit(): void {
    }
  
    addAnalise(): void {
        this.selectedAnalise = new Analise();
        this.index = null;
    }
  
    close(): void {
        this.selectedAnalise = null;
     }
 
    //compare method for directive compareWith
    byAcao(itemA: any, itemB: any) {
        try {
            return itemA.id == itemB.id;
        } catch (e) {
            return false;
        }
    } 
}
