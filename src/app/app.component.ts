import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-exercise';
  constructor(private appService: AppService, private router: Router) {}

  /**
   * @INFO
   * Search for events w.r.t.`data.value`
   * @param data search  token
   */
  searchData(data) {
    let identifier = data.value;
    if (identifier.trim() !== '') {
      this.router.navigateByUrl('/');
      this.appService.searching.emit(true);
      this.appService.getEvents().subscribe(events => {
        let obj = Object.values(events).filter(items =>
          items.name.toLowerCase().includes(identifier)
        );
        this.appService.searchResults.emit(obj);
      });
    } else {
      this.appService.searching.emit(false);
    }
  }
}
