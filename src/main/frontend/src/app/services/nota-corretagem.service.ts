import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { NotaCorretagem, Option } from '../models';

@Injectable()
export class NotaCorretagemService {

    constructor(private http: HttpClient) {}

    save(notaCorretagem: NotaCorretagem): Observable<HttpResponse<NotaCorretagem>>  {
        notaCorretagem.operacoes.forEach(op => op.dataOperacao = notaCorretagem.dataPregao);
        return this.http.post<NotaCorretagem>('/api/notas-de-corretagem/save', notaCorretagem, {observe: 'response'});
    }

    delete(notaCorretagem: NotaCorretagem): Observable<HttpResponse<boolean>>  {
        return this.http.delete<boolean>('/api/notas-de-corretagem/delete/' + notaCorretagem.id, {observe: 'response'});
    }

    get(notaCorretagem: NotaCorretagem): Observable<HttpResponse<NotaCorretagem>> {
        return this.http.get<NotaCorretagem>('/api/notas-de-corretagem/' + notaCorretagem.id, {observe: 'response'});
    }
    list(): Observable<HttpResponse<NotaCorretagem[]>> {
        return this.http.get<NotaCorretagem[]>('/api/notas-de-corretagem', {observe: 'response'});
    }

    listOptionsDataNotaCorretagem(): Observable<HttpResponse<Option[]>> {
        return this.http.get<Option[]>('/api/notas-de-corretagem/meses', {observe: 'response'});
    }
}
