import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatorParams } from 'app/interfaces/general/paginator-params';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AppointmentService {
	constructor(private _httpClient: HttpClient) {}

	getList(search: any, paginatorParams?: PaginatorParams): Observable<any> {
		const params = new HttpParams({
			fromObject: {
				...paginatorParams,
				...search,
			},
		} as any);
		return this._httpClient.get<any>(`${environment.api}/appointments`, { params });
	}

	getAllAppointments(search: any): Observable<any> {
		const params = new HttpParams({
			fromObject: {
				...search,
			},
		} as any);
		return this._httpClient.get<any>(`${environment.api}/appointments/get-all-appointments`, { params });
	}
}
