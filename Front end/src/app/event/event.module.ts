import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventpageComponent } from './eventpage/eventpage.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { AddEventComponent } from './add-event/add-event.component';

const routes: Routes = [
  {
    path: '',
    component: EventpageComponent
  },
  {
    path:'add-event',
    component:AddEventComponent
  }
]

@NgModule({
  declarations: [EventpageComponent, AddEventComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    RouterModule.forChild(routes),
  ]
})
export class EventModule { }
