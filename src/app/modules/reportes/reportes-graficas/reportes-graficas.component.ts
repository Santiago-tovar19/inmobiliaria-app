import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FileInputModule } from 'app/modules/shared/file-input/file-input.module';
import { Subject } from 'rxjs';
import { ReportesService } from '../service/reportes.service';
import { AppointmentService } from 'app/services/appointment/appointment-service.service';
import { PaginatorParams } from '../../../interfaces/general/paginator-params';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

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
		MatDatepickerModule,
		MatNativeDateModule,
	],
	providers: [DatePipe],
})
export class ReportesGraficasComponent implements OnInit, OnDestroy {
	public chart: any;
	public chart2: any;
	columns: Array<string> = ['id', 'propiedad', 'email', 'phone', 'message'];
	dataSource: MatTableDataSource<any>;
	appointmenstPaginated: any;
	m: '1' | '2' | null = null;
	_unsubscribeAll: Subject<any> = new Subject<any>();
	public viewsPorDia = [0, 0, 0, 0, 0, 0, 0];
	public viewsData: any[] = [];
	public contactosPorDia = [0, 0, 0, 0, 0, 0, 0];
	public contactosData: any[] = [];
	public seachFormGroup: FormGroup;
	public range = new FormGroup({
		start: new FormControl<Date | null>(null),
		end: new FormControl<Date | null>(null),
	});

	public range2 = new FormGroup({
		start2: new FormControl<Date | null>(null),
		end2: new FormControl<Date | null>(null),
	});

	constructor(private _reportesService: ReportesService, private appoitmentsService: AppointmentService, private _formBuilder: FormBuilder, private datePipe: DatePipe) {}

	ngOnDestroy(): void {
		throw new Error('Method not implemented.');
	}

	ngOnInit(): void {
		this.seachFormGroup = this._formBuilder.group({
			termino: [''],
		});
		this.getAppointments({});
		this.getAllAppointments({});
		this.range.valueChanges.subscribe(() => {
			this.filterViews();
		});
		this.range2.valueChanges.subscribe(() => {
			this.filterAppointmentsDate();
		});
		this.getViews({});
	}

	chartContructor() {
		if (this.chart) this.chart.destroy();
		this.chart = new Chart('canvas', {
			type: 'bar',
			data: {
				labels: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
				datasets: [
					{
						label: '',
						data: this.viewsPorDia,
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

		this.chart.update();
		if (this.chart2) this.chart2.destroy();
		this.chart2 = new Chart('canvas2', {
			type: 'bar',
			data: {
				labels: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
				datasets: [
					{
						label: '',
						data: this.contactosPorDia,
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

		this.chart2.update();
	}

	getViews(search: any): void {
		this._reportesService.getAllViews(search).subscribe((res: any) => {
			console.log(res);
			this.viewsPorDia = [0, 0, 0, 0, 0, 0, 0];
			this.viewsData = res.data;
			for (const views of this.viewsData) {
				const dayOfWeek = views.day_of_week;
				this.viewsPorDia[dayOfWeek] += 1;
				console.log(this.viewsPorDia);
			}
			this.chartContructor();
		});
	}

	filterViews() {
		if (this.range.value.start && this.range.value.end) {
			const formattedStartDate = this.datePipe.transform(this.range.value.start, 'yyyy-MM-dd HH:mm:ss');
			const formattedEndDate = this.datePipe.transform(this.range.value.end, 'yyyy-MM-dd HH:mm:ss');
			console.log(formattedStartDate, formattedEndDate);
			this.getViews({ start: formattedStartDate, end: formattedEndDate });
		}
	}

	getAllAppointments(search: any): void {
		this.appoitmentsService.getAllAppointments(search).subscribe((response: any) => {
			console.log(response);
			this.contactosPorDia = [0, 0, 0, 0, 0, 0, 0];
			this.contactosData = response.data;
			for (const contactos of this.contactosData) {
				const dayOfWeek = contactos.day_of_week;
				this.contactosPorDia[dayOfWeek] += 1;
				console.log(this.contactosPorDia);
			}
			this.chartContructor();
		});
	}

	filterAppointmentsDate() {
		if (this.range2.value.start2 && this.range2.value.end2) {
			const formattedStartDate2 = this.datePipe.transform(this.range2.value.start2, 'yyyy-MM-dd HH:mm:ss');
			const formattedEndDate2 = this.datePipe.transform(this.range2.value.end2, 'yyyy-MM-dd HH:mm:ss');
			console.log(formattedStartDate2, formattedEndDate2);
			this.getAllAppointments({ start: formattedStartDate2, end: formattedEndDate2 });
		}
	}

	getAppointments(search: any, paginatorParams: PaginatorParams = { page: 1, perPage: 10 }): void {
		this.appoitmentsService.getList(search, paginatorParams).subscribe((response: any) => {
			this.dataSource = new MatTableDataSource(response.data.data);
			console.log(response);
			this.appointmenstPaginated = response.data;
		});
	}

	paginate(event: PageEvent): void {
		this.getAppointments(this.seachFormGroup.value, { page: event.pageIndex + 1, perPage: event.pageSize });
	}

	filterAppointments(): void {
		this.getAppointments(this.seachFormGroup.value);
		console.log(this.seachFormGroup.value);
	}
}
