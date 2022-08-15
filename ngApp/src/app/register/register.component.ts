import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SpecialEventsComponent } from '../special-events/special-events.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData = {
    email: "",
    password: ""
  } /* bind the inputs to this registerUserData property */
  constructor(private _auth: AuthService, private route: Router) {}

  ngOnInit(): void {
  }

  registerUser(){
    this._auth.registerUser(this.registerUserData).subscribe(
      res => { console.log(res),
      localStorage.setItem('token', res.token) //storing the JWT token created in the backend api in the local storage for verifying the right user
      this.route.navigate(['/special']) // now "ng g guard auth" in ngApp to generate authenticaton guard that will return true if the token is present in the browser, false if not present. also go to auth service and make a method to return if the token exists in the local storage or not
    },
      err => console.log(err)
    )
  }
}
