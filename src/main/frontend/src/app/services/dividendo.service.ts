import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Acao, Dividendo } from '../models';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class DividendoService {

    constructor(private http: HttpClient) {}

    save(dividendo: Dividendo): Observable<HttpResponse<Dividendo>>  {
      return this.http.post<Dividendo>("/api/dividendos/save", dividendo, {observe: 'response'});
    }

    delete(dividendo: Dividendo): Observable<HttpResponse<boolean>>  {
      return this.http.delete<boolean>("/api/dividendos/delete/" + dividendo.id, {observe: 'response'});
    }

    list(): Observable<HttpResponse<Dividendo[]>> {
        return this.http.get<Dividendo[]>("/api/dividendos", {observe: 'response'});
    }
}
