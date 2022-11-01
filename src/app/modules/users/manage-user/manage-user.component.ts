/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { HttpValidationErrorResponse } from 'app/interfaces/http-responses/http-validation-error-response';
import { EntityPropertiesService } from 'app/services/entity-properties/entity-properties.service';
import { GlobalService } from 'app/services/global/global.service';
import { takeUntil } from 'rxjs';
import { UsersService, SearchObject } from '../service/users.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {

	alert: {type: FuseAlertType; message: string} = {
		type: 'success',
		message: '',
	};
	userForm: FormGroup;
	showAlert: boolean = false;
	userID: string = '';
	roles: any

  constructor(
		public _globalService: GlobalService,
		private _activateRoute: ActivatedRoute,
		private _formBuilder: FormBuilder,
		private _router: Router,
		private _usersService: UsersService,
		private _entityPropertiesService: EntityPropertiesService
	) { }

  ngOnInit(): void {
		this._entityPropertiesService.getAllRoles().subscribe((response) => {
			console.log(response)
			this.roles = response.data;
		});
		this.initForm();
		this._activateRoute.params.subscribe((params) => {
			if(params.id){
				this.userID = params.id;
				this.getUser();
			}
		});

  }

	initForm(): void{
		this.userForm = this._formBuilder.group({
			full_name: [''],
			email: [''],
			username: [''],
			phone: [''],
			broker_name: [''],
			broker_address: [''],
			role_id: [''],
			img: [''],
			img_changed: [false],
			broker_logo: [''],
			broker_logo_changed: [false],
		});
	}

	getUser(): void{
		this._usersService.get(this.userID).subscribe((response) => {
			this.userForm.patchValue(response.data);
		});
	}

	createUser(): void{

		console.log(this.userForm.value);

	// Return if the form is invalid
	if (this.userForm.invalid) {
		this.userForm.markAllAsTouched();
		return;
	}

	// Disable the form
	this.userForm.disable();
	this.userForm.updateValueAndValidity();

	// Hide the alert
	this.showAlert = false;

	// Sign in
	this._usersService
		.create(this.userForm.value)
		// takeUntil(this._unsubscribeAll)
		.pipe()
		.subscribe(
			() => {
				this.userForm.enable();
				// navigate with query params
				this._router.navigate(['/usuarios/lista', {m: 1}]);
			},
			(response: HttpValidationErrorResponse) => {
				// Re-enable the form
				this.userForm.enable();

				if(response.message === this._globalService.httpValidationErrorMessage) {
					this.userForm = this._globalService.getValidationErrors(this.userForm, response);

					// Set the alert
					this.alert = {
						type: 'error',
						message: `${response.message}`,
					};

					// Show the alert
					this.showAlert = true;
				}
			},
		);
	}

	updateUser(): void {
		this.userForm.markAllAsTouched();
		// Return if the form is invalid
		if (this.userForm.invalid) {
			return;
		}

		// Disable the form
		this.userForm.disable();

		// Hide the alert
		this.showAlert = false;

		// Sign in
		this._usersService
			.update(this.userID, this.userForm.value)
			.pipe()
			.subscribe(
				() => {
					this.userForm.enable();
					this._router.navigate(['/usuarios/lista', {m: 2}]);
				},
				(response: HttpValidationErrorResponse) => {
					// Re-enable the form
					this.userForm.enable();

					if(response.message === this._globalService.httpValidationErrorMessage) {
						this.userForm = this._globalService.getValidationErrors(this.userForm, response);

						// Set the alert
						this.alert = {
							type: 'error',
							message: `${response.message}`,
						};

						// Show the alert
						this.showAlert = true;
					}
				},
			);
	}
}
