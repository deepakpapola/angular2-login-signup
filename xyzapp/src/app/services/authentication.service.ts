import { Router } from '@angular/router';
import { User } from '../models';
import { Observable, Subject } from 'rxjs/Rx';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
  
  token: string;
  private url ='http://database:3000/api/authenticate';
  private userSource = new Subject<User>();
  user$ = this.userSource.asObservable();
  constructor( private http: Http, private router : Router ) { }
  
  setUser(user:User){
    this.userSource.next(user);
  }
  login(user) {
    return this.http.post(this.url,user)
      .map((res) => this.setToken(res));
  }
  
  logout(): void {
    this.token = null;
    localStorage.removeItem('currentUser');
  }

  Verify():Promise<any> {
    let currUser = JSON.parse(localStorage.getItem('currentUser')); 
    //if(!currUser){ this.router.navigate(['login']) }
    let token = ( currUser && 'token' in currUser) ? currUser.token : this.token;
    let headers = new Headers({ 'x-access-token': token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(`http://database:3000/check-state`, options)
    .toPromise()
    .then(res => {return  res.json()} )
  }

  setToken(res) {
    let body = JSON.parse(res['_body']);
    if( body['success'] == true ){
      this.token = body['token'];
      localStorage.setItem('currentUser', JSON.stringify({ 
        email: body['user']['email'], 
        name:body['user']['name'],
        id:body['user']['id'],
        token: this.token 
      }));
    }
    return body;
  }

  // parseRes(res){
  //   let body = JSON.parse(res['_body']);
  //   return body;
  // }
}
