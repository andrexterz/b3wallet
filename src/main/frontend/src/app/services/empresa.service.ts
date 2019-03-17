/*
 * empresa service
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Empresa, Option } from '../models';

@Injectable()
export class EmpresaService {

    constructor(private http: HttpClient) { }

    save(empresa: Empresa): Observable<HttpResponse<Empresa>> {
        return this.http.post<Empresa>("/api/empresas/save", empresa, { observe: 'response' });
    }

    list(): Observable<HttpResponse<Empresa[]>> {
        return this.http.get<Empresa[]>("/api/empresas", { observe: 'response' });
    }
    listOptionsTipoPapel(): Observable<HttpResponse<Option[]>> {
        return this.http.get<Option[]>('/api/empresas/tipos', { observe: 'response' });
    }
}
