import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-listing',
  templateUrl: './event-listing.component.html',
  styleUrls: ['./event-listing.component.scss']
})
export class EventListingComponent implements OnInit {
  eventData = [];

  constructor(private appService: AppService, private route: Router) {}

  ngOnInit() {
    this.subscribeData();
  }

  /**
   * @INFO
   * Subscribes for all events
   */
  subscribeData() {
    this.appService.getEvents().subscribe(data => {
      this.eventData = Object.values(data);
    });
  }

  /**
   * @INFO
   * Function that navigates to event booking page
   */
  gotoBookPage(slug, id) {
    this.route.navigateByUrl(`/book/${id}/${slug}`);
  }
}
