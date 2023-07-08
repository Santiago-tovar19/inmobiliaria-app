import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
	providedIn: 'root'
})
export class DashboardsService {

	constructor(
		private _httpClient: HttpClient
	) { }

	getAdminMasterDashboard() {
		return this._httpClient.get(`${environment.api}/dashboard/adminmaster`);
	}
}
