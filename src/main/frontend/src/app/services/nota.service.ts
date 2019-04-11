import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Papel, Nota } from '../models';

@Injectable()
export class NotaService {

    constructor(private http: HttpClient) {}

    save(nota: Nota): Observable<HttpResponse<Nota>>  {
        return this.http.post<Nota>('/api/notas/save', nota, {observe: 'response'});
    }

    delete(nota: Nota): Observable<HttpResponse<boolean>> {
      return this.http.delete<boolean>('/api/notas/delete/' + nota.id, {observe: 'response'});
    }

    list(): Observable<HttpResponse<Nota[]>> {
        return this.http.get<Nota[]>('/api/notas', {observe: 'response'});
    }
}
