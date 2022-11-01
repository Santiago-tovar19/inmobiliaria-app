import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormBuilder} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatIconTestingModule} from '@angular/material/icon/testing';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {FuseAlertModule} from '@fuse/components/alert';
import {FuseCardModule} from '@fuse/components/card';
import {AuthService} from 'app/core/auth/auth.service';
import {SharedModule} from 'app/shared/shared.module';
import {of, throwError} from 'rxjs';
import {AuthSignInComponent} from '../sign-in/sign-in.component';

import {AuthResetPasswordComponent} from './reset-password.component';
import {authResetPasswordRoutes} from './reset-password.routing';

const authServiceSpy = jasmine.createSpyObj('AuthService', ['resetPassword']);
const activateRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['snapshot']);

describe('AuthResetPasswordComponent Isolated Test', () => {
	let component: AuthResetPasswordComponent;
	let fixture: ComponentFixture<AuthResetPasswordComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AuthResetPasswordComponent, MatIcon],
			imports: [
				BrowserAnimationsModule,
				MatIconTestingModule,
				RouterTestingModule.withRoutes([{path: 'ingresar', component: AuthSignInComponent}]),
				MatButtonModule,
				MatFormFieldModule,
				MatIconModule,
				MatInputModule,
				MatProgressSpinnerModule,
				FuseCardModule,
				FuseAlertModule,
				SharedModule,
			],
			providers: [
				FormBuilder,
				{provide: AuthService, useValue: authServiceSpy},
				// {provide: ActivatedRoute, useValue: activateRouteSpy},
				{
					provide: ActivatedRoute,
					useValue: {
						snapshot: {
							queryParams: {token: '1234567890', email: 'andresjosehr@gmail.com'},
						},
					},
				},
			],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AuthResetPasswordComponent);
		component = fixture.componentInstance;
		component.ngOnInit();
		fixture.detectChanges();
	});

	afterEach(() => {
		fixture.destroy();
	});

	it('El componente debe ser creado', () => {
		expect(component).toBeTruthy();
	});

	it('Verificacion de estado inicial del componente', () => {
		expect(component.alert.message).toBe('');
		expect(component.resetPasswordForm.invalid).toBeTruthy();
		expect(component.showAlert).toBeFalsy();
		expect(component.token).toBe('1234567890');
		expect(component.email).toBe('andresjosehr@gmail.com');
	});

	it('submitted debe estar en true cuando se ejecuta resetPassword()', () => {
		authServiceSpy.resetPassword.and.returnValue(of({message: 'Correo enviado'}));
		component.resetPasswordForm.get('password').setValue('123456789');
		component.resetPasswordForm.get('password_confirmation').setValue('123456789');

		component.resetPassword();
		fixture.detectChanges();

		expect(component.submitted).toBeTruthy();
		expect(component.alert.type).toBe('success');
	});

	it('El formulario debe ser invalido si hay algun error', () => {
		component.resetPassword();
		fixture.detectChanges();

		expect(component.resetPasswordForm.invalid).toBeTruthy();

		component.resetPasswordForm.get('password').setValue('123456789');
		component.resetPasswordForm.get('password_confirmation').setValue('987654321');
		component.resetPassword();
		fixture.detectChanges();

		expect(component.resetPasswordForm.invalid).toBeTruthy();
	});

});

