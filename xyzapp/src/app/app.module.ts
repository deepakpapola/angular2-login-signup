import { RegisterComponent } from './register/register.component';
import { MapwheatherModule } from './mapwheather/mapwheather.module';
import { LstorageService } from './services/lstorage.service';
import { PagerService } from './services/pager.service';
// for jquery methods
import * as $ from 'jquery';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdCheckboxModule, MaterialModule} from '@angular/material';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './gaurds/index';

import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './components/alert/alert.component';
import { DetailsComponent } from './components/details/details.component';
import { NavigationComponent } from './navigation/navigation.component';
import {NgbModal, NgbModule, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DatePickerModule } from 'ng2-datepicker';
import {
  AlertService,
  AuthenticationService,
  UserService
} from './services/index';

import { DashboardComponent } from './components/dashboard/dashboard.component';

import {ConfirmationPopoverModule} from 'angular-confirmation-popover';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    DetailsComponent,
    NavigationComponent,
    DashboardComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MapwheatherModule,  // map weather module
    MdButtonModule,
    MdCheckboxModule,
    MaterialModule,
    FormsModule,
    DatePickerModule,

    NgbModule.forRoot(),
    HttpModule,
    routing,

    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    })
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    PagerService,
    LstorageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
