import { Component, OnInit, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "calender-forecast",
  templateUrl: "./calender-forecast.component.html",
  styleUrls: ["./calender-forecast.component.css"]
})
export class CalenderForecastComponent implements OnInit {
  @Input() weatherData: Array<Object>;

  constructor() {}

  ngOnInit() {}

  // returned the location of a weather data object
  getLocation(index, weather) {
    return weather.location;
  }

  // remove location card by index
  removeWeatherCard(index) {
    this.weatherData.splice(index, 1);
  }
}
