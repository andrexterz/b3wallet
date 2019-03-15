import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Operacao, Option } from "../models";

@Injectable()
export class OperacaoService {

    constructor(private http: HttpClient) {}

    save(operacao: Operacao): Observable<HttpResponse<Operacao>>  {
      return this.http.post<Operacao>("/api/operacoes/save", operacao, {observe: 'response'});
    }

    delete(operacao: Operacao): Observable<HttpResponse<boolean>>  {
      return this.http.delete<boolean>("/api/operacoes/delete/" + operacao.id, {observe: 'response'});
    }

    list(): Observable<HttpResponse<Operacao[]>> {
        return this.http.get<Operacao[]>("/api/operacoes", {observe: 'response'});
    }

    listOptionsTipoOperacao(): Observable<HttpResponse<Option[]>> {
        return this.http.get<Option[]>("/api/operacoes/tipos", {observe: 'response'});
    }

    listOptionsDataOperacao(): Observable<HttpResponse<Option[]>> {
        return this.http.get<Option[]>("/api/operacoes/meses", {observe: 'response'});
    }
}
