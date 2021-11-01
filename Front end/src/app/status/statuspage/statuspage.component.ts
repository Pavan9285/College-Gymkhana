import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-statuspage',
  templateUrl: './statuspage.component.html',
  styleUrls: ['./statuspage.component.css']
})
export class StatuspageComponent implements OnInit {

  changeStatusgym() {
    var inputVal = document.getElementById("text1");
    if (inputVal.style.backgroundColor == "") {
      inputVal.style.backgroundColor = "green";
    }
    else if( inputVal.style.backgroundColor == "green"){
        inputVal.style.backgroundColor = "red";
    }
    else{
      inputVal.style.backgroundColor = "green";
    }
  }

  changeStatus1() {
    var inputVal = document.getElementById("text2");
    if (inputVal.style.backgroundColor == "") {
      inputVal.style.backgroundColor = "green";
    }
    else if( inputVal.style.backgroundColor == "green"){
        inputVal.style.backgroundColor = "red";
    }
    else{
      inputVal.style.backgroundColor = "green";
    }
  }

  changeStatus2() {
    var inputVal = document.getElementById("text3");
    if (inputVal.style.backgroundColor == "") {
      inputVal.style.backgroundColor = "green";
    }
    else if( inputVal.style.backgroundColor == "green"){
        inputVal.style.backgroundColor = "red";
    }
    else{
      inputVal.style.backgroundColor = "green";
    }
  }


  constructor() { }

  ngOnInit(): void {
  }

}
