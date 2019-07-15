import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  searching: EventEmitter<boolean> = new EventEmitter();
  searchResults: EventEmitter<any> = new EventEmitter();

  constructor(private httpService: HttpClient) {}

  getEvents() {
    return this.httpService.get('../../assets/event-list.json');
  }
}
