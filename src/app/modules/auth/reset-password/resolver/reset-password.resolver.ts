import {Injectable} from '@angular/core';
import {Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {AuthService} from 'app/core/auth/auth.service';
import {Observable, of} from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ResetPasswordResolver implements Resolve<boolean> {
	constructor(private _authService: AuthService, private _router: Router) {}
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		// Get token from query params
		const token = route.queryParams.token;
		const email = route.queryParams.email;
		this._authService.checkPasswordResetToken(token, email).subscribe(
			() => of(true),
			() => this._router.navigate(['/ingresar']),
		);
		return of(true);
	}
}
