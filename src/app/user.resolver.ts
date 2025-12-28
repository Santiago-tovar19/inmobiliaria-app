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
import { HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class UserResolver implements Resolve<boolean> {
	constructor(private _authService: AuthService, private _httpClient: HttpClient, public _userService: UserService) {}
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		const token = this._authService.accessToken;

		if (!token) {
			// Realiza el login automático aquí mismo
			return this._authService.signInAsAdmin().pipe(
				map(() => true),
				catchError(() => of(true)), // Aunque falle, que no rompa
			);
		}

		// Si ya hay token, intenta validar
		const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

		return this._httpClient.post(`${environment.api}/auth/check-auth`, {}, { headers }).pipe(
			map((response: any) => {
				this._userService._user.next(response.data.user);
				return true;
			}),
			catchError(() => of(true)),
		);
	}
}

