import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as jwt from 'jsonwebtoken';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/publish';
import { Observable } from 'rxjs/Observable';
import { WebSocketService } from './websocket.service';
import { environment } from './environments/environment';
import { SocketMessageTypes } from './interfaces/message';

@Injectable()
export class ApiService {

  private URL = 'http://' + environment.apiURL + '/api';
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
      } else if (message.type === SocketMessageTypes.GAME) {

        this.game = message.body.game;
        this.game.endsOn = new Date(this.game.endsOn);
        this.myAnswer = '';

      } else if (message.type === SocketMessageTypes.SOLUTION) {

        if (this.game) {

          this.archivedGames.unshift(this.game);

          this.game.solved = true;
          this.game.plays = message.body.game.plays;
        }
      }
    }, (error) => {
      console.log(error);
    });
  }

  private useToken(token: string) {

    this.token = token;
    this.player.name = jwt.decode(token);
  }
}
