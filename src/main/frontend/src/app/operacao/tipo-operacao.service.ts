import { Injectable } from '@angular/core';

import { Acao } from '../acao/acao';
import { OPERACOES } from './operacoes.data';
import { TipoOperacao } from "./tipo-operacao";

@Injectable()
export class OperacaoService {

    getOperacoesByAcao(acao: Acao): Promise<TipoOperacao[]> {
     return Promise.resolve(OPERACOES.filter(op => op.acao.codigo === acao.codigo));
    }

    getOperacoes(): Promise<TipoOperacao[]> {
     return Promise.resolve(OPERACOES);
    }

    getOperacao(id: number): Promise<TipoOperacao> {
      return this.getOperacoes().then(operacoes => operacoes.find(operacao => operacao.id === id))
    }
}
