import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public gameTitle = 'Państwa - miasta';

  public player = {
    name: ''
  };

  constructor(public apiService: ApiService) {
    //
  }

  public signIn(playerCredentials): void {

    this.apiService.signIn(playerCredentials.name)
      .subscribe(() => {
        console.log('registered!');
        this.apiService.connect();
      });
  }
}
