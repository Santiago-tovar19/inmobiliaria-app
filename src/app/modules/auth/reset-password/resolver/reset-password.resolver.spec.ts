import {TestBed} from '@angular/core/testing';
import {AuthService} from 'app/core/auth/auth.service';
import {ResetPasswordResolver} from './reset-password.resolver';
import {Router} from '@angular/router';

const authServiceSpy = jasmine.createSpyObj('AuthService', ['checkPasswordResetToken']);
const routerMock = {
	navigateByUrl: jasmine.createSpy('navigateByUrl'),
};

describe('ResetPasswordResolver', () => {
	let resolver: ResetPasswordResolver;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{provide: AuthService, useValue: authServiceSpy},
				{provide: Router, useValue: routerMock},
			],
		});
		resolver = TestBed.inject(ResetPasswordResolver);
	});

	it('should be created', () => {
		expect(resolver).toBeTruthy();
	});
});
