import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  dateToday: number = Date.now();
  events: any[] = []

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(
      res => this.events = res,
      err => console.log(err)
    )
  }
}
