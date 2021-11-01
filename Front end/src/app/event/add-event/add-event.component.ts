import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  addEventsForm: FormGroup;
  eventForm: FormGroup;
  informationForm: FormGroup;
  message: String = '';
  eventList: any[] = [];
  eventInformationlist: any[] = [];

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _userservice: UserService) {
    this.eventList = [];
    this.eventInformationlist = [];
  }

  ngOnInit(): void {
    this.createEventsForm();
    this.createEventForm();
    this.getEvent();
    this.createInformationForm();
  }

  get informations(): FormArray {
    return this.addEventsForm.get("informations") as FormArray
  }

  createFormArr() {
    (this.addEventsForm.get('informations') as FormArray).clear();
    this.eventInformationlist.forEach(item => {
      let { id, informations, timing, place,fee,prize,details } = item;
      (this.addEventsForm.get('informations') as FormArray).push(this._fb.group({
        informationId: id,
        name: informations,
        timing: timing,
        place: place,
        fee:fee,
        prize:prize,
        details:details
      }))
    })
  }

  createEventForm() {
    this.eventForm = this._fb.group({
      event: ['', [Validators.required]]
    })
  }


  createInformationForm() {
    this.informationForm = this._fb.group({
      eventId: [''],
      information: ['', [Validators.required]]
    })
  }

  
  createEventsForm() {
    this.addEventsForm = this._fb.group({
      addeventId: [''],
      informations: this._fb.array([]),
    })
  }



  onSubmit() {
    console.log(this.addEventsForm.getRawValue());
    this.UpdateeventsValue();
  }

  UpdateeventsValue() {
    this._userservice.updateEventsinformation(this.addEventsForm.getRawValue()).subscribe(data => {
      console.log('submitted:::', data);
      alert("Data updated successfully !!");
      // this._router.navigate(['add-event']);
    }, error => {
      console.error(error);
    })
  };

  getEvent() {
    this._userservice.getEvent().subscribe((data: any[]) => {
      this.eventList = data;
    })
  }

  onChangeEvent(event) {
    this.getEventinformation(event.target.value)
  }

  getEventinformation(eventId) {
    this._userservice.getEventinformation(eventId).subscribe((data: any[]) => {
      this.eventInformationlist = data;
      this.createFormArr();
    })
  }




  submitEvent() {
    let formValue = this.eventForm.getRawValue();
    this._userservice.addEvent(formValue).subscribe(data => {
      this.message = 'Event submitted successfully'
      this.eventForm.reset();
      setTimeout(() => {
        this.message = '';
      }, 2000);
    }, error => {
      console.error(error);
    })
  }

  submitInformation() {
    let formValue = this.informationForm.getRawValue();
    this._userservice.addInformation(formValue).subscribe(data => {
      this.message = 'Information submitted successfully'
      this.informationForm.reset();
      setTimeout(() => {
        this.message = '';
      }, 2000);
    }, error => {
      console.error(error);
    })
  }
  
}