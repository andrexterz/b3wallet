import { Component,  OnInit, Input } from '@angular/core';
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
    acoes: Acao[];
    precoMedioCompra :number = 0;
    precoMedioVenda: number = 0;
    quantidadeCompra: number = 0;
    quantidadeVenda: number = 0;
    index: number = null;
    selectedOperacao: Operacao = null;

    constructor(
      private operacaoService: OperacaoService,
      private acaoService: AcaoService,
      private route: ActivatedRoute,
      private location: Location) {
      }

    ngOnInit(): void {
      this.operacaoService.getOperacoes().subscribe(operacoes => {
        this.operacoes = operacoes;
        operacoes.forEach(op => {
          if (op.tipoOperacao === 'COMPRA') {
            this.precoMedioCompra += op.valor * op.quantidade;
            this.quantidadeCompra += op.quantidade;

          } else {
            this.precoMedioVenda += op.valor * op.quantidade;
            this.quantidadeVenda += op.quantidade;
          }
        });
      });
      this.acaoService.getAcoes().subscribe(acoes => this.acoes = acoes.map(acao => Object.assign(new Acao(), acao)));
    }
    
    addOperacao(): void {
        console.log("adicionando operação");
        this.selectedOperacao = new Operacao();
        this.index = null;
    }    

    getCustosOperacionais(): number {
      let totalCustos:number = 0;
      let meses:Set<number> = new Set();

      let objCustos = this.operacoes.reduce(function(r, a) {
        let k = moment(a.dataOperacao, "YYYY-MM-DD");
        meses.add(k.month());
        r[k.toLocaleString()] = r[k.toLocaleString()] || 0;
        r[k.toLocaleString()] += a.valor * a.quantidade;
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

      let emolumentos = (this.precoMedioVenda + this.precoMedioCompra) * 0.000325;
      let custodia = (this.precoMedioVenda + this.precoMedioCompra) <= 5000 ? 8.18 * meses.size : 8.65 * meses.size;
      return totalCustos + emolumentos + custodia;
    }

    getPerformance(): number {
      return (this.precoMedioVenda / ((this.precoMedioCompra / this.quantidadeCompra) * this.quantidadeVenda)) - 1;
    }
    
    saveOperacao(): void {
        console.log("save operacao");
        if(this.selectedOperacao) {
            let operacao: Operacao = Object.assign(new Operacao(), this.selectedOperacao);
            //let acao = Object.assign(new Acao(), this.acao);
            console.log(operacao);
        }
    }
    
    close(): void {
        this.selectedOperacao = null;
    }    
}
