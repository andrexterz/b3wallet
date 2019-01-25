import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Acao } from '../models/acao';
import { Analise } from "../models/analise";

@Injectable()
export class AnaliseService {

    constructor(private http: HttpClient) {}

    saveAnalise(analise: Analise): Observable<HttpResponse<Analise>>  {
        return this.http.post<Analise>("/api/analises/save", analise, {observe: 'response'});
    }

    deleteAnalise(analise: Analise): Observable<HttpResponse<boolean>> {
      return this.http.delete<boolean>("/api/analises/delete/" + analise.id, {observe: 'response'});
    }

    getAnalises(): Observable<HttpResponse<Analise[]>> {
        return this.http.get<Analise[]>("/api/analises", {observe: 'response'});
    }
}
