import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Acao } from '../acao/acao';
import { Analise } from "./analise";

@Injectable()
export class AnaliseService {

    constructor(private http: HttpClient) {}

    saveAnalise(analise: Analise): Observable<Analise>  {
        return this.http.post<Analise>("/api/analises/save", analise);
    }

    deleteAnalise(analise: Analise): Observable<boolean>  {
      return this.http.delete<boolean>("/api/analises/delete/" + analise.id);
    }

    getAnalises(): Observable<Analise[]> {
        return this.http.get<Analise[]>("/api/analises");
    }
}
