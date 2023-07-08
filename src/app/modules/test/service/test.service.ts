import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
	providedIn: 'root'
})
export class TestService {

	constructor(
		private _http: HttpClient
	) { }


	uploadFile(file: File): any{
		const formData = new FormData();
		formData.append('file', file);
		return this._http.post(`${environment.api}/contacts/upload-file`, formData);
	}
}
