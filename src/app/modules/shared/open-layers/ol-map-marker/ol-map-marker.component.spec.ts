import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { OlMapComponent } from '../ol-map/ol-map.component';

import { OlMapMarkerComponent } from './ol-map-marker.component';

describe('OlMapMarkerComponent', () => {
	let component: OlMapMarkerComponent;
	let fixture: ComponentFixture<OlMapMarkerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
    imports: [
        RouterTestingModule,
        OlMapMarkerComponent,
        OlMapComponent,
        OlMapMarkerComponent
    ],
    providers: [
        { provide: OlMapComponent, useClass: OlMapComponent }
    ]
})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(OlMapMarkerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
