import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackpageComponent } from './feedbackpage/feedbackpage.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';

const routes: Routes = [
  {
    path: '',
    component: FeedbackpageComponent
  }
]

@NgModule({
  declarations: [FeedbackpageComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    RouterModule.forChild(routes),
  ]
})
export class FeedbackModule { }
