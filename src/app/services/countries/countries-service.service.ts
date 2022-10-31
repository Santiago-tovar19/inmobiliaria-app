import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesServiceService {

  constructor(
		private _httpClient: HttpClient,
	) { }

	getCountries(): Observable<Countries> {
		return this._httpClient.get<Countries>(`${environment.api}/get-countries`);

	}
}

interface Countries {
	id: number;
	name: string;
}
