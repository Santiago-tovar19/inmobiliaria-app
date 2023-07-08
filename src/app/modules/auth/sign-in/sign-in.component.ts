import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {fuseAnimations} from '@fuse/animations';
import {FuseAlertType} from '@fuse/components/alert';
import {AuthService} from 'app/core/auth/auth.service';
import {User} from 'app/interfaces/entities/user';
import {HttpValidationErrorResponse} from 'app/interfaces/http-responses/http-validation-error-response';
import {GlobalService} from 'app/services/global/global.service';
import {Subject, takeUntil} from 'rxjs';

@Component({
	selector: 'auth-sign-in',
	templateUrl: './sign-in.component.html',
	encapsulation: ViewEncapsulation.None,
	animations: fuseAnimations,
})
export class AuthSignInComponent implements OnInit, OnDestroy {
	@ViewChild('signInNgForm') signInNgForm: NgForm;

	alert: {type: FuseAlertType; message: string} = {
		type: 'success',
		message: '',
	};
	signInForm: FormGroup;
	showAlert: boolean = false;
	submitted: boolean = false;
	private _unsubscribeAll: Subject<any> = new Subject<any>();

	/**
	 * Constructor
	 */
	constructor(
		private _activatedRoute: ActivatedRoute,
		private _authService: AuthService,
		private _formBuilder: FormBuilder,
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

		// Check if exist message in route
		const message     = this._activatedRoute.snapshot.queryParamMap?.get('message');
		const messageType = this._activatedRoute.snapshot.queryParamMap?.get('messageType') as FuseAlertType;

		if(message && messageType){
			this.alert = {
				type: messageType,
				message: message,
			};
			this.showAlert = true;
		}

		// Create the form
		this.signInForm = this._formBuilder.group({
			email: ['', [Validators.required]],
			password: ['', Validators.required],
			rememberMe: [false],
		});
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------------

	/**
	 * Sign in
	 */
	signIn(): void {
		// Return if the form is invalid
		if (this.signInForm.invalid) {
			return;
		}

		// Disable the form
		this.signInForm.disable();
		this.signInForm.updateValueAndValidity();

		// Hide the alert
		this.showAlert = false;

		this.submitted = true;

		// Sign in
		this._authService.signIn(this.signInForm.value).pipe(takeUntil(this._unsubscribeAll)).subscribe(
			(response) => {
				const user: User = response.data.user;
				const path = '/dashboard';

				// Set the redirect url.
				// The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
				// to the correct page after a successful sign in. This way, that url can be set via
				// routing file and we don't have to touch here.
				const redirectURL =
					path || this._activatedRoute.snapshot.queryParamMap?.get('redirectURL');

				// Navigate to the redirect url
				this._router.navigateByUrl(redirectURL);
			},
			(response: HttpValidationErrorResponse) => {

				console.log(response);
				// Re-enable the form
				this.signInForm.enable();

				this.signInForm = this._globalService.getValidationErrors(this.signInForm, response);

				// Set the alert
				this.alert = {
					type: 'error',
					message: `${response.message}`,
				};

				// Show the alert
				this.showAlert = true;
			},
		);
	}

	ngOnDestroy(): void {
		this._unsubscribeAll.next(null);
		this._unsubscribeAll.complete();
	}
}
