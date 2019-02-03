import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Acao, Provento } from '../models';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ProventoService {

    constructor(private http: HttpClient) {}

    save(provento: Provento): Observable<HttpResponse<Provento>>  {
      return this.http.post<Provento>("/api/proventos/save", provento, {observe: 'response'});
    }

    delete(provento: Provento): Observable<HttpResponse<boolean>>  {
      return this.http.delete<boolean>("/api/proventos/delete/" + provento.id, {observe: 'response'});
    }

    list(): Observable<HttpResponse<Provento[]>> {
        return this.http.get<Provento[]>("/api/proventos", {observe: 'response'});
    }
}
