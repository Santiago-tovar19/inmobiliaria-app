import { TestBed } from '@angular/core/testing';

import { EntityPropertiesService } from './entity-properties.service';

describe('EntityPropertiesService', () => {
	let service: EntityPropertiesService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(EntityPropertiesService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
