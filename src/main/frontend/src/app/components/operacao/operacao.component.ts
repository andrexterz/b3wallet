import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { OperacaoService, AcaoService, MensagemService } from '../../services';
import { Operacao, Acao } from "../../models";

@Component({
  selector: 'operacao-component',
  templateUrl: './operacao.component.html'
})
export class OperacaoComponent implements OnInit {
    operacoes: Operacao[] = [];
    custodia = {};
    acoes: Acao[] = [];
    selectedOperacao: Operacao = null;
    options: Object[];
    tipoOperacaoFilter: string;

    constructor(
      private route: ActivatedRoute,
      private location: Location,
      private operacaoService: OperacaoService,
      private acaoService: AcaoService,
      private mensagemService: MensagemService
    ) {}

    ngOnInit(): void {
      this.acaoService.list().subscribe(response => this.acoes = response.body.map(acao => Object.assign(new Acao(), acao)));
      this.operacaoService.list().subscribe(response => {
        this.operacoes = response.body;
       });
      this.operacaoService.listOptions().subscribe(response => this.options = response.body.map(option => Object.assign(new Option(), option)));
      this.tipoOperacaoFilter = localStorage.getItem("tipoOperacaoFilter");
    }

    list(): Object {
      return this.tipoOperacaoFilter? this.operacoes.filter(operacao => operacao.tipoOperacao == this.tipoOperacaoFilter): this.operacoes;
    }

    getTotalCompra(): number {
      let total = 0;
      this.operacoes.forEach(op => total += op.tipoOperacao == 'COMPRA'? op.totalOperacao: 0);
      return total;
    }

    getTotalVenda(): number {
      let total = 0;
      this.operacoes.forEach(op => total += op.tipoOperacao == 'VENDA'? op.totalOperacao: 0);
      return total;
    }

    getCustosOperacionais(): number {
      let totalCustos:number = 0;
      this.operacoes.forEach(op => {
        totalCustos += op.custoOperacao;
      });
      return totalCustos;
    }

    getTotalCustodia(): number {
      let total = 0;
      this.operacoes.forEach(op => total += op.tipoOperacao == 'COMPRA'? op.totalOperacao: -op.totalOperacao);
      return total;
    }

    getPerformance(): number {
      return 0;
    }

    add(): void {
        this.selectedOperacao = new Operacao();
    }

    edit(operacao: Operacao): void {
         this.selectedOperacao = Object.assign(new Operacao(), operacao);
    }

    save(): void {
        if (this.selectedOperacao) {
            this.operacaoService.save(this.selectedOperacao).subscribe(response => {
                let savedObj: Operacao = Object.assign(new Operacao(), response.body);
                let index = this.operacoes.findIndex(o => o.id == savedObj.id);
                if (index >= 0) {
                    this.operacoes[index] = savedObj;
                } else {
                    this.operacoes.push(savedObj);
                }
                this.mensagemService.showMessage(savedObj.acao.codigo, "Operação salva com sucesso.", "success");
            }, error => {
                this.mensagemService.showMessage("Erro ao salvar operação", error.message, "error");
                console.log(error);
              });
        }
        this.close();
    }

    delete(operacao: Operacao): void {
      let confirmDelete = confirm("Remover operacão " + operacao.acao.codigo + ": " + operacao.tipoOperacao + "?");
      if (confirmDelete) {
        let index = this.operacoes.findIndex(o => o.id == operacao.id);
        this.operacaoService.delete(operacao).subscribe(response => {
            this.operacoes.splice(index, 1);
            this.mensagemService.showMessage("Item removido", "Operação de " + operacao.tipoOperacao + ": " + operacao.acao.codigo + " removida com sucesso.", "success");
        }, error => {
            this.mensagemService.showMessage("Erro ao remover operação", error.message, "error");
            console.log(error);
        });
      }
    }

    filter(filterValue: string): void {
      this.tipoOperacaoFilter = filterValue;
      localStorage.setItem("tipoOperacaoFilter", this.tipoOperacaoFilter);
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
