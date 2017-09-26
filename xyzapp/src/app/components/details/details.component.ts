import { Http } from '@angular/http';
import { WeatherService } from '../../services/weather.service';

import { User } from '../../models/index';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  
  private lat:number;
  private lng:number;
  currentUser: User;
  private weather:{}={};
  private temp:number;
  private humidity:number;
  private cloud:number;
  private wind:number;
  private sky:number;

  constructor(private weatherService:WeatherService, private http:Http) {

    this.location();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
 
  ngOnInit() { 
      
  }
  location(){
    if ("geolocation" in navigator) {
     navigator.geolocation.getCurrentPosition((position)=> {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.weatherService.getWeather(this.lat,this.lng)
          .subscribe(data =>{
            
            this.weather= data;
            let kelvin = data.main.temp;
            let c= Math.ceil(kelvin - 273.15);
            this.temp = c;
            this.humidity = data.main.humidity;
            this.cloud = data.clouds.all;
            this.wind = data.wind.speed;
            this.sky = data.weather[0].description;
            
          })
      });
    }
  }
}
