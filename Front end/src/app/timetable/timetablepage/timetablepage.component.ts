import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { FormArray,FormGroup,FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-timetablepage',
  templateUrl: './timetablepage.component.html',
  styleUrls: ['./timetablepage.component.css']
})
export class TimetablepageComponent implements OnInit {

  
  getTimetableForm: FormGroup;
  degreeList: any[] = [];
  degreeClasslist: any[] = [];

  constructor(
    private _fb: FormBuilder,
    private _userservice: UserService) {
    this.degreeList = [];
    this.degreeClasslist = [];
   }

  ngOnInit(): void {
    this.createTimetableForm();
    this.getDegree();
  }

  get classes(): FormArray {
    return this.getTimetableForm.get("classes") as FormArray
  }

  createFormArr() {
    (this.getTimetableForm.get('classes') as FormArray).clear();
    this.degreeClasslist.forEach(item => {
      let { id, classes, opening_time, closing_time } = item;
      (this.getTimetableForm.get('classes') as FormArray).push(this._fb.group({
        classId: id,
        name: classes,
        opening_time: opening_time,
        closing_time: closing_time
      }))
    })
  }

  getDegree() {
    this._userservice.getDegree().subscribe((data: any[]) => {
      this.degreeList = data;
    })
  }

  onChangeGame(event) {
    this.getDegreeclass(event.target.value)
  }

  getDegreeclass(degreeId) {
    this._userservice.getDegreeclass(degreeId).subscribe((data: any[]) => {
      this.degreeClasslist = data;
      this.createFormArr();
    })
  }

  createTimetableForm() {
    this.getTimetableForm = this._fb.group({
      adddegreeId: [''],
      classes: this._fb.array([]),
    })
  }

}
