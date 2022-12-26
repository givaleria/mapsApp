import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as mapboxgl from "mapbox-gl";


@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
    .map-container {
      width: 100%;
      height: 100%;
    }

    .row {
      background-color: black;
      color: white;
      border-radius: 5px;
      bottom: 50px;
      left: 50px;
      padding: 10px;
      position: fixed;
      z-index: 999;
      width: 400px;
    }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map') divMap!: ElementRef;
  map!: mapboxgl.Map;
  zoomLevel: number = 14;
  center: [number, number] = [-0.3504243329294857, 39.455045841395346];

  constructor() { }

  ngOnDestroy(): void {
    this.map.off('zoom', () => {});
    this.map.off('zoomend', () => {});
    this.map.off('move', () => {});
  }

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    this.map.on('zoom', (ev) => {
      this.zoomLevel = this.map.getZoom();
    })

    this.map.on('zoomend', (ev) => {
      if (this.map.getZoom() > 18) {
        this.map.zoomTo(18);
      }
    })

    this.map.on('move', (event) => {
      const target = event.target;
      const {lng, lat} = target.getCenter();

      this.center = [lng, lat];

    })
  }

  zoomOut() {
    this.map.zoomOut();

    this.zoomLevel = this.map.getZoom();
  }

  zoomIn() {
    this.map.zoomIn();

    this.zoomLevel = this.map.getZoom();
  }

  zoomChange( value: string) {
    this.map.zoomTo(Number(value));
  }
}
