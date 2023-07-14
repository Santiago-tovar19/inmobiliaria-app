import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/interfaces/entities/user';
import { PaginatorParams } from 'app/interfaces/general/paginator-params';
import { SearchObject } from 'app/modules/users/service/users.service';
import { GlobalService } from 'app/services/global/global.service';
import { environment } from 'environments/environment';
import { Subject } from 'rxjs';
import { PropertiesService } from '../service/properties.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { FileInputModule } from 'app/modules/shared/file-input/file-input.module';
import { ExcerptPipesModule } from 'app/pipes/excerpt/excerpt.pipe';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@Component({
	selector: 'app-properties-list',
	templateUrl: './properties-list.component.html',
	styleUrls: ['./properties-list.component.scss'],
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
		MatIconModule,
		NgxMatSelectSearchModule,
		// FuseAlertModule,
		ExcerptPipesModule,
		MatPaginatorModule,
		FileInputModule,
		MatFormFieldModule,
		MatSelectModule,
		MatSnackBarModule,
		MatInputModule,
	]
})
export class PropertiesListComponent implements OnInit {

	columns: Array<string> = ['id', 'description', 'address', 'location_type', 'price', 'published_at', 'acciones'];
	newColumns: Array<string> = ['id', 'name', 'address', 'price', 'rooms', 'bathrooms', 'actions'];
	dataSource: MatTableDataSource<any>;
	propertiesPaginated: any;
	m: '1' | '2' | null = null;
	user: User;
	_unsubscribeAll: Subject<any> = new Subject<any>();

	constructor(
		private _propertiesService: PropertiesService,
		private _globalService: GlobalService,
		private _userService: UserService,
		private _matSnachBar: MatSnackBar
	) { }

	ngOnInit(): void {
		this.getProperties();
		this._userService.user$.subscribe((user: any) => {
			this.user = user;
			console.log(this.user);
			if(user.role_id === 1 || user.role_id === 2) {
				console.log('Hola que tal');
				// Push estado after "bathrooms"
				this.newColumns.splice(6, 0, 'state');
			}
		});
	}

	getProperties(search: SearchObject = {}, paginatorParams: PaginatorParams = {page: 1, perPage: 10}): void {
		this._propertiesService.getList(search, paginatorParams).subscribe((response: any) => {
			this.dataSource = new MatTableDataSource(response.data.data);
			// console.log(this.dataSource);
			console.log(response);
			this.propertiesPaginated = response.data;
		});
	}

	paginate(event: PageEvent): void { // PaginatorEvent
		this.getProperties(this.getValues(), {page: event.pageIndex + 1, perPage: event.pageSize});
	}

	getValues(): null {
		return null;
	}

	newTab(path: string): void {

		const url = new URL(path, environment.front_url);
		window.open(url.toString(), '_blank');
	}

	deleteProperty(id: number): void {
		this._propertiesService.delete(id+'').subscribe(() => {
			this.getProperties();
			this._globalService.openSnackBar(this._matSnachBar, 'Propiedad eliminada correctamente', 5000, 'success');
		});
	}

}
