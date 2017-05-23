import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import 'rxjs/Rx';
import { HTTPService } from './http-service';
import {MaterialChipsModule} from 'angular2-material-chips';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdCheckboxModule, MdInputModule, MdGridListModule} from '@angular/material';
import {NgxPaginationModule} from 'ngx-pagination';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialChipsModule,
    HttpModule,
    JsonpModule,
    MdInputModule,
    MdButtonModule,
    MdCheckboxModule,
    MdGridListModule,
    NgxPaginationModule,
    NguiAutoCompleteModule
  ],
  providers: [HTTPService],
  bootstrap: [AppComponent]
})
export class AppModule { }