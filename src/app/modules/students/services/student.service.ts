import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { User, UserResponse, UsersPaginatedResponse } from 'app/interfaces/entities/user';
import {PaginatorParams} from 'app/interfaces/general/paginator-params';
import {HttpSimpleResponse} from 'app/interfaces/http-responses/http-simple-response';
import {environment} from 'environments/environment';
import {Observable} from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class StudentService {
	constructor(private _httpClient: HttpClient) {}

	create(student: User): Observable<HttpSimpleResponse> {
		return this._httpClient.post<HttpSimpleResponse>(`${environment.api}/students`, student);
	}

	getList(paginatorParams?: PaginatorParams, searchString: string = ''): Observable<UsersPaginatedResponse> {
		const params = new HttpParams({
			fromObject: {
				...paginatorParams,
				searchString: searchString
			},
		} as any);

		return this._httpClient.get<UsersPaginatedResponse>(`${environment.api}/students`, {params});
	}

	get(id: number | string): Observable<UserResponse> {
		return this._httpClient.get<UserResponse>(`${environment.api}/students/${id}`);
	}

	update(student: User, id: number): Observable<HttpSimpleResponse> {
		return this._httpClient.put<HttpSimpleResponse>(`${environment.api}/students/${id}`, student);
	}

	reenviarCorreoRegistro(id: number): Observable<HttpSimpleResponse> {
		return this._httpClient.post<HttpSimpleResponse>(`${environment.api}/students/reenviar-correo-registro/${id}`, {});
	}

	uploadFiles(file: File): Observable<HttpSimpleResponse> {
		const formData = new FormData();
		formData.append('file', file, file.name);

		const headers = new HttpHeaders();
		headers.append('Content-Type', 'multipart/form-data');
		headers.append('Accept', 'application/json');

		return this._httpClient.post<HttpSimpleResponse>(`${environment.api}/students/upload-files`, formData, {headers});
	}
}
