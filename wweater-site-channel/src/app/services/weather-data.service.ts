import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

@Injectable()
export class WeatherDataService {
  constructor(private http: Http) {}
  // get req
  getWeatherData(locations) {
    return this.http.post('http://localhost:3000/getWeather?ts=' + Date.now(), locations);
  }

}
