import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DetallesAsignaturaComponent} from './asignature-details.component';

describe('DetallesAsignaturaComponent', () => {
	let component: DetallesAsignaturaComponent;
	let fixture: ComponentFixture<DetallesAsignaturaComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DetallesAsignaturaComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(DetallesAsignaturaComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
