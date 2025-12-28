import { JsonPipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
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
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { filter } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
	selector: 'app-advanced-search',
	templateUrl: './advanced-search.component.html',
	styleUrls: ['./advanced-search.component.scss'],
	standalone: true,
	imports: [JsonPipe, MatSidenavModule, MatInputModule, MatChipsModule, MatCheckboxModule, MatSelectModule, MatFormFieldModule, CarouselModule, PropertyCardModule, NgFor, NgIf, NgClass, MatPaginatorModule, NgStyle, MatSliderModule, FormsModule, MatOptionModule, ReactiveFormsModule, MatProgressSpinnerModule],
})
export class AdvancedSearchComponent implements OnInit {
	dataProperties: any = [];
	formAdvanced: FormGroup;
	propertiesPaginated: any;
	minValue = 250;
	maxValue = 450;
	propertyTypes;
	selectAllChecked = false;
	sideBarMode: any = 'side';
	public hasLoaded: boolean = false;
	@ViewChild('drawer') drawer: MatDrawer;

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		event.target.innerWidth;
		if (event.target.innerWidth < 1000) {
			this.sideBarMode = 'over';
			this.drawer.close();
		}
		if (event.target.innerWidth > 1000) {
			this.sideBarMode = 'side';
			this.drawer.open();
		}
	}

	checkboxList = [
		{ name: 'Estacionamiento', value: 'parking' },
		{ name: 'Cocina', value: 'kitchen' },
		{ name: 'Elevator', value: 'elevator' },
		{ name: 'Propiedades destacadas', value: 'featured' },
		{ name: 'Wifi', value: 'wifi' },
		{ name: 'Chimenea', value: 'fireplace' },
		{ name: 'Seguridad', value: 'security' },
		{ name: 'Propiedad publicada', value: 'published' },
		{ name: 'Vestibulo', value: 'lobby' },
		{ name: 'Balcon', value: 'balcony' },
		{ name: 'Terraza', value: 'terrace' },
		{ name: 'Planta electrica', value: 'power_plant' },
		{ name: 'Gimnasio', value: 'gym' },
		{ name: 'Vestidor', value: 'walk_in_closet' },
		{ name: 'Area de niños', value: 'kids_area' },
		{ name: 'Mascotas permitidas', value: 'pets_allowed' },
		{ name: 'Aire Central', value: 'central_air_aconditioner' },
		{ name: 'Piscina', value: 'swimming_pool' },
		{ name: 'Exclusiones', value: 'exclusions' },
		{ name: 'hoa', value: 'hoa' },
		{ name: 'Historias', value: 'stories' },
	];

	imagesSliders: string[] = [
		'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
		'https://cdn.pixabay.com/photo/2016/11/29/03/53/house-1867187_640.jpg',
		'https://images.freeimages.com/images/large-previews/e85/house-1224030.jpg',
		'https://images.freeimages.com/images/large-previews/d5b/home-1224274.jpg',
		'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
		'https://images.unsplash.com/photo-1600585153490-76fb20a32601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
		'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
		'https://images.unsplash.com/photo-1559329145-afaf18e3f349?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
		'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
		'https://gpvivienda.com/blog/wp-content/uploads/2023/03/digital-marketing-agency-ntwrk-g39p1kDjvSY-unsplash-1.jpg',
	];

	filteredCheckboxList = this.checkboxList.slice();
	selectedCheckboxes: { [key: string]: boolean } = {};

	@ViewChild('box2') secondBox: ElementRef;
	@ViewChild('sidebar') sidebarRef: ElementRef;
	constructor(private _router: Router, private _authService: AuthService, private _userService: UserService, private _propertiesServices: PropertiesService, private _formBuider: FormBuilder, private activatedRoute: ActivatedRoute) {}

	ngOnInit(): void {
		// Get windows width
		const width = window.innerWidth;
		this.sideBarMode = width < 1000 ? 'over' : 'side';

		this.activatedRoute.queryParams.subscribe((params) => {
			const queryParams = { publico: 1 };

			for (const key in params) {
				if (params.hasOwnProperty(key)) {
					queryParams[key] = params[key];
				}
			}

			this.getPropertiesList(queryParams);
		});

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
			hoa: [],
			central_air_aconditioner: [],
			histories: [],
			published: [],
			featured: [],
			minPrice: [null],
			maxPrice: [null],
			contract_type_id: [],
			publico: [1],
		});

		this.checkboxList.forEach((option) => {
			this.formAdvanced.addControl(option.value, new FormControl(false));
		});

		// Get width
		// this.secondBox.nativeElement.style.width = this.secondBox.nativeElement.offsetWidth + 'px';

		setTimeout(() => {
			// Get windows size
			const width = window.innerWidth;
			if (width < 1000) {
				this.drawer.close();
			}
			if (width > 1000) {
				this.drawer.open();
			}
		}, 1000);
	}

	getPropertyImageById(propertyId: number | string): string {
		const id = Number(propertyId) || 0;
		return this.imagesSliders[id % this.imagesSliders.length];
	}

	paginate(event: any): void {
		this.getPropertiesList({ publico: 1 }, { page: event.pageIndex + 1, perPage: event.pageSize });
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

		this.getPropertiesList(data);
	}

	filterProperties(): void {}

	getPropertiesList(search: any = { publico: 1 }, PaginatorParams: any = { page: 1, perPage: 10 }): void {
		this._propertiesServices.getList(search, PaginatorParams).subscribe((response: any) => {
			this.hasLoaded = true;
			console.log(response);
			this.dataProperties = response.data.data;
			this.propertiesPaginated = response.data;

			// Retrasar el cambio de hasLoaded a false después de 2 segundos (2000 ms)
			setTimeout(() => {
				this.hasLoaded = false;
			}, 1500);
		});
	}
}
