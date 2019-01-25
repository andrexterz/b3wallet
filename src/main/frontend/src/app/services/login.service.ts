import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/login';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) {
  }

  authenticate(credentials: Object): Observable<Login> {
    return this.http.post<Login>('/api/login', credentials);
  }
}
