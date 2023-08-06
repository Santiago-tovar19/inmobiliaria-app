import { NgClass, NgFor, NgStyle } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { UserService } from 'app/core/user/user.service';
import { PropertiesService } from 'app/modules/properties/service/properties.service';
import { PropertyCardModule } from 'app/modules/shared/property-card/property-card.module';
import { CarouselModule } from 'app/shared-components/carousel/carousel.component';
import { PaginatorParams } from 'app/interfaces/general/paginator-params';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSliderModule } from '@angular/material/slider';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';

@Component({
	selector: 'app-advanced-search',
	templateUrl: './advanced-search.component.html',
	styleUrls: ['./advanced-search.component.scss'],
	standalone: true,
	imports: [MatInputModule, MatChipsModule, MatCheckboxModule, MatSelectModule, MatFormFieldModule, CarouselModule, PropertyCardModule, NgFor, NgClass, MatPaginatorModule, NgStyle, MatSliderModule, FormsModule, MatOptionModule, ReactiveFormsModule],
})
export class AdvancedSearchComponent implements OnInit {
	dataProperties: any = [];
	formAdvanced: FormGroup;
	propertiesPaginated: any;
	minValue = 250;
	maxValue = 450;
	propertyTypes;
	selectAllChecked = false;

	checkboxList = [
		{ name: 'Estacionamiento', value: 'parking' },
		{ name: 'Cocina', value: 'kitchet' },
		{ name: 'Elevator', value: 'elevator' },
		{ name: 'Wifi', value: 'wifi' },
		{ name: 'Chimenea', value: 'fireplace' },
		{ name: 'Seguridad', value: 'security' },
		{ name: 'Vestibulo', value: 'lobby' },
		{ name: 'Balcon', value: 'balcony' },
		{ name: 'Terraza', value: 'terrace' },
		{ name: 'Planta electrica', value: 'power_plant' },
		{ name: 'Gimnasio', value: 'gym' },
		{ name: 'Vestidor', value: 'walk_in_closet' },
		{ name: 'Area de niños', value: 'kids_area' },
		{ name: 'Mascotas permitidas', value: 'pets_allowed' },
		{ name: 'Aire Central', value: 'central_air_aconditioner' },
		{ name: 'Piscina', value: 'pool' },
		{ name: 'Exclusiones', value: 'exclusions' },
	];

	filteredCheckboxList = this.checkboxList.slice();
	selectedCheckboxes: { [key: string]: boolean } = {};

	@ViewChild('box2') secondBox: ElementRef;
	constructor(private _router: Router, private _authService: AuthService, private _userService: UserService, private _propertiesServices: PropertiesService, private _formBuider: FormBuilder) {}

	ngOnInit(): void {
		this.getPropertiesList({});

		this._propertiesServices.getPropertyTypes().subscribe((response: any) => {
			this.propertyTypes = response.data;
		});

		this.formAdvanced = this._formBuider.group({
			searchText: [''],
			property_type_id: [''],
			parking: [],
			kitchen: [],
			elevator: [],
			wifi: [],
			fireplace: [],
			exclusions: [],
			security: [],
			lobby: [],
			balcony: [],
			terrace: [],
			power_plant: [],
			gym: [],
			walk_in_closet: [],
			kids_area: [],
			pets_allowed: [],
		});

		this.checkboxList.forEach((option) => {
			this.formAdvanced.addControl(option.value, new FormControl(false));
		});

		// Get width
		this.secondBox.nativeElement.style.width = this.secondBox.nativeElement.offsetWidth + 'px';

		setTimeout(() => {
			console.log(this.secondBox.nativeElement.offsetWidth);
		}, 1000);
	}

	paginate(event: any): void {
		this.getPropertiesList({}, { page: event.pageIndex + 1, perPage: event.pageSize });
	}

	onInputChange(event: Event): void {
		const searchText = (event.target as HTMLInputElement).value.toLowerCase();
		this.filteredCheckboxList = this.checkboxList.filter((option) => option.name.toLowerCase().includes(searchText));
	}

	onChangeCheckbox(controlName: string): void {
		const v = this.formAdvanced.get(controlName)?.value ? 1 : 0;

		this.formAdvanced.get(controlName)?.setValue(v);
	}

	isCheckboxSelected(value: string): boolean {
		return this.selectedCheckboxes[value] ?? false;
	}

	selectedAllCheckbox(): void {
		this.selectAllChecked = !this.selectAllChecked;
		this.filteredCheckboxList.forEach((option) => {
			this.formAdvanced.get(option.value)?.setValue(this.selectAllChecked);
		});
	}

	onSubmit(): void {
		const data = {};
		Object.entries(this.formAdvanced.value).map((item) => {
			if (item[1]) {
				data[item[0]] = item[1];
			}
		});

		console.log(data);
	}

	getPropertiesList(search: any, PaginatorParams: any = { page: 1, perPage: 10 }): void {
		this._propertiesServices.getList(search, PaginatorParams).subscribe((response: any) => {
			console.log(response);
			this.dataProperties = response.data.data;
			this.propertiesPaginated = response.data;
		});
	}
}
