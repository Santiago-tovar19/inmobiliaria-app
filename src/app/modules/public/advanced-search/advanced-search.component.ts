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

@Component({
	selector: 'app-advanced-search',
	templateUrl: './advanced-search.component.html',
	styleUrls: ['./advanced-search.component.scss'],
	standalone: true,
	imports: [CarouselModule, PropertyCardModule, NgFor, NgClass, MatPaginatorModule, NgStyle],
})
export class AdvancedSearchComponent implements OnInit {
	dataProperties: any = [];
	propertiesPaginated: any;
	@ViewChild('box2') secondBox: ElementRef;
	constructor(private _router: Router, private _authService: AuthService, private _userService: UserService, private _propertiesServices: PropertiesService) {}

	ngOnInit(): void {
		this.getPropertiesList({});

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
