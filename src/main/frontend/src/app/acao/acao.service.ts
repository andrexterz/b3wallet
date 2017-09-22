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
    
    saveAcao(acao: Acao): void {
        this.http.post("/b3wallet/api/acoes/save", acao).subscribe(data => console.log(data));
    }

    getAcoes(): Observable<Acao[]> {
        return this.http.get("/b3wallet/api/acoes").map((res: Response) => res.json());
    }

    getAcaoById(id: number): Promise<Acao> {
      return null;
    }
}
