import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { AppConfig } from './../../config/app.config';


@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {

  loginForm: FormGroup;
  isUsernameOrPasswordInCorrect: boolean;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _userService: UserService,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.pattern(AppConfig.email)]],
      password: ['', [Validators.required]],

    })
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }


  onSubmit(event) {
    let formValue = this.loginForm.getRawValue();
    this._userService.getLogin(formValue).subscribe(data => {
      localStorage.setItem('user', data['token']);
      console.log('this is the data of the login:', data)
      this.isUsernameOrPasswordInCorrect = false;
    // this._todoService.setIsloggedInStatus(true)
      this._router.navigate(['home']);
    }, err => {
      console.log('this is the error of the login:', err)
      this.isUsernameOrPasswordInCorrect = true;
    })



  }

  
}
