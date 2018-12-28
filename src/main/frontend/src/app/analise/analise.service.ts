import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Acao } from '../acao/acao';
import { Http, Response } from '@angular/http';
import { Analise } from "./analise";

@Injectable()
export class AnaliseService {

    constructor(private http: Http) {}

    saveAnalise(analise: Analise): Observable<Analise>  {
        return this.http.post("/api/analises/save", analise).map((res: Response) => res.json());
    }

    deleteAnalise(analise: Analise): Observable<boolean>  {
      return this.http.delete("/api/analises/delete/" + analise.id).map((res: Response) => res.json());
    }

    getAnalises(): Observable<Analise[]> {
        return this.http.get("/api/analises").map((res: Response) => res.json());
    }

    getAnalise(id: number): Promise<Analise> {
      return null;
    }
}
