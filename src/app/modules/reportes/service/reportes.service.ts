import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ReportesService {
	constructor(private _httpClient: HttpClient) {}

	getAllViews(): Observable<any> {
		return this._httpClient.get<any>(`${environment.api}/properties/get-property-views`);
	}
}
