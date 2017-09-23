import { NavigationStart, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterNavigarionChange = false;

  constructor( private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigarionChange) {
          this.keepAfterNavigarionChange = false;
        } else {
          this.subject.next();
        }
      }
    });
  }

  success(message: string, keepAfterNavigarionChange= false) {
    this.keepAfterNavigarionChange = keepAfterNavigarionChange;
    this.subject.next({type: 'success', text: message});
  }

  error(message: string, keepAfterNavigarionChange= false) {
    this.keepAfterNavigarionChange = keepAfterNavigarionChange;
    this.subject.next({type: 'error', text: message});
  }

  getMessage(): Observable <any> {
    return this.subject.asObservable();
  }

}
