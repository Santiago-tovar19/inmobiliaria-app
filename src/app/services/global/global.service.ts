import {Injectable, NgZone} from '@angular/core';
import {AbstractControl, FormArray, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserService} from 'app/core/user/user.service';
import {HttpValidationErrorResponse} from 'app/interfaces/http-responses/http-validation-error-response';
import saveAs from 'file-saver';

@Injectable({
	providedIn: 'root',
})
export class GlobalService {
	public httpValidationErrorMessage: string = 'Hay errores en el formulario';
	public httpGeneralErrorMessage: string = 'Ocurrio un error inesperado';

	constructor(
		private _userService: UserService,
		private _ngZone: NgZone
		) {}

	getValidationErrors(formGroup: FormGroup, response: HttpValidationErrorResponse): FormGroup {
		const errors = response.errors ? response.errors : {};
		Object.entries(errors).map((error) => {
			try {
				const errorsObject = {};
				(error[1] as Array<string>).forEach((e: string, index: number) => {
					errorsObject[index] = e;
				});
				formGroup.get(error[0]).setErrors(errorsObject);
			} catch (e) {}
		});
		return formGroup;
	}

	getValidationErrorsFormArray(formArray: FormArray, response: HttpValidationErrorResponse): FormArray {
		const errors = response.errors ? response.errors : {};
		Object.entries(errors).map((error) => {
			try {
				const errorsObject = {};
				const i = error[0].split('.')[1];
				const field = error[0].split('.')[2];
				(error[1] as Array<string>).forEach((e: string, index: number) => {
					errorsObject[index] = e.replace(error[0], field);
				});
				formArray.controls[i].get(field).setErrors(errorsObject);
			} catch (e) {}
		});
		return formArray;
	}

	errorsLength(formControl: AbstractControl): Array<string> {
		if (formControl.errors) {
			Object.keys(formControl.errors).map((value: string, index: number) => index.toFixed(0));
		}

		return [];
	}

	openSnackBar(_snackBar: MatSnackBar, message: string, duration: number = 3000, type: string = 'success'): void {
		const className = type === 'success' ? ['bg-green-700', 'text-white'] : ['bg-red-700', 'text-red-100'];
			_snackBar.open(message, null, {
				horizontalPosition: 'center',
				verticalPosition: 'top',
				duration: duration,
				panelClass: className,
			});
	}

	formatDataForChart(chart: any, data: any, dateTimeKey: string, valueKey: string, label: string): any {
		const chartData = data.map((d) => {
			// add 4 hours to
			let datetime = new Date(d[dateTimeKey]);

			// substract 2 hours to datetime
			datetime = new Date(datetime.getTime() - 4 * 60 * 60 * 1000);

			return {
				x: datetime, y: d[valueKey]
			};
		});
		const chartCloned = JSON.parse(JSON.stringify(chart));
		chartCloned.series = {main: [{
			name: label,
			data: chartData
		}]};
		return chartCloned;
	}

	saveDataAsCSV(data: any, fileName: string): void {
		const replacer = (key: any, value: any): any => value === null ? '' : value; // specify how you want to handle null values here
		const header = Object.keys(data[0]);
		const csv = data.map((row: any) => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(';'));
		csv.unshift(header.join(';'));
		const csvArray = csv.join('\r\n');

		const blob = new Blob([csvArray], {type: 'text/csv'});

		let d = (new Date() as any);
		d = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
		saveAs(blob, `${fileName} ${d}.csv`);
	}
}
