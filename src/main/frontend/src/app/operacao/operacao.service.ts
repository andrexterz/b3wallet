import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Acao } from '../acao/acao';
import { Operacao } from "./operacao";

@Injectable()
export class OperacaoService {

    constructor(private http: HttpClient) {}

    saveOperacao(operacao: Operacao): Observable<Operacao>  {
      return this.http.post<Operacao>("/api/operacoes/save", operacao);
    }

    deleteOperacao(operacao: Operacao): Observable<boolean>  {
      return this.http.delete<boolean>("/api/operacoes/delete/" + operacao.id);
    }

    getOperacoes(): Observable<Operacao[]> {
        return this.http.get<Operacao[]>("/api/operacoes");
    }
}
