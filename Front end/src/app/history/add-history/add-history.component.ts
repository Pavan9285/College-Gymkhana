import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-add-history',
  templateUrl: './add-history.component.html',
  styleUrls: ['./add-history.component.css']
})
export class AddHistoryComponent implements OnInit {

  addHistorysForm: FormGroup;
  gameForm: FormGroup;
  itemhistoryForm: FormGroup;
  message: String = '';
  gameList: any[] = [];
  gameItemhistorylist: any[] = [];
  date : Date;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _userservice: UserService,
    private datepipe:DatePipe) {
    this.gameList = [];
    this.gameItemhistorylist = [];
  }

  ngOnInit(): void {
    this.createHistorysForm();
    // this.createGameForm();
    this.getGame();
    this.createItemhistoryForm();
  }

  get itemshistory(): FormArray {
    return this.addHistorysForm.get("itemshistory") as FormArray
  }

  // myFunction(){
  //   this.date=new Date();
  //   let latest_date =this.datepipe.transform(this.date, 'YYYY-MM-DD');
  //  }

  createFormArr() {
    (this.addHistorysForm.get('itemshistory') as FormArray).clear();
    this.gameItemhistorylist.forEach(item => {
      let { id, itemshistory, place, date, details } = item;
      (this.addHistorysForm.get('itemshistory') as FormArray).push(this._fb.group({
        itemhistoryId: id,
        name: itemshistory,
        place: place,
        date: date,
        details:details
      }))
    })
  }

  createItemhistoryForm() {
    this.itemhistoryForm = this._fb.group({
      gameId: [''],
      itemshistory: ['', [Validators.required]]
    })
  }


  
  createHistorysForm() {
    this.addHistorysForm = this._fb.group({
      addgameId: [''],
      itemshistory: this._fb.array([]),
    })
  }



  onSubmit() {
    console.log(this.addHistorysForm.getRawValue());
    this.UpdatehistorysValue();
  }

  UpdatehistorysValue() {
    let formValue=this.addHistorysForm.getRawValue();
    console.log(formValue);
    this._userservice.updateHistorysitemhistory(formValue).subscribe(data => {
      console.log('submitted:::', data);
      alert("Data updated successfully !!");
      // this._router.navigate(['add-history']);
    }, error => {
      console.error(error);
    })
  };

  getGame() {
    this._userservice.getGame().subscribe((data: any[]) => {
      this.gameList = data;
    })
  }

  onChangeGame(event) {
    this.getGameitemhistory(event.target.value)
  }

  getGameitemhistory(gameId) {
    this._userservice.getGameitemhistory(gameId).subscribe((data: any[]) => {
      this.gameItemhistorylist = data;
      this.createFormArr();
    })
  }

  submitItemhistory() {
    let formValue = this.itemhistoryForm.getRawValue();
    this._userservice.addItemhistory(formValue).subscribe(data => {
      this.message = 'Item history submitted successfully'
      this.itemhistoryForm.reset();
      setTimeout(() => {
        this.message = '';
      }, 2000);
    }, error => {
      console.error(error);
    })
  }
  
  
}