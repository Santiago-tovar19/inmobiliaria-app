import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AsignaturesListComponent} from './asignatures-list.component';

describe('AsignaturesListComponent', () => {
	let component: AsignaturesListComponent;
	let fixture: ComponentFixture<AsignaturesListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AsignaturesListComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AsignaturesListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
