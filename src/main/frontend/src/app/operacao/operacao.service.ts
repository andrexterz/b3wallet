import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Acao } from '../acao/acao';
import { Http, Response } from '@angular/http';
import { Operacao } from "./operacao";

@Injectable()
export class OperacaoService {
    
    constructor(private http: Http) {}
    
    saveOperacao(operacao: Operacao): Observable<Operacao>  {
        return this.http.post("/api/operacoes/save", operacao).map((res: Response) => res.json());
    }    

    getOperacoes(): Observable<Operacao[]> {
        return this.http.get("/api/operacoes").map((res: Response) => res.json());
    }

    getOperacao(id: number): Promise<Operacao> {
      return null;
    }
}
