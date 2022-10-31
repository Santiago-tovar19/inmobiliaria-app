/* eslint-disable @typescript-eslint/naming-convention */
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {fuseAnimations} from '@fuse/animations';
import {FuseAlertType} from '@fuse/components/alert';
import {HttpValidationErrorResponse} from 'app/interfaces/http-responses/http-validation-error-response';
import { CountriesServiceService } from 'app/services/countries/countries-service.service';
import {GlobalService} from 'app/services/global/global.service';
import { FileInputComponent } from 'app/shared/file-input/file-input.component';
import {pluck, Subject, takeUntil} from 'rxjs';
import { StudentService } from '../services/student.service';

@Component({
	selector: 'app-manage-student',
	templateUrl: './manage-student.component.html',
	styleUrls: ['./manage-student.component.scss'],
	animations: fuseAnimations
})
export class ManageStudentComponent implements OnInit, OnDestroy {

	@ViewChild('fileInput', {static: true}) fileInput: FileInputComponent;
	id: number | null;
	asignaturaForm: FormGroup;
	_unsubscribeAll: Subject<any> = new Subject<any>();

	alert: {type: FuseAlertType; message: string} = {
		type: 'success',
		message: '',
	};
	showAlert: boolean = false;
	mode: 'crear' | 'editar' = 'crear';
	countries$ = this._countriesService.getCountries().pipe(pluck('data'));

	constructor(
		private _formBuilder: FormBuilder,
		private _studentService: StudentService,
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
		public _globalService: GlobalService,
		public _countriesService: CountriesServiceService
	) {}

	ngOnInit(): void {
		// Create the form
		this.asignaturaForm = this._formBuilder.group({
			code: [''],
			first_name: ['', Validators.required],
			last_name: ['', Validators.required],
			email: [''],
			document: ['', Validators.required],
			address: [''],
			phone: [''],
			country_id: [''],
			sex: [''],
			born_at: [''],
		});

		// Subscribe to the current route
		this._activatedRoute.params.pipe(takeUntil(this._unsubscribeAll)).subscribe((params: any) => {
			if (params.id) {
				this.mode = 'editar';
				this.id = params.id;
				this.getStudent(this.id);
			}
		});
	}


	getStudent(id: number): void {
		this._studentService
			.get(id)
			.pipe(
				takeUntil(this._unsubscribeAll))
			.subscribe((response: any) => {
				this.asignaturaForm.patchValue(response.data);
				this.asignaturaForm.get('country_id').setValue(response.data.country.id);
			});
	}

	saveAsignatura(): void {
		// Return if the form is invalid
		if (this.asignaturaForm.invalid) {
			this.asignaturaForm.markAllAsTouched();
			return;
		}

		// Disable the form
		this.asignaturaForm.disable();
		this.asignaturaForm.updateValueAndValidity();

		// Hide the alert
		this.showAlert = false;

		// Sign in
		this._studentService
			.create(this.asignaturaForm.value)
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe(
				() => {
					this.asignaturaForm.enable();
					// navigate with query params
					this._router.navigate(['/alumnos/lista', {m: 1}]);
				},
				(response: HttpValidationErrorResponse) => {
					// Re-enable the form
					this.asignaturaForm.enable();

					if(response.message === this._globalService.httpValidationErrorMessage) {
						this.asignaturaForm = this._globalService.getValidationErrors(this.asignaturaForm, response);

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

	gestionarAsignatura(): void {
		if (this.mode === 'crear') {
			this.saveAsignatura();
		} else {
			this.updateAsignatura();
		}
	}
	updateAsignatura(): void {
		this.asignaturaForm.markAllAsTouched();
		// Return if the form is invalid
		if (this.asignaturaForm.invalid) {
			return;
		}

		// Disable the form
		this.asignaturaForm.disable();

		// Hide the alert
		this.showAlert = false;

		// Sign in
		this._studentService
			.update(this.asignaturaForm.value, this.id)
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe(
				() => {
					this.asignaturaForm.enable();
					this._router.navigate(['/alumnos/lista', {m: 2}]);
				},
				(response: HttpValidationErrorResponse) => {
					// Re-enable the form
					this.asignaturaForm.enable();

					if(response.message === this._globalService.httpValidationErrorMessage) {
						this.asignaturaForm = this._globalService.getValidationErrors(this.asignaturaForm, response);

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

	uploadStudentDocument(): void {
		this._studentService.uploadFiles(this.fileInput.files[0].file).subscribe((response: any) => {
		console.log(response);
		});
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		// Unsubscribe from all subscriptions
		this._unsubscribeAll.next(null);
		this._unsubscribeAll.complete();
	}
}
