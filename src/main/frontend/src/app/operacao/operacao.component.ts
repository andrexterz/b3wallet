import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import * as moment from 'moment';
import { OperacaoService } from './operacao.service';
import { AcaoService } from '../acao/acao.service';
import { Operacao } from "./operacao";
import { Acao } from "../acao/acao";

@Component({
  selector: 'operacao-component',
  templateUrl: './operacao.component.html',
  providers: [OperacaoService]
})
export class OperacaoComponent implements OnInit {
    operacoes: Operacao[] = [];
    custodia = {};
    acoes: Acao[] = [];
    precoTotalCompra :number = 0;
    precoTotalVenda: number = 0;
    lucroLiquido: number = 0;
    index: number = null;
    selectedOperacao: Operacao = null;

    constructor(
      private operacaoService: OperacaoService,
      private acaoService: AcaoService,
      private route: ActivatedRoute,
      private location: Location) {
      }

    ngOnInit(): void {
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

          let total = op.valor * op.quantidade;

          if (op.tipoOperacao == 'COMPRA') {
              this.precoTotalCompra += total;
              if (this.custodia.hasOwnProperty(op.acao.codigo)) {
                  this.custodia[op.acao.codigo].precoMedio = (this.custodia[op.acao.codigo].precoMedio * this.custodia[op.acao.codigo].quantidade + op.valor * op.quantidade) / (this.custodia[op.acao.codigo].quantidade + op.quantidade);
                  this.custodia[op.acao.codigo].quantidade += op.quantidade;
              } else {
                  this.custodia[op.acao.codigo] = {
                      quantidade: op.quantidade,
                      precoMedio: op.valor
                   };
              }
          } else {
              this.custodia[op.acao.codigo].quantidade -= op.quantidade;
              this.precoTotalVenda += total;
          }
        });
    }

    getCustosOperacionais(): number {
      let totalCustos:number = 0;
      let meses:Set<number> = new Set();
      this.operacoes.forEach(op => {
        meses.add(moment(op.dataOperacao, "YYYY-MM-DD").month());
        totalCustos += op.custoOperacao;
      });
      let taxaCustodia = (this.precoTotalVenda + this.precoTotalCompra) <= 5000 ? 8.18 * meses.size : 8.65 * meses.size;
      return totalCustos + taxaCustodia;
    }

    getTotalCustodia(): number {
        let total:number = 0;
        for (let k in this.custodia) {
            total += this.custodia[k].precoMedio * this.custodia[k].quantidade;
        };
        return total;
    }

    getPerformance(): number {
      return 0;
    }

    addOperacao(): void {
        this.selectedOperacao = new Operacao();
        this.index = null;
    }

    editOperacao(operacao: Operacao, index: number): void {
         this.selectedOperacao = Object.assign(new Operacao(), operacao);
         this.index = index;
    }

    saveOperacao(): void {
        if (this.selectedOperacao) {
            let operacao: Operacao = Object.assign(new Operacao(), this.selectedOperacao);
            this.operacaoService.saveOperacao(operacao).subscribe(obj => {
                let savedObj: Operacao = Object.assign(new Operacao(), obj);
                if (this.index !== null) {
                    this.operacoes[this.index] = savedObj;
                } else {
                    this.operacoes.push(savedObj);
                }
            });
        }
        this.updateOperacoes();
        this.close();
    }

    deleteOperacao(operacao: Operacao, index: number): void {
      let confirmDelete = confirm("Remover operacão " + operacao.acao.codigo + ": " + operacao.tipoOperacao + "?");
      if (confirmDelete) {
        this.operacaoService.deleteOperacao(operacao).subscribe(res => {
          if (res) {
            this.operacoes.splice(index, 1);
            //todo: add modal info or error
          }
        });
      }
    }

    //compare method for directive compareWith
    byAcao(itemA: any, itemB: any) {
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
