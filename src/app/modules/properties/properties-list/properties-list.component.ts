import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PaginatorEvent } from 'app/interfaces/general/paginator-event';
import { PaginatorParams } from 'app/interfaces/general/paginator-params';
import { SearchObject } from 'app/modules/users/service/users.service';
import { Subject } from 'rxjs';
import { PropertiesService } from '../service/properties.service';

@Component({
  selector: 'app-properties-list',
  templateUrl: './properties-list.component.html',
  styleUrls: ['./properties-list.component.scss']
})
export class PropertiesListComponent implements OnInit {

  columns: Array<string> = ['id', 'description', 'address', 'location_type', 'price', 'published_at', 'acciones'];
	dataSource: MatTableDataSource<any>;
	propertiesPaginated: any;
	m: '1' | '2' | null = null;
	_unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
		private _propertiesService: PropertiesService
	) { }

  ngOnInit(): void {
		this.getProperties();
  }

	getProperties(search: SearchObject = {}, paginatorParams: PaginatorParams = {page: 1, perPage: 10}): void {
		this._propertiesService.getList(search, paginatorParams).subscribe((response: any) => {
			this.dataSource = new MatTableDataSource(response.data.data);
			// console.log(this.dataSource);
			console.log(response);
			this.propertiesPaginated = response.data;
		});
	}

	paginate(event: PaginatorEvent): void {
		this.getProperties(this.getValues(), {page: event.pageIndex + 1, perPage: event.pageSize});
	}

	getValues(): null {
		return null
	}

	newTab(path: string): void {

		const url = new URL(path, window.location.origin);
		window.open(url.toString(), '_blank');
	}

}
