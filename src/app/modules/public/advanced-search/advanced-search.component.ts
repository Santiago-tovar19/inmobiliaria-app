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
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
	@ViewChild('box2') secondBox: ElementRef;
	constructor(private _router: Router, private _authService: AuthService, private _userService: UserService, private _propertiesServices: PropertiesService, private _formBuider: FormBuilder) {}

	ngOnInit(): void {
		this.getPropertiesList({});

		this._propertiesServices.getPropertyTypes().subscribe((response: any) => {
			this.propertyTypes = response.data;
		});

		this.formAdvanced = this._formBuider.group({
			property_type_id: [''],
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

	getPropertiesList(search: any, PaginatorParams: any = { page: 1, perPage: 10 }): void {
		this._propertiesServices.getList(search, PaginatorParams).subscribe((response: any) => {
			console.log(response);
			this.dataProperties = response.data.data;
			this.propertiesPaginated = response.data;
		});
	}
}
