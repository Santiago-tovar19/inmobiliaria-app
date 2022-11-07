import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { environment } from 'environments/environment';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from './core/auth/auth.service';
import { NavigationService } from './core/navigation/navigation.service';
import { UserService } from './core/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<boolean> {
	constructor(
		private _authService: AuthService,
		private _httpClient: HttpClient,
		private _userService: UserService,
	) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // Fork jin multiple API endpoint calls to wait all of them to finish
		return this._httpClient.post(`${environment.api}/auth/check-auth`, {
				accessToken: this._authService.accessToken,
			}).pipe(
			map((response: any) => {
				console.log(response);
				this._userService._user.next(response.data.user);
				return of(true);
			}),
			catchError(() =>{
				return of(true);
			})
		) as any;
  }
}
