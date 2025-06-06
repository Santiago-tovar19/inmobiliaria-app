import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FuseAlertComponent } from '../../../../@fuse/components/alert/alert.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [RouterLink, NgIf, FuseAlertComponent, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule]
})
export class AuthSignUpComponent implements OnInit
{
	@ViewChild('signUpNgForm') signUpNgForm: NgForm;

	alert: { type: FuseAlertType; message: string } = {
		type   : 'success',
		message: ''
	};
	signUpForm: UntypedFormGroup;
	showAlert: boolean = false;

	/**
     * Constructor
     */
	constructor(
		private _authService: AuthService,
		private _formBuilder: UntypedFormBuilder,
		private _router: Router
	)
	{
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Lifecycle hooks
	// -----------------------------------------------------------------------------------------------------

	/**
     * On init
     */
	ngOnInit(): void
	{
		// Create the form
		this.signUpForm = this._formBuilder.group({
			name      : ['', Validators.required],
			email     : ['', [Validators.required, Validators.email]],
			password  : ['', Validators.required],
			company   : [''],
			agreements: ['', Validators.requiredTrue]
		}
		);
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------------

	/**
     * Sign up
     */
	signUp(): void
	{
		// Do nothing if the form is invalid
		if ( this.signUpForm.invalid )
		{
			return;
		}

		// Disable the form
		this.signUpForm.disable();

		// Hide the alert
		this.showAlert = false;

		// Sign up
		this._authService.signUp(this.signUpForm.value)
			.subscribe(
				(response) => {

					// Navigate to the confirmation required page
					this._router.navigateByUrl('/confirmation-required');
				},
				(response) => {

					// Re-enable the form
					this.signUpForm.enable();

					// Reset the form
					this.signUpNgForm.resetForm();

					// Set the alert
					this.alert = {
						type   : 'error',
						message: 'Something went wrong, please try again.'
					};

					// Show the alert
					this.showAlert = true;
				}
			);
	}
}
