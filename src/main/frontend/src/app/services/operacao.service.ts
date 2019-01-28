import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Acao } from '../models/acao';
import { Operacao } from "../models/operacao";

@Injectable()
export class OperacaoService {

    constructor(private http: HttpClient) {}

    saveOperacao(operacao: Operacao): Observable<HttpResponse<Operacao>>  {
      return this.http.post<Operacao>("/api/operacoes/save", operacao, {observe: 'response'});
    }

    deleteOperacao(operacao: Operacao): Observable<HttpResponse<boolean>>  {
      return this.http.delete<boolean>("/api/operacoes/delete/" + operacao.id, {observe: 'response'});
    }

    getOperacoes(): Observable<HttpResponse<Operacao[]>> {
        return this.http.get<Operacao[]>("/api/operacoes", {observe: 'response'});
    }
}
