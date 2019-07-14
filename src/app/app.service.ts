import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private httpService: HttpClient) {}

  getEvents() {
    return this.httpService.get('../../assets/event-list.json');
  }
}
