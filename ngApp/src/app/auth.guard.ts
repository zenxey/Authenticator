import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router'; //added Router Explicitely to import router from angular/router
import { AuthService } from './auth.service'; //auth Service has loggedIn method that checks if the token exists in the browser or not
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {   //rewritting the CanActivate class

  constructor(private authService: AuthService, private route: Router) {} //using router service to control navigation

  canActivate(): boolean {
    if(this.authService.loggedIn()){
    return true
  } else {
    this.route.navigate(['/login'])
    return false
  } //provide routeGuard in the app.module to add it to the routermodule
}

}