describe('AuthResetPasswordComponent Shallow Test', () => {
	let component: AuthResetPasswordComponent;
	let fixture: ComponentFixture<AuthResetPasswordComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AuthResetPasswordComponent, MatIcon],
			imports: [
				BrowserAnimationsModule,
				RouterTestingModule.withRoutes([{path: 'ingresar', component: AuthSignInComponent}]),
				MatButtonModule,
				MatIconTestingModule,
				MatFormFieldModule,
				MatIconModule,
				MatInputModule,
				MatProgressSpinnerModule,
				FuseCardModule,
				FuseAlertModule,
				SharedModule,
			],
			providers: [
				FormBuilder,
				{provide: AuthService, useValue: authServiceSpy},
				// {provide: ActivatedRoute, useValue: activateRouteSpy},
				{
					provide: ActivatedRoute,
					useValue: {
						snapshot: {
							queryParams: {token: '1234567890', email: 'andresjosehr@gmail.com'},
						},
					},
				},
			],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AuthResetPasswordComponent);
		component = fixture.componentInstance;
		component.ngOnInit();
		fixture.detectChanges();
	});

	afterEach(() => {
		fixture.destroy();
	});

	it('Verificacion del estado inicial del formulario HTML', () => {
		const password = fixture.debugElement.nativeElement.querySelector('#password');
		const passwordConfirmation = fixture.debugElement.nativeElement.querySelector('#password-confirmation');
		const btn = fixture.debugElement.nativeElement.querySelector('#submit-btn');

		expect(password).toBeTruthy();
		expect(passwordConfirmation).toBeTruthy();
		expect(btn).toBeTruthy();
	});

	it('Verificacion de la funcion resetPassword en authService', () => {
		authServiceSpy.resetPassword.and.returnValue(of({message: 'Error en el formulario'}));
		component.resetPasswordForm.get('password').setValue('12345678');
		component.resetPasswordForm.get('password_confirmation').setValue('12345678');
		const btn = fixture.debugElement.nativeElement.querySelector('#submit-btn');
		btn.click();
		fixture.detectChanges();
		expect(authServiceSpy.resetPassword).toHaveBeenCalled();
	});

	it('Verificacion de comportamiento de boton de ver contraseña en cada campo', () => {
		const btnShowPassword = fixture.debugElement.nativeElement.querySelector('#show-password-btn');
		btnShowPassword.click();
		fixture.detectChanges();
		const passwordField = fixture.debugElement.nativeElement.querySelector('#password');
		expect(passwordField.type).toBe('text');

		const btnHidePassword = fixture.debugElement.nativeElement.querySelector('#hide-password-btn');
		btnHidePassword.click();
		fixture.detectChanges();
		expect(passwordField.type).toBe('password');


		const btnShowPasswordConfirmation = fixture.debugElement.nativeElement.querySelector('#show-password-confirmation-btn');
		btnShowPasswordConfirmation.click();
		fixture.detectChanges();
		const passwordConfirmationField = fixture.debugElement.nativeElement.querySelector('#password-confirmation');
		expect(passwordConfirmationField.type).toBe('text');

		const btnHidePasswordConfirmation = fixture.debugElement.nativeElement.querySelector('#hide-password-confirmation-btn');
		btnHidePasswordConfirmation.click();
		fixture.detectChanges();
		expect(passwordConfirmationField.type).toBe('password');
	});

	it('Si el campo de contraseña es invalido, debería mostrar mat-error y mostrar el campo en rojo', () => {
		const password             = fixture.debugElement.nativeElement.querySelector('#password');
		const passwordConfirmation = fixture.debugElement.nativeElement.querySelector('#password-confirmation');
		const btn                  = fixture.debugElement.nativeElement.querySelector('#submit-btn');

		btn.click();
		fixture.detectChanges();

		expect(password.classList.contains('ng-invalid')).toBeTruthy();
		expect(passwordConfirmation.classList.contains('ng-invalid')).toBeTruthy();

		const passwordError = fixture.debugElement.nativeElement.querySelector('#required-password-error');
		const passwordConfirmationError = fixture.debugElement.nativeElement.querySelector('#required-password-confirmation-error');

		expect(passwordError).toBeTruthy();
		expect(passwordConfirmationError).toBeTruthy();
		expect(passwordError.innerText).toBe('Este campo es obligatorio');
		expect(passwordConfirmationError.innerText).toBe('Este campo es obligatorio');

		component.resetPasswordForm.get('password').setValue('12345678');
		component.resetPasswordForm.get('password_confirmation').setValue('87654321');

		btn.click();
		fixture.detectChanges();

		const passwordMustMatchError = fixture.debugElement.nativeElement.querySelector('#must-match-password-error');

		expect(passwordConfirmation.classList.contains('ng-invalid')).toBeTruthy();
		expect(passwordMustMatchError).toBeTruthy();
		expect(passwordMustMatchError.innerText).toBe('Las contraseñas no coinciden');


	});

});

describe('AuthResetPasswordComponent Integrated Test', () => {
	let component: AuthResetPasswordComponent;
	let fixture: ComponentFixture<AuthResetPasswordComponent>;
	let router: Router;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AuthResetPasswordComponent, MatIcon],
			imports: [
				BrowserAnimationsModule,
				RouterTestingModule.withRoutes([{path: 'ingresar', component: AuthSignInComponent}]),
				MatIconTestingModule,
				MatButtonModule,
				MatFormFieldModule,
				MatIconModule,
				MatInputModule,
				MatProgressSpinnerModule,
				FuseCardModule,
				FuseAlertModule,
				SharedModule,
			],
			providers: [
				FormBuilder,
				{provide: AuthService, useValue: authServiceSpy},
				// {provide: ActivatedRoute, useValue: activateRouteSpy},
				{
					provide: ActivatedRoute,
					useValue: {
						snapshot: {
							queryParams: {token: '1234567890', email: 'andresjosehr@gmail.com'},
						},
					},
				},
			],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AuthResetPasswordComponent);
		component = fixture.componentInstance;
		router = TestBed.inject(Router);
		component.ngOnInit();
		fixture.detectChanges();
	});

	afterEach(() => {
		fixture.destroy();
	});


	it('La funcion resetPassword() debe ser llamada', () => {
		component.resetPasswordForm.get('password').setValue('12345678');
		component.resetPasswordForm.get('password_confirmation').setValue('12345678');
		const btn = fixture.debugElement.nativeElement.querySelector('#submit-btn');
		authServiceSpy.resetPassword.and.returnValue(of({}));
		btn.click();
		fixture.detectChanges();
		expect(authServiceSpy.resetPassword).toHaveBeenCalled();
	});

	it('Se debe redirigir al usuario si el cambio de contraseña es exitoso', () => {
		const routerSpy = spyOn(router,'navigateByUrl').and.returnValue(Promise.resolve(true));

		component.resetPasswordForm.get('password').setValue('12345678');
		component.resetPasswordForm.get('password_confirmation').setValue('12345678');
		const btn = fixture.debugElement.nativeElement.querySelector('#submit-btn');
		authServiceSpy.resetPassword.and.returnValue(of({message: 'Password cambiado exitosamente'}));
		btn.click();

		fixture.detectChanges();
		expect(authServiceSpy.resetPassword).toHaveBeenCalled();
		expect(routerSpy).toHaveBeenCalled();

		// Get path without query params
		const path = (routerSpy.calls.first().args[0].toString()).split('?')[0];
		expect(path).toBe('/ingresar');

		// Get query params
		const queryParams = (routerSpy.calls.first().args[0].toString()).split('?')[1].split('&');
		expect(queryParams[0]).toBe('message=Password%20cambiado%20exitosamente');
		expect(queryParams[1]).toBe('messageType=success');
	});
});
