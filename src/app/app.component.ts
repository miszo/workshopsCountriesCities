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
    name: '',
    password: 'pracuj456$'
  };

  constructor(public apiService: ApiService) {
  }


  public singIn(playerCredentials): void {
    this.apiService.singIn(playerCredentials)
      .subscribe(() => {
        console.log('registered!');
        this.apiService.connect();
      });
  }

}
