import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { Data } from '@angular/router';

@Component({
  selector: 'app-feedbackpage',
  templateUrl: './feedbackpage.component.html',
  styleUrls: ['./feedbackpage.component.css']
})
export class FeedbackpageComponent implements OnInit {

  getFeedbackForm: FormGroup;
  feedbackForm: FormGroup;
  message: String = '';
  feed: any[] = [];

  constructor(
    private _fb: FormBuilder,
    private _userservice: UserService
  ) { }

  ngOnInit(): void {
    this.createfeedbackForm();
    this.creategetFeedbackForm();
  }

  createfeedbackForm() {
    this.feedbackForm = this._fb.group({
      feedbackvazeGymkhana: ['', [Validators.required]],
      feedbackwebsite: ['', [Validators.required]]
    })
  }



  submitfeedback() {
    let formValue = this.feedbackForm.getRawValue();
    this._userservice.addFeedback(formValue).subscribe(data => {
      this.message = 'Feedback submitted successfully'
      this.feedbackForm.reset();
      setTimeout(() => {
        this.message = '';
      }, 2000);
    }, error => {
      console.error(error);
    })
  }

  getfeedback() {
    this._userservice.getFeedback().subscribe((data: any[]) => {
      this.feed = data;
    }, error => {
      console.error(error);
    })
  };




  creategetFeedbackForm() {
    this.getFeedbackForm = this._fb.group({
      feedbackvazeGymkhana: [''],
      feedbackwebsite: ['']
    })
  }


  deleteFeedback(id) {
    let con = confirm("Do you want to delete FeedBack ?");
    if (con) {
      this._userservice.deleteFeedback(id).subscribe(data => {
        this.getfeedback();
      })  
    }
  }

}
