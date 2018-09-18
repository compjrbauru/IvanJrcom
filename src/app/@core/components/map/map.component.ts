import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Geocoder from 'ol-geocoder';
import TileLayer from 'ol/layer/Tile';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import View from 'ol/View';

import { config } from '../../../config/config';

@Component({
  selector: 'ngx-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Output()
  mapEmitter = new EventEmitter<any>();
  geocoder: any;
  map: any;
  constructor() {}

  ngOnInit() {
    this.geocoder = new Geocoder('nominatim', {
      provider: 'bing',
      key: config.bing.key,
      lang: 'pt-br',
      placeholder: 'Pesquisar endereco ...',
      limit: 5,
      debug: false,
      autoComplete: true,
      keepOpen: true,
    });
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          title: 'Global Imagery',
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });
    this.map.addControl(this.geocoder);
    this.geocoder.on('addresschosen', evt => {
      console.log(evt);
      this.mapEmitter.emit({
        local:
          evt.address.original.details.addressLine +
          ', ' +
          evt.address.original.details.locality +
          ' - ' +
          evt.address.original.details.adminDistrict,
        coordenadas: evt.coordinate,
      });
    });
  }

  reset() {
    this.geocoder.getSource().clear();
  }
}
