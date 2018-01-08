/*
 * acao service
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Acao } from './acao';

@Injectable()
export class AcaoService {

    constructor(private http: Http) {}
    
    saveAcao(acao: Acao): Observable<Acao>  {
        return this.http.post("/api/acoes/save", acao).map((res: Response) => res.json());
    }

    getAcoes(): Observable<Acao[]> {
        return this.http.get("/api/acoes").map((res: Response) => res.json());
    }

    getAcaoById(id: number): Promise<Acao> {
      return null;
    }
}
