import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'; //imported explicitely for logoutUser() below also don't forget to inject

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "http://localhost:3000/api/register"
  private _loginUrl = "http://localhost:3000/api/login"
  constructor(private http: HttpClient, private route: Router) {}

   registerUser(user):Observable<any>{
    return this.http.post(this._registerUrl, user)
   }

   loginUser(user){
    return this.http.post<any>(this._loginUrl, user)
   }

   loggedIn() {
    return !!localStorage.getItem('token') //!!(double negate the return statement to not get the token but get a boolean instead) for verifying if the token exists in the browser or not
  }

  logoutUser(){
    localStorage.removeItem('token')
    this.route.navigate(['/events'])
  }

   getToken(){
    return localStorage.getItem('token')  //returns the token in the local storage on browser dev tools under Application local storage section
   }
}
