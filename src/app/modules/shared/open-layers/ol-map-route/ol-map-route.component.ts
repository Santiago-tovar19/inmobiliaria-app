import {Component, OnInit, OnDestroy, Input, NgZone} from '@angular/core';
import {OlMapComponent} from '../ol-map/ol-map.component';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import LineString from 'ol/geom/LineString';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import {Router} from '@angular/router';

export const DEFAULT_LAT = -34.603490361131385;
export const DEFAULT_LON = -58.382037891217465;
export const DEFAULT_ANCHOR = [0.5, 1];
export const DEFAULT_ICON = 'https://proyexiot.com/v2/app/assets/images/spotlight-poi2.png';

@Component({
    selector: 'app-ol-map-route',
    templateUrl: './ol-map-route.component.html',
    styleUrls: ['./ol-map-route.component.scss'],
    standalone: true,
})
export class OlMapRouteComponent implements OnInit, OnDestroy {
	@Input() lat: number = DEFAULT_LAT;
	@Input() lon: number = DEFAULT_LON;
	@Input() icon: string = DEFAULT_ICON;
	@Input() coords: Array<Array<number>> = [
		[-70.62236551782559, -33.41170161440925],
		[-71.62049865722656, -33.039913177490234],
	];
	@Input() link: string | undefined;
	@Input() title: string = '';
	@Input() anchor: number[] = DEFAULT_ANCHOR;

	constructor(private olMap: OlMapComponent, private ngZone: NgZone, private router: Router) {}

	ngOnInit(): void {
		const lineString = new LineString(this.coords);

		lineString.transform('EPSG:4326', 'EPSG:3857');

		// create the feature
		const feature = new Feature({
			geometry: lineString,
			name: 'Line',
		});

		const lineStyle = new Style({
			stroke: new Stroke({
				color: '#353a48',
				width: 5,
			}),
		});

		const source = new VectorSource({
			features: [feature],
		});
		const vector = new VectorLayer({
			source: source,
			style: [lineStyle],
		});

		if (this.olMap.map) {
			this.olMap.map.addLayer(vector);
		} else {
			setTimeout(() => {
				this.ngOnInit();
			}, 10);
		}
	}

	ngOnDestroy(): void {}
}
