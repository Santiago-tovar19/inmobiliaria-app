import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ReportesService {
	constructor(private _httpClient: HttpClient) {}

	getAllViews(search: any): Observable<any> {
		const params = new HttpParams({
			fromObject: {
				...search,
			},
		} as any);
		return this._httpClient.get<any>(`${environment.api}/properties/get-property-views`, { params });
	}
}
