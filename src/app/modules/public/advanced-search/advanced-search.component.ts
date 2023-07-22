import { NgClass, NgFor } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AuthService } from 'app/core/auth/auth.service';
import { UserService } from 'app/core/user/user.service';

import { PropertiesService } from 'app/modules/properties/service/properties.service';
import { PropertyCardModule } from 'app/modules/shared/property-card/property-card.module';
import { CarouselModule } from 'app/shared-components/carousel/carousel.component';

@Component({
	selector: 'app-advanced-search',
	templateUrl: './advanced-search.component.html',
	styleUrls: ['./advanced-search.component.scss'],
	standalone: true,
	imports: [CarouselModule, PropertyCardModule, NgFor, NgClass],
})
export class AdvancedSearchComponent implements OnInit {
	dataProperties: any = [];
	constructor(private _router: Router, private _authService: AuthService, private _userService: UserService, private _propertiesServices: PropertiesService) {}

	ngOnInit(): void {
		this.getPropertiesList({});
	}

	getPropertiesList(search: any, PaginatorParams: any = { page: 1, perPage: 10 }): void {
		this._propertiesServices.getList({}).subscribe((response: any) => {
			console.log(response);
			this.dataProperties = response.data.data;
		});
	}
}
