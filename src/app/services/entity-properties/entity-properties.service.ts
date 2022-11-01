import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntityPropertiesService {

  constructor(
		private _http: HttpClient
	) { }

  getAllRoles(): Observable<any> {
    return this._http.get(`${environment.api}/get-all-roles`);
  }
}
