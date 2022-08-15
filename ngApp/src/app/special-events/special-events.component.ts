import { HttpErrorResponse } from '@angular/common/http'; //automatically imported when used in line number 21
import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import {Router} from '@angular/router'  //imported explicitely for line number 22 below (don't forget to inject the router)

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent implements OnInit {

  dateToday: number = Date.now();
  specialEvents: any[] = []
  constructor(private _eventService: EventService, private route: Router) { }

  ngOnInit(): void {
    this._eventService.getSpecialEvents().subscribe(
      res => this.specialEvents = res,
      err => {  //check api.js in the backend to understand what is happening here
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            this.route.navigate(['/login']) //restart node server after adding code from line 21 to 23; also go to routing.module and comment out canActivate method to verify that the token is verified in the backend and AuthGuard is not preventing sending request to special events
          }
        }
      }
    )
  }

}
