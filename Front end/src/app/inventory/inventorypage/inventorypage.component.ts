import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { FormArray,FormGroup,FormBuilder} from '@angular/forms';



@Component({
  selector: 'app-inventorypage',
  templateUrl: './inventorypage.component.html',
  styleUrls: ['./inventorypage.component.css']
})
export class InventorypageComponent implements OnInit {

  getInventoryForm: FormGroup;
  gameList: any[] = [];
  gameItemlist: any[] = [];

  constructor(
    private _fb: FormBuilder,
    private _userservice: UserService) {
    this.gameList = [];
    this.gameItemlist = [];
   }

  ngOnInit(): void {
    this.createInventoryForm();
    this.getGame();
  }

  
  get items(): FormArray {
    return this.getInventoryForm.get("items") as FormArray
  }

  createFormArr() {
    (this.getInventoryForm.get('items') as FormArray).clear();
    this.gameItemlist.forEach(item => {
      let { id, items, total_quantity, available_quantity } = item;
      (this.getInventoryForm.get('items') as FormArray).push(this._fb.group({
        itemId: id,
        name: items,
        total_quantity: total_quantity,
        available_quantity: available_quantity
      }))
    })
  }

  getGame() {
    this._userservice.getGame().subscribe((data: any[]) => {
      this.gameList = data;
    })
  }

  onChangeGame(event) {
    this.getGameitem(event.target.value)
  }

  getGameitem(gameId) {
    this._userservice.getGameitem(gameId).subscribe((data: any[]) => {
      this.gameItemlist = data;
      this.createFormArr();
    })
  }

  createInventoryForm() {
    this.getInventoryForm = this._fb.group({
      addgameId: [''],
      items: this._fb.array([]),
    })
  }

}