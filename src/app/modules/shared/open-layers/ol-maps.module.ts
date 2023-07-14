import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OlMapMarkerComponent} from './ol-map-marker/ol-map-marker.component';
import {OlMapComponent} from './ol-map/ol-map.component';
import {MatCardModule} from '@angular/material/card';
import {OlMapRouteComponent} from './ol-map-route/ol-map-route.component';

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        OlMapComponent,
        OlMapMarkerComponent,
        OlMapRouteComponent
    ],
    exports: [
        OlMapComponent,
        OlMapMarkerComponent,
        OlMapRouteComponent
    ],
})
export class OlMapsModule {}
