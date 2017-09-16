import { Injectable } from '@angular/core';

import { Acao } from './acao';
import { ACOES } from './acoes.data';


@Injectable()
export class AcaoService {

    getAcoes(): Promise<Acao[]> {
      return Promise.resolve(ACOES);
    }

    getAcaoById(id: number): Promise<Acao> {
      return this.getAcoes().then(acoes => acoes.find(acao => acao.id === id))
    }
}
