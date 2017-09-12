// import { LstorageService } from '../services/lstorage.service';
// import { Router } from '@angular/router';
// import { UserService, AlertService } from '../services/index';
// import { Component, OnInit } from '@angular/core';


// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })

// export class RegisterComponent implements OnInit {

//   loading= false;
//   model: any = {};

//   constructor(
//     private userService: UserService,
//     private router: Router,
//     private alertService: AlertService,
//     private storage: LstorageService ) {

//       if (storage.get('currentUser')) {
//         router.navigate(['']);
//       }
//     }

//   register(){
//     // console.log('cked');
//       this.loading = true;
//       this.userService.create(this.model)
//       .subscribe(data => {
//         this.alertService.success('Registration successful', true);
//         this.router.navigate(['/login']);
//       },
//       error => {
//         this.alertService.error('error');
//         this.loading = false;
//       })
//     }

//   ngOnInit () {

//     }
// }
