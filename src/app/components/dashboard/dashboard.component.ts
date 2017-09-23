import { LstorageService } from '../../services/lstorage.service';
import { UserService, AlertService } from '../../services/index';
import { User } from '../../models/user';
import { Component, OnInit, ViewChild } from '@angular/core';
// material dsign
import {DataSource} from '@angular/cdk/collections';
import {MdPaginator} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  users: User[]= [];
  editing= false;
  user: User;
  newUser:any = {};
  options: DatePickerOptions;
  
  constructor(private UserService: UserService, private lstore: LstorageService, private alert: AlertService) { 
    this.options = new DatePickerOptions({
      format: 'DD-MM-YYYY' 
    });
  }

  ngOnInit(): void {
    this.getAllUsers();
  }
// this is test
  add(user) { 
    // console.log('add new user func run'); 
    let joindate = user.date.momentObj;
    user.date = joindate;
    this.UserService.addUser(user).subscribe((data) => {
      if( data['success'] == true ) {
        this.alert.success('Successfully added');
        this.getAllUsers();
      } else { // console.log(data['message']);
        this.alert.error(data['message']);
      }
    },
    error => {
      this.alert.error(error);
    })
  }

  delete(id: string) {

    this.UserService.delete(id)
    .subscribe(() => { this.getAllUsers() });
  }

  update(user) { 
    let id= user._id;// console.log(id);
    let joindate = user.date.momentObj;
    user.date = joindate;
    this.UserService.update(user,id).subscribe((data) => {
    
      if( data['success'] == true ) {
        this.alert.success(data['message']);
        this.getAllUsers();
        this.editing = false;
      } else { 
        this.alert.error('cannot update, try again');
      }
  },
  error => {
    this.alert.error(error);
  })

  }

  private getAllUsers() {
    this.UserService.getUsers()
      .subscribe(users => {
        this.users =users;  console.log(users);
      });
  }
  editDiv(item) {
    this.newUser = item;
    this.editing=true;
  }
}
