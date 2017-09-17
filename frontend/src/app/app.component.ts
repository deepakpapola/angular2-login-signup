import { AuthenticationService } from './services/authentication.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  
  subscription: Subscription;
  constructor( private authService: AuthenticationService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}
