import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.css']
})
export class AddInventoryComponent implements OnInit {

  addInventoryForm: FormGroup;
  gameForm: FormGroup;
  itemForm: FormGroup;
  message: String = '';
  gameList: any[] = [];
  gameItemlist: any[] = [];

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _userservice: UserService) {
    this.gameList = [];
    this.gameItemlist = [];
  }

  ngOnInit(): void {
    this.createInventoryForm();
    this.createGameForm();
    this.getGame();
    this.createItemForm();
  }

  get items(): FormArray {
    return this.addInventoryForm.get("items") as FormArray
  }

  createFormArr() {
    (this.addInventoryForm.get('items') as FormArray).clear();
    this.gameItemlist.forEach(item => {
      let { id, items, total_quantity, available_quantity } = item;
      (this.addInventoryForm.get('items') as FormArray).push(this._fb.group({
        itemId: id,
        name: items,
        total_quantity: total_quantity,
        available_quantity: available_quantity
      }))
    })
  }

  createGameForm() {
    this.gameForm = this._fb.group({
      game: ['', [Validators.required]]
    })
  }


  createItemForm() {
    this.itemForm = this._fb.group({
      gameId: [''],
      item: ['', [Validators.required]]
    })
  }

  
  createInventoryForm() {
    this.addInventoryForm = this._fb.group({
      addgameId: [''],
      items: this._fb.array([]),
    })
  }



  onSubmit() {
    console.log(this.addInventoryForm.getRawValue());
    this.UpdateinventoryValue();
  }

  UpdateinventoryValue() {
    this._userservice.updateInventoryitem(this.addInventoryForm.getRawValue()).subscribe(data => {
      console.log('submitted:::', data);
      alert("Data updated successfully !!");
      // this._router.navigate(['addinventory']);
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
    this.getGameitem(event.target.value)
  }

  getGameitem(gameId) {
    this._userservice.getGameitem(gameId).subscribe((data: any[]) => {
      this.gameItemlist = data;
      this.createFormArr();
    })
  }




  submitGame() {
    let formValue = this.gameForm.getRawValue();
    this._userservice.addGame(formValue).subscribe(data => {
      this.message = 'Game submitted successfully'
      this.gameForm.reset();
      setTimeout(() => {
        this.message = '';
      }, 2000);
    }, error => {
      console.error(error);
    })
  }

  submitItem() {
    let formValue = this.itemForm.getRawValue();
    this._userservice.addItem(formValue).subscribe(data => {
      this.message = 'Item submitted successfully'
      this.itemForm.reset();
      setTimeout(() => {
        this.message = '';
      }, 2000);
    }, error => {
      console.error(error);
    })
  }
  
}