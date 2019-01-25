/*
 * acao service
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Acao } from '../models/acao';

@Injectable()
export class AcaoService {

    constructor(private http: HttpClient) {}

    saveAcao(acao: Acao): Observable<Acao>  {
        return this.http.post<Acao>("/api/acoes/save", acao);
    }

    getAcoes(): Observable<Acao[]> {
        return this.http.get<Acao[]>("/api/acoes");
    }
}
