import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps'; 

@Component({
  selector: 'app-mapdetail',
  templateUrl: './mapdetail.component.html',
  styleUrls: ['./mapdetail.component.css']
})
export class MapdetailComponent implements OnInit {
  
  public lat: number = 30.704649;
  public lng: number = 76.717873;
  public zoom: number;
  private appid: string ="b03ac95cbab8aff86a736ae5f64ebda4";
  weather:any;
  temprature:any;
  city:string;
  
  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private http:Http
  ) { }
  
  ngOnInit() {

    //set google maps defaults
    this.zoom = 4;
    this.lat = 39.8282;
    this.lng = -98.5795;

    //set current position
    this.setCurrentPosition();   
   
    //load Places Autocomplete
    
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
}
