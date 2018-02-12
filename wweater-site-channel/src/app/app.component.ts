import { Component, OnInit } from "@angular/core";
import { WeatherDataService } from "./services/weather-data.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(private service: WeatherDataService) {}

  weatherData: Array<Object> = new Array();

  private DEFAULT_LOCATIONS = ["Tel Aviv, Israel", "Paris, France"];
  private locations: Array<String> = new Array();

  ngOnInit() {
    this.DEFAULT_LOCATIONS.forEach(location => {
      this.onLocationSelected(location);
    });
    this.setRefreshWeatherInterval();
  }

  // Update array of locations
  private updateLocations() {
    this.locations = this.weatherData.map(locationWeather => {
      return locationWeather["location"];
    });
  }
  // Create an interval for fetching new weather data
  private setRefreshWeatherInterval() {
    let self = this;
    setInterval(function() {
      self.service.getWeatherData(self.locations).subscribe(
        response => {
          // locations may have been removed while the response was yet to arrive
          self.updateLocations();
          self.weatherData = response.json().filter(locationWeather => {
            return self.locations.indexOf(locationWeather.location) !== -1;
          });
        },
        reject => {
          console.error("Refresh data error", reject);
        }
      );
    }, 5000);
  }

  //insert new location
  onLocationSelected(location) {
    if (this.locations.indexOf(location) === -1) {
      this.weatherData.push({ location });
      this.weatherData = this.weatherData.slice();
      // update the locations array in order to include the newly added location
      this.updateLocations();
    }
  }
}
