import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WeatherService {
  
  constructor(private http:Http) { }

  getWeather(lat,lng){ 
    
    let url = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lng+"&APPID=b03ac95cbab8aff86a736ae5f64ebda4";
   return this.http.get(url)
       .map((data:Response) => data.json())        
  }
}
