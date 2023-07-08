import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BrokersResponse } from 'app/interfaces/entities/brokers';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class BrokersService {

	constructor(
		private _http: HttpClient,
	) { }

	getAll(): Observable<BrokersResponse>{
		return this._http.get<BrokersResponse>(`${environment.api}/brokers/get-all`);

	}
}
