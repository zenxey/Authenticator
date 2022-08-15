import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, Route } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {
    email: "",
    password: ""
  }
  constructor(private _auth: AuthService, private route: Router) { }

  ngOnInit(): void {
  }

  loginUser(){
    this._auth.loginUser(this.loginUserData).subscribe(
      res => {
        console.log(res),
        localStorage.setItem('token', res.token)
        this.route.navigate(['/special'])
      },
      err => console.log(err)
    )
  }
}

