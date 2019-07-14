import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventListingComponent } from './event-listing/event-listing.component';
import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import { EventBookComponent } from './event-book/event-book.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [ AppComponent, EventListingComponent, EventBookComponent ],
	imports: [ FormsModule, ReactiveFormsModule, BrowserModule, AppRoutingModule, HttpClientModule ],
	providers: [ AppService ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
