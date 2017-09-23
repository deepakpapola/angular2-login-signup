// import { User } from '../models';
// import { Headers, Http, RequestOptions, Response } from '@angular/http';
// import { Injectable } from '@angular/core';

// @Injectable()
// export class UsaerService {

//   constructor(private http: Http) { }

//   create(user: User){
//     console.log('called');
//     return this.http.post('/api/register', user, this.jwt())
//       .map((response: Response) => response.json());
//   }

//   // private helper method
//   private jwt(){
//     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//     if (currentUser && currentUser.token){
//       const headers = new Headers({'Authentication': 'Bearer' + currentUser.token });
//       return new RequestOptions({ headers: headers});
//     }
//   }
// }
