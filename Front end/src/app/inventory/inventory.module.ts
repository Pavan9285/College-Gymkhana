import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventorypageComponent } from './inventorypage/inventorypage.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { AddInventoryComponent } from './add-inventory/add-inventory.component';

const routes: Routes = [
  {
    path: '',
    component: InventorypageComponent
  },
  {
    path:'add-inventory',
    component:AddInventoryComponent
  }
]

@NgModule({
  declarations: [InventorypageComponent, AddInventoryComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    RouterModule.forChild(routes),
  ]
})
export class InventoryModule { }
