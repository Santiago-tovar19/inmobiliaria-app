import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {finalize, Subject, takeUntil} from 'rxjs';
import {fuseAnimations} from '@fuse/animations';
import {FuseValidators} from '@fuse/validators';
import {FuseAlertType} from '@fuse/components/alert';
import {AuthService} from 'app/core/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalService} from 'app/services/global/global.service';
import {HttpSimpleResponse} from 'app/interfaces/http-responses/http-simple-response';
import {HttpValidationErrorResponse} from 'app/interfaces/http-responses/http-validation-error-response';

@Component({
	selector: 'auth-reset-password',
	templateUrl: './reset-password.component.html',
	encapsulation: ViewEncapsulation.None,
	animations: fuseAnimations,
})
export class AuthResetPasswordComponent implements OnInit, OnDestroy {
	@ViewChild('resetPasswordNgForm') resetPasswordNgForm: NgForm;

	alert: {type: FuseAlertType; message: string} = {
		type: 'success',
		message: '',
	};
	resetPasswordForm: FormGroup;
	showAlert: boolean = false;
	token: string;
	email: string;
	submitted: boolean = false;
	private _unsubscribeAll: Subject<any> = new Subject<any>();

	/**
	 * Constructor
	 */
	constructor(
		private _authService: AuthService,
		private _formBuilder: FormBuilder,
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
		public _globalService: GlobalService,
	) {}

	// -----------------------------------------------------------------------------------------------------
	// @ Lifecycle hooks
	// -----------------------------------------------------------------------------------------------------

	/**
	 * On init
	 */
	ngOnInit(): void {
		// Get token from query params
		this.token = this._activatedRoute.snapshot.queryParams.token;
		this.email = this._activatedRoute.snapshot.queryParams.email;

		// Create the form
		this.resetPasswordForm = this._formBuilder.group(
			{
				password: ['', Validators.required],
				// eslint-disable-next-line @typescript-eslint/naming-convention
				password_confirmation: ['', Validators.required],
			},
			{
				validators: FuseValidators.mustMatch('password', 'password_confirmation'),
			},
		);
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------------

	/**
	 * Reset password
	 */
	resetPassword(): void {
		// Return if the form is invalid
		if (this.resetPasswordForm.invalid) {
			return;
		}

		this.submitted = true;

		// Disable the form
		this.resetPasswordForm.disable();

		// Hide the alert
		this.showAlert = false;

		// Send the request to the server
		this._authService
			.resetPassword(
				this.resetPasswordForm.get('password').value,
				this.resetPasswordForm.get('password_confirmation').value,
				this.token,
				this.email,
			)
			.pipe(
				finalize(() => {
					// Show the alert
					this.showAlert = true;
				}),
				takeUntil(this._unsubscribeAll)
			)
			.subscribe(
				(response: HttpSimpleResponse) => {
					// Redirect to the login page with query params
					this._router.navigate(['/ingresar'], {
						queryParams: {
							message: response.message,
							messageType: 'success',
						},
					});
				},
				(response: HttpValidationErrorResponse) => {
					// Set the alert

					// Re-enable the form
					this.resetPasswordForm.enable();

					this.resetPasswordForm = this._globalService.getValidationErrors(this.resetPasswordForm, response);
					this.alert = {
						type: 'error',
						message: response.message,
					};
				},
			);
	}

	ngOnDestroy(): void {
		this._unsubscribeAll.next(null);
		this._unsubscribeAll.complete();
	}
}
