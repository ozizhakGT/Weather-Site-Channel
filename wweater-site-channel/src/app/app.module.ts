import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { WeatherDataService } from './services/weather-data.service';
import { FilterPipe } from './pipes/filter.pipe';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CalenderForecastComponent } from './components/calender-forecast/calender-forecast.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CalenderForecastComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDHOshfGekYXoz2ZlLNORJnIhkNjevJRFc',
      libraries: ['places'],
      language: 'en'
    })
  ],
  providers: [WeatherDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
