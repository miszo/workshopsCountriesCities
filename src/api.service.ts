import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as jwt from 'jsonwebtoken';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/publish';
import { Observable } from 'rxjs/Observable';

import { environment } from './environments/environment';

@Injectable()
export class ApiService {

  private URL = `http://${environment.apiURL}/api`;

  public token = '';

  public player: any = {
    name: ''
  };

  constructor(private http: Http) {
  }

  public singIn(playerName): Observable<any> {
    return this.http.post(`${this.URL}/player`, {
      id: playerName,
      password: 'pracuj456$'
    })
      .do((res) => {
        const body = res.json();

        this.player = {
          name: playerName
        };

        this.useToken(body.token);

        localStorage.setItem('playerToken', this.token);
      });
  }

  public useToken(token: string): void {
    this.token = token;
    this.player.name = jwt.decode(token);
  }

}
