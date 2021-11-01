import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-add-timetable',
  templateUrl: './add-timetable.component.html',
  styleUrls: ['./add-timetable.component.css']
})
export class AddTimetableComponent implements OnInit {

  addTimetableForm: FormGroup;
  degreeForm: FormGroup;
  classForm: FormGroup;
  message: String = '';
  degreeList: any[] = [];
  degreeClasslist: any[] = [];

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _userservice: UserService) {
    this.degreeList = [];
    this.degreeClasslist = [];
  }

  ngOnInit(): void {
    this.createTimetableForm();
    this.createDegreeForm();
    this.getDegree();
    this.createClassForm();
  }

  get classes(): FormArray {
    return this.addTimetableForm.get("classes") as FormArray
  }

  createFormArr() {
    (this.addTimetableForm.get('classes') as FormArray).clear();
    this.degreeClasslist.forEach(item => {
      let { id, classes, opening_time, closing_time } = item;
      (this.addTimetableForm.get('classes') as FormArray).push(this._fb.group({
        classId: id,
        name: classes,
        opening_time: opening_time,
        closing_time: closing_time
      }))
    })
  }

  createDegreeForm() {
    this.degreeForm = this._fb.group({
      degree: ['', [Validators.required]]
    })
  }


  createClassForm() {
    this.classForm = this._fb.group({
      degreeId: [''],
      class: ['', [Validators.required]]
    })
  }

  
  createTimetableForm() {
    this.addTimetableForm = this._fb.group({
      adddegreeId: [''],
      classes: this._fb.array([]),
    })
  }
  

  onSubmit() {
    console.log(this.addTimetableForm.getRawValue());
    this.UpdatetimetableValue();
  }

  UpdatetimetableValue() {
    this._userservice.updateTimetableclass(this.addTimetableForm.getRawValue()).subscribe(data => {
      console.log('submitted:::', data);
      alert("Data updated successfully !!");
      // this._router.navigate(['add-timetable']);
    }, error => {
      console.error(error);
    })
  };

  getDegree() {
    this._userservice.getDegree().subscribe((data: any[]) => {
      this.degreeList = data;
    })
  }

  onChangeDegree(event) {
    this.getDegreeclass(event.target.value)
  }

  getDegreeclass(gameId) {
    this._userservice.getDegreeclass(gameId).subscribe((data: any[]) => {
      this.degreeClasslist = data;
      this.createFormArr();
    })
  }




  submitDegree() {
    let formValue = this.degreeForm.getRawValue();
    this._userservice.addDegree(formValue).subscribe(data => {
      this.message = 'Game submitted successfully'
      this.degreeForm.reset();
      setTimeout(() => {
        this.message = '';
      }, 2000);
    }, error => {
      console.error(error);
    })
  }

  submitClass() {
    let formValue = this.classForm.getRawValue();
    this._userservice.addClass(formValue).subscribe(data => {
      this.message = 'Item submitted successfully'
      this.classForm.reset();
      setTimeout(() => {
        this.message = '';
      }, 2000);
    }, error => {
      console.error(error);
    })
  } 


}
