import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimetablepageComponent } from './timetablepage/timetablepage.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { Routes, RouterModule } from '@angular/router';
import { AddTimetableComponent } from './add-timetable/add-timetable.component';

const routes: Routes = [
  {
    path: '',
    component: TimetablepageComponent
  },
  {
    path:'add-timetable',
    component:AddTimetableComponent
  }
]


@NgModule({
  declarations: [TimetablepageComponent, AddTimetableComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    RouterModule.forChild(routes),
  ]
})
export class TimetableModule { }
