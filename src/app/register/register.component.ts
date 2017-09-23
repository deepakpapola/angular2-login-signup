import { LstorageService } from '../services/lstorage.service';
import { Router } from '@angular/router';
import { UserService, AlertService } from '../services/index';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  loading= false;
  model: any = {};

  constructor(
    private userService: UserService,
    private router: Router,
    private alertService: AlertService,
    private storage: LstorageService ) {

      if (storage.get('currentUser')) {
        router.navigate(['']);
      }
    }

  register(model){
    console.log('restes');
      this.loading = true;
      this.userService.addUser(model)
      .subscribe(data => {
        this.alertService.success('Registration successful', true);
        this.router.navigate(['/login']);
      },
      error => {
        this.alertService.error('error');
        this.loading = false;
      })
    }

  ngOnInit () {

    }
}
