import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PaginatorEvent } from 'app/interfaces/general/paginator-event';
import { PaginatorParams } from 'app/interfaces/general/paginator-params';
import { GlobalService } from 'app/services/global/global.service';
import { Subject, takeUntil } from 'rxjs';
import { UsersService, SearchObject } from '../service/users.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FileInputModule } from 'app/modules/shared/file-input/file-input.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@Component({
	selector: 'app-users-list',
	templateUrl: './users-list.component.html',
	styleUrls: ['./users-list.component.scss'],
	standalone: true,
	imports: [
		CommonModule,
		MatButtonModule,
		MatFormFieldModule,
		MatSelectModule,
		ReactiveFormsModule,
		RouterModule,
		FormsModule,
		MatInputModule,
		MatTooltipModule,
		MatInputModule,
		MatTableModule,
		NgxMatSelectSearchModule,
		// FuseAlertModule,
		MatPaginatorModule,
		MatSnackBarModule,
		FileInputModule,
	],
})
export class UsersListComponent implements OnInit {
	columns: Array<string> = ['id', 'nombres', 'email', 'role', 'broker_phone', 'broker_address', 'status', 'acciones'];
	dataSource: MatTableDataSource<any>;
	usersPaginated: any;
	m: '1' | '2' | null = null;
	_unsubscribeAll: Subject<any> = new Subject<any>();
	//
	file: File;

	files: any;
	filesFiltered: any;
	cities: any;
	citiesFiltered: any;
	companies: any;
	companiesFiltered: any;
	professions: any;
	professionsFiltered: any;

	seachFormGroup: FormGroup;
	constructor(private _usersService: UsersService, private _activatedRoute: ActivatedRoute, private _router: Router, private _formBuilder: FormBuilder, private _globalService: GlobalService, private _matSnachBar: MatSnackBar) {}

	paginate(event: PageEvent): void {
		this.getUsers(this.seachFormGroup.value, { page: event.pageIndex + 1, perPage: event.pageSize });
	}

	ngOnInit(): void {
		this.seachFormGroup = this._formBuilder.group({
			termino: [''],
		});

		this._activatedRoute.params.pipe(takeUntil(this._unsubscribeAll)).subscribe((params) => {
			if (params.m) {
				this.m = params.m;
			}
		});
		this.getUsers({});
	}

	getUsers(search: SearchObject, paginatorParams: PaginatorParams = { page: 1, perPage: 10 }): void {
		this._usersService.getList(search, paginatorParams).subscribe((response: any) => {
			this.dataSource = new MatTableDataSource(response.data.data);
			this.usersPaginated = response.data;
		});
	}

	filter(value: string, array: any): any {
		const filterValue = value.toLowerCase();
		return array.filter((option) => (option || '').toLowerCase().includes(filterValue));
	}

	fileChange(file: File): void {
		this.file = file;
	}

	goToUser(id: string): void {
		this._router.navigate(['usuarios', 'editar', id]);
	}

	uploadFile(): void {
		this._usersService.uploadFile(this.file).subscribe((response) => {
			console.log(response);
		});
	}

	filterUsers(): void {
		this.getUsers(this.seachFormGroup.value);
		// const filterValue = value.toLowerCase();
		// return this.files.filter(option => option.toLowerCase().includes(filterValue));
		console.log(this.seachFormGroup.value);
	}

	getValues(): SearchObject {
		const values = {};
		if (this.seachFormGroup.value.fileSelect && this.seachFormGroup.value.fileSelect !== 'Seleccionar') {
			values['file'] = this.seachFormGroup.value.fileSelect;
		}
		if (this.seachFormGroup.value.citySelect && this.seachFormGroup.value.citySelect !== 'Seleccionar') {
			values['city'] = this.seachFormGroup.value.citySelect;
		}
		if (this.seachFormGroup.value.companySelect && this.seachFormGroup.value.companySelect !== 'Seleccionar') {
			values['company'] = this.seachFormGroup.value.companySelect;
		}
		if (this.seachFormGroup.value.professionSelect && this.seachFormGroup.value.professionSelect !== 'Seleccionar') {
			values['profession'] = this.seachFormGroup.value.professionSelect;
		}
		return values;
	}

	resendSignUpEmail(id: number): void {
		this._usersService.resendSignUpEmail(id).subscribe((response) => {
			this._globalService.openSnackBar(this._matSnachBar, 'Correo enviado', 5000, 'success');
			console.log(response);
		});
	}
}
