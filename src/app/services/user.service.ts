import { Router } from '@angular/router';
import { User } from '../models';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
  private baseUrl= 'http://localhost:3000';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http, private router: Router) {  }

  getUsers() {
    return this.http.get(`${this.baseUrl}/users`)
      .map((response:Response) => response.json());
  }
  // add new employe
  addUser(user:User) {
    
   return this.http.post(`${this.baseUrl}/users/add`, user)
     .map(data => data.json());
  }

  delete(id: string) {
    
    let url = `${this.baseUrl}/users/delete/${id}`;
    return this.http.delete(url);
  }
  update(user: User, id:string ){ 
    let url = `${this.baseUrl}/users/edit/${id}`;
    // console.log(data);
    return this.http.put(url, user)
      .map(data => data.json());;
      
  }

  private handleError(error: any): Promise<any> {
    console.error('error while getting Users', error);

    return Promise.reject(error.messaeg || error);
  }
}
