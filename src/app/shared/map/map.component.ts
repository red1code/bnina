import { Component, ElementRef, OnInit, ViewChild, Input, AfterViewInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges, AfterViewInit {

  @ViewChild('pacInput') input!: ElementRef<HTMLInputElement>;
  @ViewChild('map') mapContainer!: ElementRef<HTMLElement>;
  marker: google.maps.Marker | null = null;
  @Input() center!: google.maps.LatLngLiteral | undefined | null;
  @Input() showInputSearchLocation!: boolean;
  @Output() positionChanged = new EventEmitter<google.maps.LatLngLiteral>();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['center'] && this.mapContainer?.nativeElement) {
      this.initMap();
    }
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  async initMap() {
    if (!this.center) return;
    const map = new google.maps.Map(this.mapContainer.nativeElement, {
      center: this.center /*?? { lat: 28, lng: 2 }*/,
      zoom: 14,
    });

    // map.setCenter(this.center);

    this.marker = new google.maps.Marker({ map });
    this.marker.setPosition(this.center);

    if (this.showInputSearchLocation) {
      const autocomplete = new google.maps.places.Autocomplete(this.input.nativeElement, {
        fields: ["place_id", "geometry", "formatted_address", "name"],
      });

      autocomplete.bindTo("bounds", map);

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.geometry?.location) {
          return;
        }
        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        }
        else {
          map.setCenter(place.geometry.location);
        }
        const position = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        }
        this.marker?.setPosition(position);
        this.input.nativeElement.value = '';
        this.positionChanged.emit(position);
      });
    }

    map.addListener('center_changed', () => {
      const usrPosition: google.maps.LatLngLiteral = {
        lat: map.getCenter()?.lat() as number,
        lng: map.getCenter()?.lng() as number
      };
    });
    // this.addMarker(this.center ?? COORDINATES.DEFAULT, this.map);
  }

}
