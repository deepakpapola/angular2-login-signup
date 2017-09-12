import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-weatherdet',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  
 
  private appid: string ="b03ac95cbab8aff86a736ae5f64ebda4";
  weatherDetail:any;
  temprature:any;
  city:string= "mohali";
  name:string;
  wind:string;
  pressure:string;
  humidity:string;
  cloud:string
  constructor( private http:Http ) { }
  // private url = "http://api.openweathermap.org/data/2.5/weather?lat="+this.lat+"&lon="+this.lng+"&APPID="+this.appid;
    
  ngOnInit() {
     //get weather
    this.weather(this.city);
     
  }
  weather(city) {
  this.getWeather(city)
  .subscribe( data => {
    this.weatherDetail = data;
    let kelvin = data.main.temp;
    let c = Math.ceil(kelvin - 273.15);
    this.temprature = c;
    this.name = data.name;
    this.humidity = data.main.humidity;
    this.cloud = data.clouds.all;
    this.wind = data.wind.speed;
    // console.log(c);
  });
}
  private getWeather(city) {
    if(!city)
      return ;
    let url = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&APPID="+this.appid;
    return  this.http.get(url)
     .map(this.extractData)
     .catch(this.handleError);
   }
 
   private extractData(res: Response) {
     if(res.status < 200 || res.status >= 300) {
         throw new Error('Bad response status: ' + res.status);
     }
     let body = res.json();
     return body || { };
 }
 
 private handleError(error: any) {
     let errMsg = error.message || 'server error';
     console.error(errMsg);
     return Observable.throw(errMsg);
 }
}
