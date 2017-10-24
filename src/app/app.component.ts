import { Component } from '@angular/core';

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

  public signIn(playerCredentials): void {

    console.log(playerCredentials);
  }
}
