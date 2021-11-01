import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModuleModule } from './shared-module/shared-module.module';
import { HeaderComponent } from './header/header.component';
import { GetNameByIdPipe } from './get-name-by-id.pipe';
import { DatePipe } from '@angular/common'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GetNameByIdPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModuleModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
