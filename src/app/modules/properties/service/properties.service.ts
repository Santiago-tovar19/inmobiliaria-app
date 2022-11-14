import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatorParams } from 'app/interfaces/general/paginator-params';
import { SearchObject } from 'app/modules/users/service/users.service';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

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

		return this._httpClient.get<any>(`${environment.api}/properties`, {params});
	}

	get(id: string): Observable<any> {
		return this._httpClient.get<any>(`${environment.api}/properties/${id}`);
	}

	getFeatures(): Observable<any> {
		return this._httpClient.get<any>(`${environment.api}/properties/get-features`);
	}

	crear(data: any, images: File[], bannerImgs: File[]): Observable<any> {
		const formData = new FormData();
		Object.keys(data).forEach(key => {
			formData.append(key, data[key]);
		});
		images.forEach(image => {
			formData.append('images[]', image, image.name);
		});
		bannerImgs.forEach(image => {
			formData.append('bannerImgs[]', image, image.name);
		});
		const headers = new HttpHeaders();
		headers.append('Content-Type', 'multipart/form-data');
		headers.append('Accept', 'application/json');

		return this._httpClient.post<any>(`${environment.api}/properties`, formData, {headers});
	}

	actualizar(id, data: any, images: File[], bannerImgs: File[]): Observable<any> {
		const formData = new FormData();
		Object.keys(data).forEach(key => {
			formData.append(key, data[key]);
		});
		images.forEach(image => {
			formData.append('images[]', image, image.name);
		});
		bannerImgs.forEach(image => {
			formData.append('bannerImgs[]', image, image.name);
		});
		const headers = new HttpHeaders();
		headers.append('Content-Type', 'multipart/form-data');
		headers.append('Accept', 'application/json');
		headers.append('_method', 'PUT');

		return this._httpClient.post<any>(`${environment.api}/properties/${id}?_method=PUT`, formData, {headers});
	}
}
