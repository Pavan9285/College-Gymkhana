import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { FormArray,FormGroup,FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-eventpage',
  templateUrl: './eventpage.component.html',
  styleUrls: ['./eventpage.component.css']
})
export class EventpageComponent implements OnInit {
  getEventsForm: FormGroup;
  eventList: any[] = [];
  eventInformationlist: any[] = [];

  constructor(
    private _fb: FormBuilder,
    private _userservice: UserService) {
    this.eventList = [];
    this.eventInformationlist = [];
   }

  ngOnInit(): void {
    this.createEventsForm();
    this.getEvent();
  }

  get informations(): FormArray {
    return this.getEventsForm.get("informations") as FormArray
  }

  createFormArr() {
    (this.getEventsForm.get('informations') as FormArray).clear();
    this.eventInformationlist.forEach(item => {
      let { id, informations, timing, place,fee,prize,details } = item;
      (this.getEventsForm.get('informations') as FormArray).push(this._fb.group({
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

  createEventsForm() {
    this.getEventsForm = this._fb.group({
      addeventId: [''],
      informations: this._fb.array([]),
    })
  }

}