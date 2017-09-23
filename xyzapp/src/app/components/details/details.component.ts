import { User } from '../../models/index';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  currentUser: User;
  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
   // console.log(this.currentUser);
  }

  ngOnInit() {
  }

}
