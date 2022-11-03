import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { FuseValidators } from '@fuse/validators';
import { HttpSimpleResponse } from 'app/interfaces/http-responses/http-simple-response';
import { HttpValidationErrorResponse } from 'app/interfaces/http-responses/http-validation-error-response';
import { UsersService } from 'app/modules/users/service/users.service';
import { GlobalService } from 'app/services/global/global.service';
import { finalize, Subject, takeUntil } from 'rxjs';

@Component({
	selector: 'app-crear-cuenta',
	templateUrl: './crear-cuenta.component.html',
	styleUrls: ['./crear-cuenta.component.scss'],
})
export class CrearCuentaComponent implements OnInit, OnDestroy {
	@ViewChild('resetPasswordNgForm') resetPasswordNgForm: NgForm;

	alert: { type: FuseAlertType; message: string } = {
		type: 'success',
		message: '',
	};
	registroForm: FormGroup;
	showAlert: boolean = false;
	token: string;
	email: string;
	submitted: boolean = false;
	private _unsubscribeAll: Subject<any> = new Subject<any>();

	/**
	 * Constructor
	 */
	constructor(
		private _usersService: UsersService,
		private _formBuilder: FormBuilder,
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
		public _globalService: GlobalService
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
		this.registroForm = this._formBuilder.group(
			{
				full_name: ['', Validators.required],
				email: [this.email, [Validators.required, Validators.email]],

				username: [''],
				phone: [''],
				broker_name: [''],
				broker_address: [''],

				password: ['', Validators.required],
				// eslint-disable-next-line @typescript-eslint/naming-convention
				password_confirmation: ['', Validators.required],
			},
			{
				validators: FuseValidators.mustMatch(
					'password',
					'password_confirmation'
				),
			}
		);

		this.registroForm.get('email').disable();
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------------

	/**
	 * Reset password
	 */
	resetPassword(): void {
		// Return if the form is invalid
		if (this.registroForm.invalid) {
			return;
		}

		this.submitted = true;

		// Disable the form
		this.registroForm.disable();

		// Hide the alert
		this.showAlert = false;

		// Send the request to the server
		this._usersService
			.completeSignUp(this.registroForm.value, this.token)
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
					this.registroForm.enable();

					this.registroForm = this._globalService.getValidationErrors(
						this.registroForm,
						response
					);
					this.alert = {
						type: 'error',
						message: response.message,
					};
				}
			);
	}

	ngOnDestroy(): void {
		this._unsubscribeAll.next(null);
		this._unsubscribeAll.complete();
	}
}
