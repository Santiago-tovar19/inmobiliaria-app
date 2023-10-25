import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { Broker } from 'app/interfaces/entities/brokers';
import { HttpValidationErrorResponse } from 'app/interfaces/http-responses/http-validation-error-response';
import { BrokersService } from 'app/modules/brokers/service/brokers.service';
import { EntityPropertiesService } from 'app/services/entity-properties/entity-properties.service';
import { GlobalService } from 'app/services/global/global.service';
import { environment } from 'environments/environment';
import { UsersService } from '../service/users.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FileInputComponent } from '../../shared/file-input/file-input.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { NgIf, NgFor } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from 'app/core/user/user.service';

@Component({
	selector: 'app-manage-user',
	templateUrl: './manage-user.component.html',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, NgIf, NgFor, MatSelectModule, MatOptionModule, FileInputComponent, MatButtonModule, MatIconModule, MatSnackBarModule],
})
export class ManageUserComponent implements OnInit {
	alert: { type: FuseAlertType; message: string } = {
		type: 'success',
		message: '',
	};
	userForm: FormGroup;
	showAlert: boolean = false;
	userID: string = '';
	roles: any;
	brokers: Broker[];
	userImg: string;
	user_rol: number;

	constructor(public _globalService: GlobalService, private _activateRoute: ActivatedRoute, private _formBuilder: FormBuilder, private _router: Router, private _usersService: UsersService, private _entityPropertiesService: EntityPropertiesService, private _brokersService: BrokersService, private _userService: UserService) {}

	ngOnInit(): void {
		this._brokersService.getAll().subscribe((response) => {
			this.brokers = response.data;
			console.log(this.brokers);
		});
		this._entityPropertiesService.getAllRoles().subscribe((response) => {
			console.log(response, 'rol');
			this.roles = response.data;
		});
		this.initForm();
		this._activateRoute.params.subscribe((params) => {
			if (params.id) {
				this.userID = params.id;
				this.getUser();
			}
		});
		this._userService.user$.subscribe((user: any) => {
			console.log(user.role.id);
			this.user_rol = user.role.id;
		});
	}

	onFileChange(event: File | FileList): void {
		event = event as File;
		this.userForm.get('img').setValue(event);
		this.userForm.get('img_changed').setValue(true);

		const reader = new FileReader();
		if (event) {
			reader.readAsDataURL(event);
			reader.onload = () => {
				this.userImg = reader.result as string;
			};
		}
	}
	initForm(): void {
		this.userForm = this._formBuilder.group({
			first_name: [''],
			last_name: [''],
			email: [''],
			phone: [''],
			broker_id: [''],
			role_id: [''],
			img: [''],
			verified: [false],
			img_changed: [false],
		});
	}

	getUser(): void {
		this._usersService.get(this.userID).subscribe((response) => {
			this.userForm.patchValue(response.data);
			if (response.data.img) {
				this.userImg = environment.assets + '/files/' + response.data.img;
			}
		});
	}

	createUser(): void {
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
		this._usersService.create(this.userForm.value).subscribe(
			() => {
				this.userForm.enable();
				// navigate with query params
				this._router.navigate(['/usuarios/lista', { m: 1 }]);
			},
			(response: HttpValidationErrorResponse) => {
				// Re-enable the form
				this.userForm.enable();

				if (response.message === this._globalService.httpValidationErrorMessage) {
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
					this._router.navigate(['/usuarios/lista', { m: 2 }]);
				},
				(response: HttpValidationErrorResponse) => {
					// Re-enable the form
					this.userForm.enable();

					if (response.message === this._globalService.httpValidationErrorMessage) {
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

	removeImg(): void {
		this.userForm.get('img').setValue('');
		this.userForm.get('img_changed').setValue(true);
		this.userImg = '';
	}
}
