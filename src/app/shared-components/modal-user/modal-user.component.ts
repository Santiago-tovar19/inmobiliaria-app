import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { User } from 'app/core/user/user.types';
import { HttpValidationErrorResponse } from 'app/interfaces/http-responses/http-validation-error-response';
import { UsersService } from 'app/modules/users/service/users.service';
import { GlobalService } from 'app/services/global/global.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
	selector: 'app-modal-user',
	templateUrl: './modal-user.component.html',
	styleUrls: ['./modal-user.component.scss'],
})
export class ModalUserComponent {
	private _unsubscribeAll: Subject<any> = new Subject<any>();
	public loginOrRegister: boolean = true;
	public showServerResponse: boolean = false;
	public serverResponse: any;
	public loginErrors: any;
	public loginForm: FormGroup = this.formBuilder.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required]],
	});

	public registerForm: FormGroup = this.formBuilder.group({
		email: ['', [Validators.required, Validators.email]],
		first_name: ['', [Validators.required]],
		// phone: ['', [Validators.required]],
		password: ['', [Validators.required]],
	});
	constructor(public dialogRef: MatDialogRef<ModalUserComponent>, private formBuilder: FormBuilder, private _authService: AuthService, private _activatedRoute: ActivatedRoute, private _globalService: GlobalService, private _usersService: UsersService, private _router: Router) {}

	cerrarModal(): void {
		this.dialogRef.close();
	}

	onSubmit(formData: any, formDirective: FormGroupDirective) {
		if (this.loginForm.invalid) {
			return;
		}

		console.log(this.loginForm.value);
		formDirective.resetForm();
		this.loginForm.reset();
	}

	changeLoginOrRegister() {
		this.loginOrRegister = !this.loginOrRegister;
	}

	register(registerForm: any, formDirective: FormGroupDirective): void {
		if (this.registerForm.invalid) {
			return;
		}

		this.registerForm.disable();
		this.registerForm.updateValueAndValidity();

		this._usersService.createUser(this.registerForm.value).subscribe(
			(response: any) => {
				const user: User = response.data.user;
				const redirectURL = '/confirmation-required';
				console.log(user);
				this._router.navigateByUrl(redirectURL);
			},
			(response: HttpValidationErrorResponse) => {
				console.log(response);
			},
		);
	}

	singIn(loginForm: any, formDirective: FormGroupDirective): void {
		console.log('singIn');

		if (this.loginForm.invalid) {
			return;
		}

		this.loginForm.disable();
		this.loginForm.updateValueAndValidity();

		this._authService
			.signIn(this.loginForm.value)
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe(
				(response) => {
					const user: User = response.data.user;

					this.dialogRef.close();
				},
				(response: HttpValidationErrorResponse) => {
					this.loginForm.enable();
					this.loginForm = this._globalService.getValidationErrors(this.loginForm, response);

					this.loginErrors = response.message;
					console.log('this.loginErrors', this.loginErrors);
					this.showServerResponse = true;
					this.serverResponse = this.loginErrors;
				},
			);
	}
}
