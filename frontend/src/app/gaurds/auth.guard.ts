import { AuthenticationService } from '../services';
import { LstorageService } from '../services/lstorage.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private storage: LstorageService, private auth :AuthenticationService) {}
 
  canActivate () {
    this.auth.Verify()
    .then(res => {
      if(res.success) {
        return true;
      }else {
        console.log("go to login");
        this.router.navigate(['login']);
      }
    } )
return true;
  }
}
