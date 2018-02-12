import {Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, NgZone} from "@angular/core";
import { MapsAPILoader } from "@agm/core";
import {} from "@types/googlemaps";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  @Output() cityChanged: EventEmitter<any>;
  @ViewChild("search") public searchElement: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {
    this.cityChanged = new EventEmitter<any>();
  }

  ngOnInit() {
    // Init google maps API
    this.mapsAPILoader.load().then(() => {
      // Attach an auto-complete component to the search input
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElement.nativeElement,
        { types: ["(cities)"] }
      );
      // listen on selection changed events
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          // get auto-complete place query results
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place && place.formatted_address) {
            // Output to app.component
            this.cityChanged.emit(place.formatted_address);
          }
          // empty search input value
          this.searchElement.nativeElement.value = "";
        });
      });
    });
  }
}
