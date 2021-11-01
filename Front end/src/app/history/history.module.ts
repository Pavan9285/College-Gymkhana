import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistorypageComponent } from './historypage/historypage.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { AddHistoryComponent } from './add-history/add-history.component';

const routes: Routes = [
  {
    path: '',
    component: HistorypageComponent
  },
  {
    path: 'add-history',
    component: AddHistoryComponent
  }
]

@NgModule({
  declarations: [HistorypageComponent, AddHistoryComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    RouterModule.forChild(routes),
  ]
})
export class HistoryModule { }
