import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as jwt from 'jsonwebtoken';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/publish';
import { Observable } from 'rxjs/Observable';

import { WebSocketService } from './app/websocket.service';
import { environment } from './environments/environment';
import { SocketMessageTypes } from './interfaces/message';

@Injectable()
export class ApiService {

  private URL = `http://${environment.apiURL}/api`;
  private wsURL = 'ws://' + environment.apiURL;

  public token = '';

  public players: any[] = [];
  public game: any;
  public archivedGames: any[] = [];
  public myAnswer: string;

  public player: any = {
    name: ''
  };

  public playerRegistered = false;

  constructor(private http: Http,
              private websocketService: WebSocketService) {
  }

  public singIn(playerCredentials): Observable<any> {
    return this.http.post(`${this.URL}/player`, {
      id: playerCredentials.name,
      password: playerCredentials.password
    })
      .do((res) => {
        const body = res.json();

        this.player = {
          name: playerCredentials.name
        };
        this.playerRegistered = true;
        this.useToken(body.token);

        localStorage.setItem('playerToken', this.token);
      });
  }

  public connect() {
    const socket = this.websocketService.connect(this.wsURL, this.token);

    socket.subscribe((message) => {
      if (message.type === SocketMessageTypes.PLAYER) {

        this.players = message.body.players;
      }
    });
  }

  private useToken(token: string): void {
    this.token = token;
    this.player.name = jwt.decode(token);
  }

}
