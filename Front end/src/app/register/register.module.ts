import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterpageComponent } from './registerpage/registerpage.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { HttpClientModule } from '@angular/common/http';
const routes: Routes = [
  { 
    path: '',
    component: RegisterpageComponent
  }
]


@NgModule({
  declarations: [RegisterpageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModuleModule,
    HttpClientModule
  ]
})
export class RegisterModule { }
