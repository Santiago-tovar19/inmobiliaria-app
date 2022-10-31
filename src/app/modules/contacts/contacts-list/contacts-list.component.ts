import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatorEvent } from 'app/interfaces/general/paginator-event';
import { PaginatorParams } from 'app/interfaces/general/paginator-params';
import { GlobalService } from 'app/services/global/global.service';
import { Subject, takeUntil } from 'rxjs';
import { ContactsService, SearchObject } from '../service/contacts.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent implements OnInit {

	// columns: Array<string> = [ 'id', 'nombres', 'documento', 'email', 'ciudad', 'acciones'];
	columns: Array<string> = ['id', 'nombres', 'documento', 'email', 'ciudad', 'acciones'];
	dataSource: MatTableDataSource<any>;
	contactsPaginated: any;
	m: '1' | '2' | null = null;
	_unsubscribeAll: Subject<any> = new Subject<any>();
	//
	file: File;

	files: any; filesFiltered: any;;
	cities: any; 	citiesFiltered: any;;
	companies: any; 	companiesFiltered: any;;
	professions: any; 	professionsFiltered: any;;

	seachFormGroup: FormGroup;
  constructor(
		private _contactsService: ContactsService,
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
		private _formBuilder: FormBuilder,
		private _globalService: GlobalService
	) { }

	paginate(event: PaginatorEvent): void {
		this.getContacts(this.getValues(), {page: event.pageIndex + 1, perPage: event.pageSize});
	}

  ngOnInit(): void {
		this.seachFormGroup = this._formBuilder.group({
			file: [null], city: [null], company: [null], profession: [null],
			fileSelect: ['Seleccionar'], citySelect: ['Seleccionar'], companySelect: ['Seleccionar'], professionSelect: ['Seleccionar'],
		});

		this._activatedRoute.params.pipe(takeUntil(this._unsubscribeAll)).subscribe((params) => {
			if (params.m) {
				this.m = params.m;
			}
		});
		this.getContacts({});
		this.getPropertyEntities();
  }

	getContacts(search: SearchObject, paginatorParams: PaginatorParams = {page: 1, perPage: 10}): void {
		this._contactsService.getList(search, paginatorParams).subscribe((response: any) => {
			this.dataSource = new MatTableDataSource(response.data.data);
			this.contactsPaginated = response.data;
		});
	}

	getPropertyEntities(): void{
		this._contactsService.getPropertyEntities().subscribe((response) => {
			this.files = this.filesFiltered = response.data.files;
			this.cities = this.citiesFiltered = response.data.cities;
			this.companies = this.companiesFiltered = response.data.companies;
			this.professions = this.professionsFiltered = response.data.professions;

			this.seachFormGroup.get('file').valueChanges.subscribe((value) => {
				this.filesFiltered = this.filter(value, this.files);
			});
			this.seachFormGroup.get('city').valueChanges.subscribe((value) => {
				this.citiesFiltered = this.filter(value, this.cities);
			});
			this.seachFormGroup.get('company').valueChanges.subscribe((value) => {
				this.companiesFiltered = this.filter(value, this.companies);
			});
			this.seachFormGroup.get('profession').valueChanges.subscribe((value) => {
				this.professionsFiltered = this.filter(value, this.professions);
			});
		});
	}

	filter(value: string, array: any): any {
		const filterValue = value.toLowerCase();
		return array.filter(option => (option || '').toLowerCase().includes(filterValue));
	}

	fileChange(file: File): void{
		this.file = file;
	}

	goToContact(id: string): void{
		this._router.navigate(['contactos', 'editar', id]);
	}

	uploadFile(): void{
		this._contactsService.uploadFile(this.file).subscribe((response) => {
			console.log(response);
		});
	}

	filterContacts(): void {
		console.log(this.getValues());
		this.getContacts(this.getValues());
		// const filterValue = value.toLowerCase();
		// return this.files.filter(option => option.toLowerCase().includes(filterValue));
	}

	getValues(): SearchObject{
		const values = {};
		if(this.seachFormGroup.value.fileSelect && this.seachFormGroup.value.fileSelect!=='Seleccionar'){
			values['file'] = this.seachFormGroup.value.fileSelect;
		}
		if(this.seachFormGroup.value.citySelect && this.seachFormGroup.value.citySelect!=='Seleccionar'){
			values['city'] = this.seachFormGroup.value.citySelect;
		}
		if(this.seachFormGroup.value.companySelect && this.seachFormGroup.value.companySelect!=='Seleccionar'){
			values['company'] = this.seachFormGroup.value.companySelect;
		}
		if(this.seachFormGroup.value.professionSelect && this.seachFormGroup.value.professionSelect!=='Seleccionar'){
			values['profession'] = this.seachFormGroup.value.professionSelect;
		}
		return values;
	}

	export(): void{
		this._contactsService.getAll(this.getValues()).subscribe((response) => {
			const fileName = 'contactos';
			this._globalService.saveDataAsCSV(response.data, fileName);
		});
	}


}
