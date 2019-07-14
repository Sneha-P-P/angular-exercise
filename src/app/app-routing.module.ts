import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventBookComponent } from './event-book/event-book.component';
import { EventListingComponent } from './event-listing/event-listing.component';

const routes: Routes = [
  {
    path: '',
    component: EventListingComponent
  },
  {
    path: 'book/:event-id/:slug',
    component: EventBookComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
