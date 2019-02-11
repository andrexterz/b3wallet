import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { OperacaoService, AcaoService, MensagemService } from '../../services';
import { Operacao, Acao, Option } from "../../models";
@Component({
  selector: 'operacao-component',
  templateUrl: './operacao.component.html'
})
export class OperacaoComponent implements OnInit {
    operacoes: Operacao[] = [];
    custodia = {};
    acoes: Acao[] = [];
    optionsTipoOperacao: Object[];
    selectedOperacao: Operacao = null;
    dataOperacaoFilter: string = null;
    tipoOperacaoFilter: string = null;
    selectedListItem: Set<string> = new Set();

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
      this.operacaoService.listOptionsTipoOperacao().subscribe(response => this.optionsTipoOperacao = response.body.map(option => Object.assign(new Option(), option)));
      this.tipoOperacaoFilter = localStorage.getItem("tipoOperacaoFilter");
      this.dataOperacaoFilter = localStorage.getItem("dataOperacaoFilter");
    }

    list(): Object {
      let obj: Object = new Object();
      this.operacoes
        .filter(operacao => this.tipoOperacaoFilter? operacao.tipoOperacao == this.tipoOperacaoFilter: true)
        .filter(operacao => this.dataOperacaoFilter? moment(operacao.dataOperacao).format("YYYY-MM") == this.dataOperacaoFilter: true)
        .forEach(operacao => {
          let key = moment(operacao.dataOperacao).format("YYYY-MM");
          let title = moment(operacao.dataOperacao).format("MM/YYYY");
          if (obj.hasOwnProperty(key)) {
            obj[key].items.push(operacao);
            operacao.tipoOperacao == 'COMPRA'? obj[key].totalCompra += operacao.totalOperacao: obj[key].totalVenda += operacao.totalOperacao;
          } else {
            obj[key] = {
              title: title,
              items: [operacao],
              totalCompra: operacao.tipoOperacao == 'COMPRA'? operacao.totalOperacao: 0,
              totalVenda: operacao.tipoOperacao == 'VENDA'? operacao.totalOperacao: 0
            };
          }
        });
      return obj;
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

    listOptionsDataOperacao(): Object {
      let keys: Set<string> = new Set();
      let options: Option[] = [];
      this.operacoes.forEach(operacao => {
        let key = moment(operacao.dataOperacao).format("YYYY-MM");
        if (!keys.has(key)) {
          let option = new Option();
          option.value = moment(operacao.dataOperacao).format("YYYY-MM");
          option.description = moment(operacao.dataOperacao).format("MM/YYYY");
          option.id = moment(operacao.dataOperacao).valueOf();
          options.push(option);
          keys.add(key);
        }
      });
      return options.sort((optionA, optionB) => optionB.id - optionA.id);
    }

    resetFilter(): void {
      localStorage.removeItem("dataOperacaoFilter");
      localStorage.removeItem("tipoOperacaoFilter");
      this.dataOperacaoFilter = null;
      this.tipoOperacaoFilter = null;
    }

    filterDataOperacao(): void {
      if (!this.dataOperacaoFilter) {
        localStorage.removeItem("dataOperacaoFilter");
        this.dataOperacaoFilter = null;
      } else {
        localStorage.setItem("dataOperacaoFilter", this.dataOperacaoFilter);
      }
    }

    filterTipoOperacao(): void {
      if (!this.tipoOperacaoFilter) {
        localStorage.removeItem("tipoOperacaoFilter");
        this.tipoOperacaoFilter = null;
      } else {
        localStorage.setItem("tipoOperacaoFilter", this.tipoOperacaoFilter);
      }
    }

    close(): void {
      this.selectedOperacao = null;
    }

    //compare method for directive compareWith
    comparator(itemA: any, itemB: any) {
        try {
            return itemA.id == itemB.id;
        } catch (e) {
            return false;
        }
    }

    expandListItem(item: string): void {
      if (this.selectedListItem.has(item)) {
        this.selectedListItem.delete(item);
      } else {
        this.selectedListItem.add(item);
      }
    }

    isExpanded(item: string):boolean {
      return this.selectedListItem.has(item);
    }
}
