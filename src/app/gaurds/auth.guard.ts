import { LstorageService } from '../services/lstorage.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private storage: LstorageService) {}
  canActivate () {
    if (this.storage.get('currentUser')) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
