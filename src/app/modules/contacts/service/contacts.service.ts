import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatorParams } from 'app/interfaces/general/paginator-params';
import { HttpSimpleResponse } from 'app/interfaces/http-responses/http-simple-response';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(
		private _httpClient: HttpClient
	) { }


	getList(search: SearchObject, paginatorParams?: PaginatorParams): Observable<any> {
		const params = new HttpParams({
			fromObject: {
				...paginatorParams,
				...search
			},
		} as any);

		return this._httpClient.get<any>(`${environment.api}/contacts`, {params});
	}

	getAll(search: SearchObject): Observable<any> {
		const params = new HttpParams({
			fromObject: {
				...search
			},
		} as any);

		return this._httpClient.get<any>(`${environment.api}/contacts/get-all`, {params});
	}

	get(id: string): Observable<any> {
		return this._httpClient.get<any>(`${environment.api}/contacts/${id}`);
	}

	uploadFile(file: File): Observable<HttpSimpleResponse> {
		const formData = new FormData();
		formData.append('file', file, file.name);

		const headers = new HttpHeaders();
		headers.append('Content-Type', 'multipart/form-data');
		headers.append('Accept', 'application/json');

		return this._httpClient.post<HttpSimpleResponse>(`${environment.api}/contacts/upload-file`, formData, {headers});
	}

	create(data: any): Observable<HttpSimpleResponse> {
		return this._httpClient.post<HttpSimpleResponse>(`${environment.api}/contacts`, data);
	}
	update(id: string, data: any): Observable<HttpSimpleResponse> {
		return this._httpClient.put<HttpSimpleResponse>(`${environment.api}/contacts/${id}`, data);
	}

	getPropertyEntities(): Observable<any> {
		return this._httpClient.get<any>(`${environment.api}/contacts/get-property-entities`);
	}

}


export interface SearchObject{
	city?: string;
	company?: string;
	profession?: string;
	file?: string;
}
