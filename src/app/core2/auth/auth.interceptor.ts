import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {catchError, map, Observable, throwError} from 'rxjs';
import {AuthService} from 'app/core/auth/auth.service';
import {AuthUtils} from 'app/core/auth/auth.utils';
import {Router} from '@angular/router';
import {GlobalService} from 'app/services/global/global.service';
import { environment } from 'environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	/**
	 * Constructor
	 */
	constructor(
		private _authService: AuthService,
		private _router: Router,
		private _globalService: GlobalService,
	) {}

	/**
	 * Intercept
	 *
	 * @param req
	 * @param next
	 */
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// Clone the request object
		let newReq = req.clone();

		// Request
		//
		// If the access token didn't expire, add the Authorization header.
		// We won't add the Authorization header if the access token expired.
		// This will force the server to return a "401 Unauthorized" response
		// for the protected API routes which our response interceptor will
		// catch and delete the access token from the local storage while logging
		// the user out from the app.
		if (this._authService.accessToken) {
			newReq = req.clone({
				headers: req.headers
					.set('Authorization', 'Bearer ' + this._authService.accessToken)
				,
			});
		}

		newReq = newReq.clone({
			headers: newReq.headers.set('App', environment.app)
		});

		// Response
		return next.handle(newReq).pipe(
			map((response: HttpResponse<any>) => {
				// Catch 204 responses
				if (response.status === 204) {
					this._globalService.openSnackBar('Registro no econtrado en el sistema', 5000, 'error');
					// Convert to HttpErrorResponse
					response = new HttpErrorResponse({
						status: 422,
						statusText: 'Registro no encontrado',
						url: req.url,
					}) as any;
				}
				return response;
			}),
			catchError((error) => {
				// Catch "401 Unauthorized" responses
				if (error instanceof HttpErrorResponse && error.status === 401) {
					// // Sign out
					this._authService.signOut();

					// // Reload the app
					// location.reload();
				}

				return throwError(error.error);
			}),
		);
	}
}
