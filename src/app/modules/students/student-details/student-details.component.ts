import {Location} from '@angular/common';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import { User } from 'app/interfaces/entities/user';

@Component({
	selector: 'app-student-details',
	templateUrl: './student-details.component.html',
	styleUrls: ['./student-details.component.scss'],
})
export class StudentDetailsComponent implements OnInit {
	@ViewChild('drawer', {static: true}) drawer: MatSidenav;
	student: User = {} as any;

	constructor(
		private _location: Location,
	) {}

	ngOnInit(): void {}
	cerrarDetalles(): void{
		this._location.replaceState('/alumnos/lista');
		this.drawer.toggle();
	}
}
