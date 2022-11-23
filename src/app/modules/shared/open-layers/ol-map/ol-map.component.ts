import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import {OSM} from 'ol/source'
import * as Proj from 'ol/proj'
import Control from 'ol/control/Control'
import {defaults as defaultControls} from 'ol/control'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Feature } from 'ol'
import { Point } from 'ol/geom'
import { Style, Icon } from 'ol/style'
export const DEFAULT_HEIGHT = '300px'
export const DEFAULT_WIDTH = '100%'

export const DEFAULT_LAT = -34.603490361131385
export const DEFAULT_LON = -58.382037891217465

@Component({
	selector: 'app-ol-map',
	templateUrl: './ol-map.component.html',
	styleUrls: ['./ol-map.component.scss'],
})
export class OlMapComponent implements OnInit, OnChanges, AfterViewInit {
	@Input() lat: number = DEFAULT_LAT
	@Input() lon: number = DEFAULT_LON
	@Input() zoom!: number
	@Input() width: string | number = DEFAULT_WIDTH
	@Input() height: string | number = DEFAULT_HEIGHT
	@Input() title: string = 'Monitoreo'
	@Input() coordinatesToCenter: any
	@Output() coordinates = new EventEmitter<[number, number]>();

	target: string = 'map-' + Math.random().toString(36).substring(2)
	map!: Map

	private mapEl!: HTMLElement

	constructor(private elementRef: ElementRef) {}

	ngOnInit(): void {}

	ngOnChanges(): void {
		if (this.map) {
			this.map.getView().setCenter(Proj.transform(this.coordinatesToCenter, 'EPSG:4326', 'EPSG:3857'))
			this.map.getView().setZoom(15)
		}
	}

	ngAfterViewInit(): void {
		this.mapEl = this.elementRef.nativeElement.querySelector('#' + this.target)
		this.setSize()

		this.map = new Map({
			target: this.target,
			layers: [
				new TileLayer({
					source: new OSM(),
				}),
			],
			view: new View({
				center: Proj.fromLonLat([this.lon, this.lat]),
				zoom: this.zoom,
			}),
			controls: defaultControls({attribution: false, zoom: true}).extend([]),
		});

		this.map.on('click', (evt: any) => {
			// Remove all markers
			this.map.getLayers().forEach((layer: any) => {
				if (layer instanceof VectorLayer) {
					layer.getSource().clear()
				}
			})

			// Set marker
			this.setMarker(new VectorLayer({
				source: new VectorSource({
					features: [new Feature({
						geometry: new Point(evt.coordinate),
					})],
				}),
				style: new Style({
					image: new Icon({
						anchor: [0.5, 1],
						src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Google_Maps_pin.svg/30px-Google_Maps_pin.svg.png',
						// Set the size of the icon
						// size: [30, 30],
					}),
				}),
			}))

			// this.coordinates.emit(evt.coordinate);
			const coords = Proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326')
			this.coordinates.emit(coords as any);
		});
	}

	public setMarker(vector: any): void {
		this.map.addLayer(vector)
	}

	public setControl(control: Control): void {
		this.map.addControl(control)
	}

	private setSize(): void {
		if (this.mapEl) {
			const styles = this.mapEl.style
			styles.height = coerceCssPixelValue(this.height) || DEFAULT_HEIGHT
			styles.width = coerceCssPixelValue(this.width) || DEFAULT_WIDTH
		}
	}
}

const cssUnitsPattern = /([A-Za-z%]+)$/

const coerceCssPixelValue = (value: any): string => {
	if (value == null) {
		return ''
	}
	return cssUnitsPattern.test(value) ? value : `${value}px`
}
