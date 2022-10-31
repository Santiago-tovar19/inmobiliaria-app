import {ComponentFixture, TestBed} from '@angular/core/testing';
import { ManageAsignatureComponent } from './manage-asignature.component';


describe('ManageAsignatureComponent', () => {
	let component: ManageAsignatureComponent;
	let fixture: ComponentFixture<ManageAsignatureComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ManageAsignatureComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ManageAsignatureComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
