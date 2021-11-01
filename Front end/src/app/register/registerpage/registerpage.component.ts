import { UserService } from './../../services/user.service';
import { AppConfig } from './../../config/app.config';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styleUrls: ['./registerpage.component.css']
})


export class RegisterpageComponent implements OnInit {

  registerForm: FormGroup;
  isEmailidAlreadyExist: boolean;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _userservice: UserService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.registerForm = this._fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(AppConfig.email)]],
      password: ['', [Validators.required]],
      confirmpassword: ['', [Validators.required]],
      controlid: ['', [Validators.required]],
      stream: ['', [Validators.required]],
      class: ['', [Validators.required]],
      rollno: ['', [Validators.required]],
    })
  }

  get firstname() {
    return this.registerForm.get('firstname');
  }
  get lastname() {
    return this.registerForm.get('lastname');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmpassword() {
    return this.registerForm.get('confirmpassword');
  }
  get controlid() {
    return this.registerForm.get('controlid');
  }
  get stream() {
    return this.registerForm.get('stream');
  }
  get rollno() {
    return this.registerForm.get('rollno');
  }
  get class() {
    return this.registerForm.get('class');
  }

  onSubmit() {
    if (this.password.value == this.confirmpassword.value) {
      console.log(this.registerForm.getRawValue());
      this.registerValue();
    }
    else {
      alert("Password and confirm Password is not match");
    }
  }

  registerValue() {
    this._userservice.getRegister(this.registerForm.getRawValue()).subscribe(data => {
      console.log('submitted:::', data);
      this.isEmailidAlreadyExist=false;
      this._router.navigate(['login']);
    }, error => {
      console.error(error);
      this.isEmailidAlreadyExist=true;
    })
  };

}