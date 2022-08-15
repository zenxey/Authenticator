import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { SpecialEventsComponent } from './special-events/special-events.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClient } from '@angular/common/http';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/events',
    pathMatch: 'full'
  },
  {
    path: 'events',
    component: EventsComponent
  },
  {
    path: 'special',
    component: SpecialEventsComponent,
    canActivate: [AuthGuard] //COMMENTED TO AVOID USING AUTHGUARD ON FRONTEND AND USE THE BACKEND MIDDLEWARE TO VERIFY IF THE TOKEN IS BEING CHECKED IN THE BACKEND; IF THE TOKEN WORKING IN THE BACKEND UNCOMMENT THE FRONTEND AUTHENTICATION THAT WAY WE HAVE A TWO WAY AUTHENTICATOR
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
