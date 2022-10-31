import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Asignature, AsignatureResponse, AsignaturesPaginatedResponse, AsignaturesResponse } from 'app/interfaces/entities/asignatures';
import {PaginatorParams} from 'app/interfaces/general/paginator-params';
import {HttpSimpleResponse} from 'app/interfaces/http-responses/http-simple-response';
import {environment} from 'environments/environment';
import {Observable} from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AsignaturesService {
	constructor(private _httpClient: HttpClient) {}

	create(asignature: Asignature): Observable<HttpSimpleResponse> {
		return this._httpClient.post<HttpSimpleResponse>(`${environment.api}/asignatures`, asignature);
	}

	getList(paginatorParams?: PaginatorParams, searchString: string = ''): Observable<AsignaturesPaginatedResponse> {
		const params = new HttpParams({
			fromObject: {
				...paginatorParams,
				searchString: searchString
			},
		} as any);

		return this._httpClient.get<AsignaturesPaginatedResponse>(`${environment.api}/asignatures`, {params});
	}

	get(id: number | string): Observable<AsignatureResponse> {
		return this._httpClient.get<AsignatureResponse>(`${environment.api}/asignatures/${id}`);
	}

	update(asignature: Asignature, id: number): Observable<HttpSimpleResponse> {
		return this._httpClient.put<HttpSimpleResponse>(`${environment.api}/asignatures/${id}`, asignature);
	}

	getAll(): Observable<AsignaturesResponse> {
		return this._httpClient.get<AsignaturesResponse>(`${environment.api}/get-all-asignatures`);
	}
}
