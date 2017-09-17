import { LstorageService } from '../services/lstorage.service';
import { Router } from '@angular/router';
import { UserService, AlertService } from '../services/index';
import { Component, ElementRef, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  host: {
    '(document:click)': 'handleClick($event)',
  },
  styleUrls: ['./register.component.css']
})

export class RegisterComponent{

  loading= false;
  model: any = {};
  public query = '';
  public countries = [ "Albania","Andorra","Armenia","Austria","Azerbaijan","Belarus",
                      "Belgium","Bosnia & Herzegovina","Bulgaria","Croatia","Cyprus",
                      "Czech Republic","Denmark","Estonia","Finland","France","Georgia",
                      "Germany","Greece","Hungary","Iceland","Ireland","Italy","Kosovo",
                      "Latvia","Liechtenstein","Lithuania","Luxembourg","Macedonia","Malta",
                      "Moldova","Monaco","Montenegro","Netherlands","Norway","Poland",
                      "Portugal","Romania","Russia","San Marino","Serbia","Slovakia","Slovenia",
                      "Spain","Sweden","Switzerland","Turkey","Ukraine","United Kingdom","Vatican City"];
  public filteredList = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private alertService: AlertService,
    private storage: LstorageService,
    private elementref:ElementRef ) {

      if (storage.get('currentUser')) {
        router.navigate(['']);
      }
    }

  register(){
    // // console.log('cked');
    //   this.loading = true;
    //   this.userService.create(this.model)
    //   .subscribe(data => {
    //     this.alertService.success('Registration successful', true);
    //     this.router.navigate(['/login']);
    //   },
    //   error => {
    //     this.alertService.error('error');
    //     this.loading = false;
    //   })
    }    

    filter() {
        if (this.query !== ""){
            this.filteredList = this.countries.filter(function(el){
                return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        }else{
            this.filteredList = [];
        }
    }
     
    select(item){
        this.query = item;
        this.filteredList = [];
    }

    handleClick(event){
        var clickedComponent = event.target;
        var inside = false;
        do {
            if (clickedComponent === this.elementref.nativeElement) {
                inside = true;
            }
           clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);
         if(!inside){
             this.filteredList = [];
         }
     }
}
