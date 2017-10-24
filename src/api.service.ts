import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as jwt from 'jsonwebtoken';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/publish';
import { Observable } from 'rxjs/Observable';
import { environment } from './environments/environment';

@Injectable()
export class ApiService {

  private URL = 'http://' + environment.apiURL + '/api';

  public token = '';

  public player: any = {
    name: ''
  };

  constructor(private http: Http) {

      //
  }

  public signIn(name): Observable<any> {

    return this.http.post(this.URL + '/player', {
      id: name,
      password: 'pracuj456$'
    })
      .do((response) => {

        const body = response.json();
        this.player = {
          name: name
        };
        this.useToken(body.token);

        localStorage.setItem('playerToken', this.token);
      });
  }

  private useToken(token: string) {

    this.token = token;
    this.player.name = jwt.decode(token);
  }
}
