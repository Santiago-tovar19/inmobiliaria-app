import {Location} from '@angular/common';
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute, Router} from '@angular/router';
import { Asignature, AsignatureResponse, AsignaturesPaginated, AsignaturesPaginatedResponse } from 'app/interfaces/entities/asignatures';
import { User, UserResponse, UsersPaginated, UsersPaginatedResponse } from 'app/interfaces/entities/user';
import {PaginatorEvent} from 'app/interfaces/general/paginator-event';
import {PaginatorParams} from 'app/interfaces/general/paginator-params';
import {GlobalService} from 'app/services/global/global.service';
import {debounceTime, distinctUntilChanged, Subject, takeUntil} from 'rxjs';
import { AsignatureDetailsComponent } from '../asignature-details/asignature-details.component';
import { AsignaturesService } from '../services/asignatures.service';

@Component({
	selector: 'app-asignatures-list',
	templateUrl: './asignatures-list.component.html',
	styleUrls: ['./asignatures-list.component.scss'],
})
export class AsignaturesListComponent implements OnInit, OnDestroy {

	@ViewChild('sidenav', {static: true}) sidenav: AsignatureDetailsComponent;
	columns: Array<string> = ['id', 'name', 'description', 'acciones'];
	dataSource: MatTableDataSource<Asignature>;
	asignaturesPaginated: AsignaturesPaginated;
	m: '1' | '2' | null = null;
	_unsubscribeAll: Subject<any> = new Subject<any>();
	resendingEmail: boolean = false;

	search: FormControl = new FormControl();

	constructor(
		private _asignaturesService: AsignaturesService,
		private _router: Router,
		private _activatedRoute: ActivatedRoute,
		private _globalService: GlobalService,
		private _location: Location
	) {}

	ngOnInit(): void {

		this._activatedRoute.params.subscribe((params: {id: string}) => {
			if(params.id){
				this._asignaturesService.get(params.id).subscribe((asignature: AsignatureResponse) => {
					this.showAsignatureDetails(asignature.data);
				});
			}
		});

		this.getAsignatures();
		// Subscribe to the current route
		this._activatedRoute.params.pipe(takeUntil(this._unsubscribeAll)).subscribe((params) => {
			if (params.m) {
				this.m = params.m;
			}
		});

		this.search.valueChanges.pipe(
			takeUntil(this._unsubscribeAll),
			debounceTime(500),
			distinctUntilChanged())
			.subscribe((text: string) => {
				this.getAsignatures({page: 1, perPage: 10}, text);
			});
	}

	getAsignatures(paginatorParams?: PaginatorParams, seachString: string = ''): void {
		this._asignaturesService
			.getList(paginatorParams, seachString)
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe((response: AsignaturesPaginatedResponse) => {
				this.asignaturesPaginated = response.data;
				this.dataSource = new MatTableDataSource(this.asignaturesPaginated.data);
			});
	}

	editAsignature(id: number): void {
		this._router.navigate(['asignaturas/editar', id]);
	}

	ngOnDestroy(): void {
		this._unsubscribeAll.next(null);
		this._unsubscribeAll.complete();
	}

	paginate(event: PaginatorEvent): void {
		this.getAsignatures({page: event.pageIndex + 1, perPage: event.pageSize});
	}

	showAsignatureDetails(asignature: Asignature): void {
		this.sidenav.asignature = asignature;
		this.sidenav.drawer.toggle();
		if(this.sidenav.drawer.opened){
			this._location.replaceState('/asignaturas/detalles/' + asignature.id);
		}else{
			this._location.replaceState('/asignaturas/lista');
		}
	}
}
