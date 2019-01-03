import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { OperacaoService } from './operacao.service';
import { AcaoService } from '../acao/acao.service';
import { Operacao } from "./operacao";
import { Acao } from "../acao/acao";

@Component({
  selector: 'operacao-component',
  templateUrl: './operacao.component.html'
})
export class OperacaoComponent implements OnInit {
    operacoes: Operacao[] = [];
    custodia = {};
    acoes: Acao[] = [];
    precoTotalCompra :number = 0;
    precoTotalVenda: number = 0;
    selectedOperacao: Operacao = null;

    constructor(
      private operacaoService: OperacaoService,
      private acaoService: AcaoService,
      private route: ActivatedRoute,
      private location: Location
    ) {}

    ngOnInit(): void {
      window.addEventListener("KeyPress", e => {console.log(e)});
      this.acaoService.getAcoes().subscribe(acoes => this.acoes = acoes.map(acao => Object.assign(new Acao(), acao)));

      this.operacaoService.getOperacoes().subscribe(operacoes => {
        this.operacoes = operacoes;
        this.updateOperacoes();
       });
    }

    updateOperacoes(): void  {
        this.precoTotalCompra = 0;
        this.precoTotalVenda = 0;
        this.operacoes.forEach(op => {

          let total = op.totalOperacao;

          if (op.tipoOperacao == 'COMPRA') {
              this.precoTotalCompra += total;
          } else {
              this.precoTotalVenda += total;
          }
        });
    }

    getCustosOperacionais(): number {
      let totalCustos:number = 0;
      this.operacoes.forEach(op => {
        totalCustos += op.custoOperacao;
      });
      return totalCustos;
    }

    getTotalCustodia(): number {
        return this.precoTotalCompra - this.precoTotalVenda;
    }

    getPerformance(): number {
      return 0;
    }

    addOperacao(): void {
        this.selectedOperacao = new Operacao();
    }

    editOperacao(operacao: Operacao): void {
         this.selectedOperacao = Object.assign(new Operacao(), operacao);
    }

    saveOperacao(): void {
        if (this.selectedOperacao) {
            this.operacaoService.saveOperacao(this.selectedOperacao).subscribe(obj => {
                let savedObj: Operacao = Object.assign(new Operacao(), obj);
                let index = this.operacoes.findIndex(o => o.id == savedObj.id);
                if (index >= 0) {
                    this.operacoes[index] = savedObj;
                } else {
                    this.operacoes.push(savedObj);
                }
            });
        }
        this.updateOperacoes();
        this.close();
    }

    deleteOperacao(operacao: Operacao): void {
      let confirmDelete = confirm("Remover operacão " + operacao.acao.codigo + ": " + operacao.tipoOperacao + "?");
      if (confirmDelete) {
        let index = this.operacoes.findIndex(o => o.id == operacao.id);
        this.operacaoService.deleteOperacao(operacao).subscribe(res => {

          if (res) {
            this.operacoes.splice(index, 1);
            //todo: add modal info or error
          }
        });
      }
    }

    //compare method for directive compareWith
    comparator(itemA: any, itemB: any) {
        try {
            return itemA.id == itemB.id;
        } catch (e) {
            return false;
        }
    }

    close(): void {
        this.selectedOperacao = null;
    }
}
