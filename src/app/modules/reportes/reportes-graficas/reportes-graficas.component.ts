import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FileInputModule } from 'app/modules/shared/file-input/file-input.module';
import { Subject } from 'rxjs';
import { ReportesService } from '../service/reportes.service';

@Component({
	selector: 'app-reportes-graficas',
	templateUrl: './reportes-graficas.component.html',
	styleUrls: ['./reportes-graficas.component.scss'],
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
		NgxMatSelectSearchModule,
		// FuseAlertModul,
		MatPaginatorModule,
		MatSnackBarModule,
		FileInputModule,
	],
})
export class ReportesGraficasComponent implements OnInit {
	chart: any = [];
	chart2: any = [];
	columns: Array<string> = ['id', 'propiedad', 'usuario', 'agente', 'broker', 'fecha', 'status', 'acciones'];
	dataSource: MatTableDataSource<any>;
	usersPaginated: any;
	m: '1' | '2' | null = null;
	_unsubscribeAll: Subject<any> = new Subject<any>();
	viewsPorDia = [0, 0, 0, 0, 0, 0, 0];
	viewsData: any[] = [];

	constructor(private _reportesService: ReportesService) {}

	ngOnInit(): void {
		this.getViews();
	}

	getViews() {
		this._reportesService.getAllViews().subscribe((res) => {
			console.log(res);
			this.viewsData = res.data;
			for (const views of this.viewsData) {
				const dayOfWeek = views.day_of_week;
				this.viewsPorDia[dayOfWeek] += 1;
				console.log(this.viewsPorDia);
			}
			this.chartContructor();
		});
	}

	chartContructor() {
		this.chart = new Chart('canvas', {
			type: 'bar',
			data: {
				labels: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
				datasets: [
					{
						label: '',
						data: /* this.viewsPorDia (descomentar para produccion y borrar el arreglo siguiente que solo es demostrativo)*/ [10, 14, 7, 20, 12, 13, 10],
						backgroundColor: ['#3b82f6', '#3b82f6', '#3b82f6', '#3b82f6', '#3b82f6', '#3b82f6'],
					},
				],
			},
			options: {
				interaction: {
					mode: 'index',
					intersect: false,
				},
				plugins: {
					legend: {
						display: false,
					},
				},
			},
		});

		this.chart2 = new Chart('canvas2', {
			type: 'bar',
			data: {
				labels: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
				datasets: [
					{
						label: '',
						data: [10, 14, 7, 20, 12, 13, 5],
						backgroundColor: ['#3b82f6', '#3b82f6', '#3b82f6', '#3b82f6', '#3b82f6', '#3b82f6'],
					},
				],
			},
			options: {
				interaction: {
					mode: 'index',
					intersect: false,
				},
				plugins: {
					legend: {
						display: false,
					},
				},
			},
		});
	}
}
