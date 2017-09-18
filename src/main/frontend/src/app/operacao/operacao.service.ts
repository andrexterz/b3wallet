import { Injectable } from '@angular/core';

import { Acao } from '../acao/acao';
import { OPERACOES } from './operacoes.data';
import { Operacao } from "./operacao";

@Injectable()
export class OperacaoService {

    getOperacoesByAcao(acao: Acao): Promise<Operacao[]> {
     return Promise.resolve(OPERACOES.filter(op => op.acao.codigo === acao.codigo));
    }

    getOperacoes(): Promise<Operacao[]> {
     return Promise.resolve(OPERACOES);
    }

    getOperacao(id: number): Promise<Operacao> {
      return this.getOperacoes().then(operacoes => operacoes.find(operacao => operacao.id === id))
    }
}
