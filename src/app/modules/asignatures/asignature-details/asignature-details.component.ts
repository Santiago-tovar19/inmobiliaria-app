import {Location} from '@angular/common';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {Asignature} from 'app/interfaces/entities/asignatures';
import { User } from 'app/interfaces/entities/user';

@Component({
	selector: 'app-asignature-details',
	templateUrl: './asignature-details.component.html',
	styleUrls: ['./asignature-details.component.scss'],
})
export class AsignatureDetailsComponent implements OnInit {
	@ViewChild('drawer', {static: true}) drawer: MatSidenav;
	asignature: Asignature = {} as any;

	constructor(
		private _location: Location,
	) {}

	ngOnInit(): void {}
	cerrarDetalles(): void{
		this._location.replaceState('/asignaturas/lista');
		this.drawer.toggle();
	}
}
