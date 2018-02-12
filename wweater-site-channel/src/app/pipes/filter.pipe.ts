// Sotring all the location cards



import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'sortAsc'
})
export class FilterPipe implements PipeTransform {
  transform(locationsWeather: Array<Object>) {
    if (!locationsWeather.sort){
      return;
    }
    return locationsWeather.sort(function(a, b) {
      let locationA = a['location'].toLowerCase().replace(' ', ''),
        locationB = b['location'].toLowerCase().replace(' ', '');
      if (locationA < locationB) {
        // sort string ascending
        return -1;
      }
      if (locationA > locationB) {
        return 1;
      }
      return 0;
    });
  }
}
