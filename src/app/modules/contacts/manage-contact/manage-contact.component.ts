/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { HttpValidationErrorResponse } from 'app/interfaces/http-responses/http-validation-error-response';
import { GlobalService } from 'app/services/global/global.service';
import { takeUntil } from 'rxjs';
import { ContactsService, SearchObject } from '../service/contacts.service';

@Component({
  selector: 'app-manage-contact',
  templateUrl: './manage-contact.component.html',
  styleUrls: ['./manage-contact.component.scss']
})
export class ManageContactComponent implements OnInit {

	alert: {type: FuseAlertType; message: string} = {
		type: 'success',
		message: '',
	};
	contactForm: FormGroup;
	showAlert: boolean = false;
	contactID: string = '';

  constructor(
		public _globalService: GlobalService,
		private _activateRoute: ActivatedRoute,
		private _formBuilder: FormBuilder,
		private _router: Router,
		private _contactsService: ContactsService
	) { }

  ngOnInit(): void {
		this.initForm();
		this._activateRoute.params.subscribe((params) => {
			if(params.id){
				this.contactID = params.id;
				this.getContact();
			}
		});

  }

	initForm(): void{
		this.contactForm = this._formBuilder.group({
			first_name: [''],
			last_name: [''],
			email: [''],
			// phone: [''],
			company: [''],
			document: [''],
			city: [''],
			profession: [''],
		});
	}

	getContact(): void{
		this._contactsService.get(this.contactID).subscribe((response) => {
			this.contactForm.patchValue(response.data);
		});
	}

	createContact(): void{
	// Return if the form is invalid
	if (this.contactForm.invalid) {
		this.contactForm.markAllAsTouched();
		return;
	}

	// Disable the form
	this.contactForm.disable();
	this.contactForm.updateValueAndValidity();

	// Hide the alert
	this.showAlert = false;

	// Sign in
	this._contactsService
		.create(this.contactForm.value)
		// takeUntil(this._unsubscribeAll)
		.pipe()
		.subscribe(
			() => {
				this.contactForm.enable();
				// navigate with query params
				this._router.navigate(['/contactos/lista', {m: 1}]);
			},
			(response: HttpValidationErrorResponse) => {
				// Re-enable the form
				this.contactForm.enable();

				if(response.message === this._globalService.httpValidationErrorMessage) {
					this.contactForm = this._globalService.getValidationErrors(this.contactForm, response);

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

	updateContact(): void {
		this.contactForm.markAllAsTouched();
		// Return if the form is invalid
		if (this.contactForm.invalid) {
			return;
		}

		// Disable the form
		this.contactForm.disable();

		// Hide the alert
		this.showAlert = false;

		// Sign in
		this._contactsService
			.update(this.contactID, this.contactForm.value)
			.pipe()
			.subscribe(
				() => {
					this.contactForm.enable();
					this._router.navigate(['/contactos/lista', {m: 2}]);
				},
				(response: HttpValidationErrorResponse) => {
					// Re-enable the form
					this.contactForm.enable();

					if(response.message === this._globalService.httpValidationErrorMessage) {
						this.contactForm = this._globalService.getValidationErrors(this.contactForm, response);

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
