import { Injectable, Injector } from '@angular/core'; // READ THE COMMENT ON LINE 3
import { HttpInterceptor } from '@angular/common/http'; //explicitely imported by me
import { AuthService } from './auth.service'; // the way we inject auth service is slightly different, we are not going to directly inject it in the constructor cause of "CYCLIC DEPENDENCE ERROR THAT MIGHT OCCUR". WE WILL BE USING INJECTOR; IMPORT INJECTOR ABOVE
//now inject the service injector in the constructor below

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector: Injector) { } //now use this injector to get the instance of the auth service

  intercept(req, next){
    let authService = this.injector.get(AuthService)  //we can use this to get the token below in the Authorization
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}`// Used authService method getToken that resides in the Local Storage under Application tab in Dev Tools;   'Bearer xx.yy.zz': dummy authorization JSON to check if the Authorization is showing up in the browser's Dev Tool Network Event
      }
    })
    return next.handle(tokenizedReq)
  }
}
