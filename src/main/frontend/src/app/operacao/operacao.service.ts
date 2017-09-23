import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Acao } from '../acao/acao';
import { Http, Response } from '@angular/http';
import { OPERACOES } from './operacoes.data';
import { Operacao } from "./operacao";

@Injectable()
export class OperacaoService {
    
    constructor(private http: Http) {}
    
    getOperacoesByAcao(acao: Acao): Promise<Operacao[]> {
        return Promise.resolve(OPERACOES.filter(op => op.acao.codigo === acao.codigo));
    }

    getOperacoes(): Observable<Operacao[]> {
        return this.http.get("/b3wallet/api/operacoes").map((res: Response) => res.json());
    }

    getOperacao(id: number): Promise<Operacao> {
      return null;
    }
}
