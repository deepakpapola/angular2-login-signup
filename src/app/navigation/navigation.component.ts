import { LstorageService } from '../services/lstorage.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  // loggedIn= false;
  constructor(private storage: LstorageService) { }


}
