import {Location} from '@angular/common';
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute, Router} from '@angular/router';
import { User, UserResponse, UsersPaginated, UsersPaginatedResponse } from 'app/interfaces/entities/user';
import {PaginatorEvent} from 'app/interfaces/general/paginator-event';
import {PaginatorParams} from 'app/interfaces/general/paginator-params';
import {GlobalService} from 'app/services/global/global.service';
import {debounceTime, distinctUntilChanged, Subject, takeUntil} from 'rxjs';
import { StudentService } from '../services/student.service';
import { StudentDetailsComponent } from '../student-details/student-details.component';

@Component({
	selector: 'app-students-list',
	templateUrl: './students-list.component.html',
	styleUrls: ['./students-list.component.scss'],
})
export class StudentsListComponent implements OnInit, OnDestroy {

	@ViewChild('sidenav', {static: true}) sidenav: StudentDetailsComponent;
	columns: Array<string> = ['code', 'first_name', 'last_name', 'document', 'email', 'phone', 'acciones'];
	dataSource: MatTableDataSource<User>;
	studentsPaginated: UsersPaginated;
	m: '1' | '2' | null = null;
	_unsubscribeAll: Subject<any> = new Subject<any>();
	resendingEmail: boolean = false;

	search: FormControl = new FormControl();

	constructor(
		private _studentService: StudentService,
		private _router: Router,
		private _activatedRoute: ActivatedRoute,
		private _globalService: GlobalService,
		private _location: Location
	) {}

	ngOnInit(): void {

		this._activatedRoute.params.subscribe((params: {id: string}) => {
			if(params.id){
				this._studentService.get(params.id).subscribe((student: UserResponse) => {
					this.showStudentDetails(student.data);
				});
			}
		});

		this.getStudents();
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
				this.getStudents({page: 1, perPage: 10}, text);
			});
	}

	getStudents(paginatorParams?: PaginatorParams, seachString: string = ''): void {
		this._studentService
			.getList(paginatorParams, seachString)
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe((response: UsersPaginatedResponse) => {
				this.studentsPaginated = response.data;
				this.dataSource = new MatTableDataSource(this.studentsPaginated.data);
			});
	}

	editStudent(id: number): void {
		this._router.navigate(['alumnos/editar', id]);
	}

	ngOnDestroy(): void {
		this._unsubscribeAll.next(null);
		this._unsubscribeAll.complete();
	}

	paginate(event: PaginatorEvent): void {
		this.getStudents({page: event.pageIndex + 1, perPage: event.pageSize});
	}

	reenviarCorreoRegistro(id: number): void {
		this.resendingEmail = true;
		this._studentService.reenviarCorreoRegistro(id).subscribe((reponse) => {
			this.resendingEmail = false;
			this._globalService.openSnackBar(reponse.message);
		});
	}

	showStudentDetails(student: User): void {
		this.sidenav.student = student;
		this.sidenav.drawer.toggle();
		if(this.sidenav.drawer.opened){
			this._location.replaceState('/alumnos/detalles/' + student.id);
		}else{
			this._location.replaceState('/alumnos/lista');
		}
	}
}
