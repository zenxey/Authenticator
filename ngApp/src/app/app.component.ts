import { Component } from '@angular/core';
import { AuthService } from './auth.service'; //importing and injecting the authservice explicitely to add a logout button

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngApp';

  constructor(public authService: AuthService) {}
}
