import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-event-book',
  templateUrl: './event-book.component.html',
  styleUrls: ['./event-book.component.scss']
})
export class EventBookComponent implements OnInit {
  id: number;
  event: any;
  booked: boolean;
  invalid: boolean = false;
  remainingSeats: number;
  eventBookingForm: FormGroup;
  namePattern = /^[a-zA-Z ]*$/;
  emailPattern = /[a-z0-9!#$%&'*+/=?^_{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;
  phonePattern = /^\d{10}$/;
  other_attendee: any;
  url: any;

  constructor(
    private router: Router,
    public formbuilder: FormBuilder,
    private appService: AppService
  ) {}

  ngOnInit() {
    this.buildForm();
    this.url = this.router.url.split('/');
    this.id = this.url[2];
    this.getSingleEvent(this.id);
  }

  /**
   * @INFO
   * Builds the event booking form
   */
  buildForm() {
    this.eventBookingForm = this.formbuilder.group({
      username: [
        '',
        [Validators.required, Validators.pattern(this.namePattern)]
      ],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      phone: ['', Validators.pattern(this.phonePattern)],
      no_of_seats: ['1'],
      name_of_other_attendee: this.formbuilder.array([]),
      availableSeats: ['']
    });
  }

  /**
   * @INFO
   * Validates for the number of seats
   * @param formControl Form control: no_of_seats
   */
  availableSeat(formControl: FormControl) {
    return formControl.value <= this.remainingSeats
      ? null
      : { notAvailable: true };
  }

  /**
   * @INFO
   * Creates the attendee form group dynamically
   */
  createAttendeeForm(): FormGroup {
    return this.formbuilder.group({
      attendee: ['', Validators.required]
    });
  }

  /**
   * @INFO
   * Add attendee formgroup
   * No of `Attendee` formgroup = the selected number the dropdown list
   */
  AddAttendee() {
    const count = this.eventBookingForm.value.no_of_seats;
    this.other_attendee = this.eventBookingForm.get(
      'name_of_other_attendee'
    ) as FormArray;
    // Clears the previously added formgroups from the formArray
    this.other_attendee.clear();
    // Validation check
    if (count <= this.remainingSeats && count > 1) {
      for (let i = 0; i < count - 1; ++i) {
        this.other_attendee.push(this.createAttendeeForm());
      }
    }
  }

  /**
   * @INFO
   * Fetches the data from the service and filter the selected event details
   * @param id Id of the event
   */
  getSingleEvent(id) {
    this.appService.getEvents().subscribe(data => {
      let obj = Object.values(data).filter(value => id == value.id);
      this.event = Object.values(obj)[0];
      this.remainingSeats = this.event.remaining_seats;
      this.eventBookingForm
        .get('no_of_seats')
        .setValidators(this.availableSeat.bind(this));
    });
  }

  /**
   * @INFO
   * Submit form
   * Check whether the form is valid or not
   * If valid, logs the form group value in the console & resets the form
   * else, throws form validation message
   */
  submitForm() {
    if (this.eventBookingForm.valid) {
      console.log(this.eventBookingForm.value);
      this.remainingSeats--;
      this.buildForm();
      this.booked = true;
      this.invalid = false;
    } else {
      this.invalid = true;
      Object.keys(this.eventBookingForm.controls).forEach(field => {
        const control = this.eventBookingForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
      (<FormArray>(
        this.eventBookingForm.get('name_of_other_attendee')
      )).controls.forEach(field => {
        field.markAsTouched({ onlySelf: true });
      });
    }
  }

  /**
   * @INFO
   * Resets the form
   * Navigates to the listing page
   */
  cancelSubmission() {
    this.buildForm();
    this.router.navigateByUrl('/');
  }
}
