import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { OperacaoService, PapelService, MensagemService } from '../../services';
import { Operacao, NotaCorretagem, Papel, Option } from '../../models';

@Component({
  selector: 'operacao-component',
  templateUrl: './operacao.component.html'
})
export class OperacaoComponent implements OnInit {
    operacoes: Operacao[] = [];
    papeis: Papel[] = [];
    optionsDataOperacao: Option[] = [];
    optionsTipoOperacao: Option[] = [];
    selectedNotaCorretagem: NotaCorretagem = null;
    selectedOperacao: Operacao = null;
    dataOperacaoFilter: Option = null;
    tipoOperacaoFilter: Option = null;

    constructor (
      private operacaoService: OperacaoService,
      private papelService: PapelService,
      private mensagemService: MensagemService
    ) {}

    ngOnInit(): void {
      this.papelService.list().subscribe(response => this.papeis = response.body);
      this.operacaoService.list().subscribe(response => this.operacoes = response.body);

      this.operacaoService.listOptionsTipoOperacao().subscribe(response => {
        this.optionsTipoOperacao = response.body;
        this.tipoOperacaoFilter = this.optionsTipoOperacao.find(option => option.value === localStorage.getItem('tipoOperacaoFilter'));
      });

      this.operacaoService.listOptionsDataOperacao().subscribe(response => {
        this.optionsDataOperacao = response.body.sort((current, next) => current.value > next.value ? 1 : -1);
        this.dataOperacaoFilter = this.optionsDataOperacao.find(option => option.value === localStorage.getItem('dataOperacaoFilter'));
      });
    }

    updateServices(): void {
      this.operacaoService.list().subscribe(response => this.operacoes = response.body);
      this.operacaoService.listOptionsDataOperacao().subscribe(response => this.optionsDataOperacao = response.body);
    }

    list(): Object {
      let obj: Object = new Object();
      this.operacoes
        .filter(operacao => this.tipoOperacaoFilter ? operacao.tipoOperacao == this.tipoOperacaoFilter.value : true)
        .filter(operacao => this.dataOperacaoFilter ? moment(operacao.dataOperacao).format('YYYY-MM') == this.dataOperacaoFilter.value : true)
        .forEach(operacao => {
          let key = moment(operacao.dataOperacao).format('YYYY-MM');
          let title = moment(operacao.dataOperacao).format('MM/YYYY');
          if (obj.hasOwnProperty(key)) {
            obj[key].items.push(operacao);
            operacao.tipoOperacao === 'COMPRA' ? obj[key].totalCompra += operacao.totalOperacao : obj[key].totalVenda += operacao.totalOperacao;
          } else {
            obj[key] = {
              title: title,
              items: [operacao],
              totalCompra: operacao.tipoOperacao === 'COMPRA' ? operacao.totalOperacao : 0,
              totalVenda: operacao.tipoOperacao === 'VENDA' ? operacao.totalOperacao : 0
            };
          }
        });
      return obj;
    }

    getTotalCompra(): number {
      let total = 0;
      this.operacoes.forEach(op => total += op.tipoOperacao === 'COMPRA' ? op.totalOperacao : 0);
      return total;
    }

    getTotalVenda(): number {
      let total = 0;
      this.operacoes.forEach(op => total += op.tipoOperacao === 'VENDA' ? op.totalOperacao : 0);
      return total;
    }

    getCustosOperacionais(): number {
      let totalCustos: number = 0;
      this.operacoes.forEach(op => {
        totalCustos += op.custoOperacao;
      });
      return totalCustos;
    }

    getTotalCustodia(): number {
      let total = 0;
      this.operacoes.forEach(op => total += op.tipoOperacao === 'COMPRA' ? op.totalOperacao : -op.totalOperacao);
      return total;
    }

    getPerformance(): number {
      return 0;
    }

    filter(): void {
      // filter data operacao
      if (!this.dataOperacaoFilter) {
        localStorage.removeItem('dataOperacaoFilter');
        this.dataOperacaoFilter = null;
      } else {
        localStorage.setItem('dataOperacaoFilter', this.dataOperacaoFilter.value);
      }
      // filter tipo operacao
      if (!this.tipoOperacaoFilter) {
        localStorage.removeItem('tipoOperacaoFilter');
        this.tipoOperacaoFilter = null;
      } else {
        localStorage.setItem('tipoOperacaoFilter', this.tipoOperacaoFilter.value);
      }
    }

    resetFilter(): void {
      localStorage.removeItem('dataOperacaoFilter');
      localStorage.removeItem('tipoOperacaoFilter');
      this.dataOperacaoFilter = null;
      this.tipoOperacaoFilter = null;
    }

    add(): void {
      this.selectedNotaCorretagem = new NotaCorretagem();
    }

    close(): void {
      this.selectedNotaCorretagem = null;
    }

    // compare method for directive compareWith
    comparator(itemA: any, itemB: any) {
        try {
            return itemA.id === itemB.id;
        } catch (e) {
            return false;
        }
    }
}