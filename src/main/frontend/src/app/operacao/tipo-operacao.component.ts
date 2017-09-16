import { Component,  OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { OperacaoService } from './tipo-operacao.service';
import { TipoOperacao } from "./tipo-operacao";
import { OperacaoEnum } from "./operacaoEnum";
import { Acao } from "../acao/acao";

@Component({
  selector: 'tipo-operacao-component',
  templateUrl: './tipo-operacao.component.html',
  providers: [OperacaoService]
})
export class TipoOperacaoComponent implements OnInit {

    @Input() acao: Acao;
    operacoes: TipoOperacao[] = [];
    precoMedioCompra :number = 0;
    precoMedioVenda: number = 0;
    quantidadeCompra: number = 0;
    quantidadeVenda: number = 0;

    constructor(
      private operacaoService: OperacaoService,
      private route: ActivatedRoute,
      private location: Location) {
      }

    ngOnInit(): void {
      this.operacaoService.getOperacoes().then(operacoes => {
        this.operacoes = operacoes;
        operacoes.forEach(op => {
          if (op.operacao === OperacaoEnum.COMPRA) {
            this.precoMedioCompra += op.valor * op.quantidade;
            this.quantidadeCompra += op.quantidade;

          } else {
            this.precoMedioVenda += op.valor * op.quantidade;
            this.quantidadeVenda += op.quantidade;
          }
        });
      });
    }

    getCustosOperacionais(): number {
      let totalCustos:number = 0;

      let objCustos = this.operacoes.reduce(function(r, a) {
        r[a.dataOperacao.toLocaleDateString()] = r[a.dataOperacao.toLocaleDateString()] || 0;
        r[a.dataOperacao.toLocaleDateString()] += a.valor * a.quantidade;
        return r;
      }, Object.create(null));

      Object.entries(objCustos).forEach((k) => {
        // taxa de corretagem caixa
        if (k[1] <= 200.00) {
          totalCustos += 0.75;//taxa fixa
        }
        if ( k[1] >= 200.01 && k[1] <= 3000) {
          totalCustos +=k[1] * 0.0025;//0.25%
        }
        if ( k[1] >= 3000.01 && k[1] <= 100000) {
          totalCustos += k[1] * 0.0020;//0.20%
        }
        if ( k[1] >= 100000.01 && k[1] <= 200000) {
          totalCustos += k[1]* 0.0015;//0.15%
        }
        if ( k[1] > 200000) {
          totalCustos += k[1] * 0.0010;//0.10%
        }
      });

      // emolumentos e custódia bovespa
      let quantidadeMeses = new Set(Object.keys(objCustos).map(d => d.split("/")[1])).size;
      let emolumentos = (this.precoMedioVenda + this.precoMedioCompra) * 0.000325;
      let custodia = (this.precoMedioVenda + this.precoMedioCompra) <= 5000? 8.18 * quantidadeMeses : 8.65 * quantidadeMeses;
      console.log(emolumentos);
      console.log(custodia);
      return totalCustos + emolumentos + custodia;
    }

    getPerformance(): number {
      return (this.precoMedioVenda / ((this.precoMedioCompra / this.quantidadeCompra) * this.quantidadeVenda)) - 1;
    }
}
