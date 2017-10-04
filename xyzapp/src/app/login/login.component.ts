import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, AlertService } from '../services/index';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any = {};
  loading= false;
  returnUrl: string;

  constructor( private authService: AuthenticationService,
               private route: ActivatedRoute,
               private router: Router,
               private alertService: AlertService) { }

  ngOnInit() {

    this.authService.logout();

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
   // console.log(this.returnUrl);
  }
  login() {
    this.loading = true; console.log(this.user);
    this.authService.login(this.user)
      .subscribe(data => {  // console.log(data);
        if(data['success'] == true) {
          this.authService.setUser(data['user']);
          this.router.navigate([this.returnUrl]);
        } else {
          this.alertService.error(data['message']);
          this.loading = false;
        }
        
      });
  }
}
