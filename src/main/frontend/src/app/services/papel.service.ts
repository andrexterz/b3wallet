/*
 * papel service
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Papel } from '../models';

@Injectable()
export class PapelService {

    constructor(private http: HttpClient) {}

    save(papel: Papel): Observable<HttpResponse<Papel>>  {
        return this.http.post<Papel>('/api/papeis/save', papel, {observe: 'response'});
    }

    list(): Observable<HttpResponse<Papel[]>> {
        return this.http.get<Papel[]>('/api/papeis', {observe: 'response'});
    }
}
