import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { FormArray,FormGroup,FormBuilder} from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-historypage',
  templateUrl: './historypage.component.html',
  styleUrls: ['./historypage.component.css']
})
export class HistorypageComponent implements OnInit {

  getHistorysForm: FormGroup;
  gameList: any[] = [];
  gameItemhistorylist: any[] = [];

  constructor(
    private _fb: FormBuilder,
    private _userservice: UserService,
    private datepipe:DatePipe) {
    this.gameList = [];
    this.gameItemhistorylist = [];
   }

  ngOnInit(): void {
    this.createHistorysForm();
    this.getGame();
  }

  
  get itemshistory(): FormArray {
    return this.getHistorysForm.get("itemshistory") as FormArray
  }

  createFormArr() {
    (this.getHistorysForm.get('itemshistory') as FormArray).clear();
    this.gameItemhistorylist.forEach(item => {
      let { id, itemshistory, place, date, details } = item;
      let formatedDate=this.datepipe.transform(date,'dd-MMM-yyyy');
      (this.getHistorysForm.get('itemshistory') as FormArray).push(this._fb.group({
        itemhistoryId: id,
        name: itemshistory,
        place: place,
        date: formatedDate,
        details:details
      }))
    })
  }

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

  createHistorysForm() {
    this.getHistorysForm = this._fb.group({
      addgameId: [''],
      itemshistory: this._fb.array([]),
    })
  }

}