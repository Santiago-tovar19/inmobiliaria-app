import {Component, OnInit, OnDestroy, Input, NgZone} from '@angular/core';
import {OlMapComponent} from '../ol-map/ol-map.component';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Icon from 'ol/style/Icon';
import Text from 'ol/style/Text';
import * as Proj from 'ol/proj';
import {Router} from '@angular/router';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';

export const DEFAULT_LAT = -34.603490361131385;
export const DEFAULT_LON = -58.382037891217465;
export const DEFAULT_ANCHOR = [0.5, 1];
export const DEFAULT_ICON = 'https://proyexiot.com/v2/app/assets/images/spotlight-poi2.png';

@Component({
    selector: 'app-ol-map-marker',
    templateUrl: './ol-map-marker.component.html',
    styleUrls: ['./ol-map-marker.component.scss'],
    standalone: true,
})
export class OlMapMarkerComponent implements OnInit, OnDestroy {
	@Input() lat: number = DEFAULT_LAT;
	@Input() lon: number = DEFAULT_LON;
	@Input() icon: string = DEFAULT_ICON;
	@Input() link: string | undefined;
	@Input() title: string = '';
	@Input() anchor: number[] = DEFAULT_ANCHOR;

	@Input() markers!: Array<{
		title: string;
		icon: string;
		lat: number;
		lon: number;
		color: string;
		type: 'locomotora' | 'remolcador';
	}>;

	constructor(private olMap: OlMapComponent, private ngZone: NgZone, private router: Router) {}

	ngOnInit(): void {
		const manyMarkers: any = [];
		let markerUltimate: any;
		let vectorLayer;

		if (this.markers) {
			this.markers.map(markerToAdd => {
				manyMarkers.push(
					new Feature({
						geometry: new Point(Proj.fromLonLat([markerToAdd.lon, markerToAdd.lat])),
					}),
				);

				let icon;
				if (markerToAdd.type === 'locomotora') {
					icon = new Style({
						image: new CircleStyle({
							radius: 5,
							fill: new Fill({color: markerToAdd.color}),
							stroke: new Stroke({color: '#000000', width: 1}),
						}),
						text: new Text({
							text: markerToAdd.title,
							offsetY: 12,
							font: '11px arial',
							fill: new Fill({
								color: 'white',
							}),
							stroke: new Stroke({
								color: 'black',
								width: 4,
							}),
						}),
					});
				} else if (markerToAdd.type === 'remolcador') {
					icon = new Style({
						image: new Icon({
							anchor: this.anchor,
							src: markerToAdd.icon,
						}),
						text: new Text({
							text: markerToAdd.title,
							offsetY: 12,
							font: 'bold 12px arial',
							fill: new Fill({
								color: 'white',
							}),
							stroke: new Stroke({
								color: 'black',
								width: 6,
							}),
						}),
					});
				}
				manyMarkers[manyMarkers.length - 1].setStyle(icon);
			});

			markerUltimate = manyMarkers;

			const vectorSource = new VectorSource({
				features: markerUltimate,
			});

			vectorLayer = new VectorLayer({
				source: vectorSource,
			});

			markerUltimate = markerUltimate;
		} else {
			const marker = new Feature({
				geometry: new Point(Proj.fromLonLat([this.lon, this.lat])),
			});

			const icon = new Style({
				image: new Icon({
					anchor: this.anchor,
					src: this.icon,
				}),
				text: new Text({
					text: this.title,
					offsetY: 12,
					font: 'bold 12px arial',
					fill: new Fill({
						color: 'white',
					}),
					stroke: new Stroke({
						color: 'black',
						width: 6,
					}),
				}),
			});

			marker.setStyle(icon);

			markerUltimate = [marker];

			const vectorSource = new VectorSource({
				features: markerUltimate,
			});

			vectorLayer = new VectorLayer({
				source: vectorSource,
			});

			markerUltimate = marker;
		}
		if (this.olMap.map) {
			this.olMap.setMarker(vectorLayer);

			this.olMap.map.on('pointermove', e => {
				const pixel = this.olMap.map.getEventPixel(e.originalEvent);
				const hit = this.olMap.map.hasFeatureAtPixel(pixel);
				this.olMap.map.getViewport().style.cursor = hit ? 'pointer' : '';
			});

			if (this.link) {
				this.olMap.map.on('click', evt => {
					this.ngZone.runOutsideAngular(() => {
						const feature = this.olMap.map.forEachFeatureAtPixel(evt.pixel, feat => feat);
						// eslint-disable-next-line eqeqeq
						if (feature && feature == markerUltimate) {
							this.router.navigateByUrl(this.link as string);
						}
					});
				});
			}
		} else {
			setTimeout(() => {
				this.ngOnInit();
			}, 10);
		}
	}

	ngOnDestroy(): void {}
}
