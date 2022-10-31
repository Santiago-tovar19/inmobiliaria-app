import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, of, switchMap, throwError} from 'rxjs';
import {AuthUtils} from 'app/core/auth/auth.utils';
import {UserService} from 'app/core/user/user.service';
import {environment} from 'environments/environment';
import {HttpSimpleResponse} from 'app/interfaces/http-responses/http-simple-response';
import {SignInSuccessResponse} from 'app/interfaces/modules/auth';

@Injectable()
export class AuthService {
	private _authenticated: boolean = false;

	/**
	 * Constructor
	 */
	constructor(private _httpClient: HttpClient, private _userService: UserService) {}

	// -----------------------------------------------------------------------------------------------------
	// @ Accessors
	// -----------------------------------------------------------------------------------------------------

	/**
	 * Setter & getter for access token
	 */
	set accessToken(token: string) {
		localStorage.setItem('accessToken', token);
	}

	// eslint-disable-next-line @typescript-eslint/member-ordering
	get accessToken(): string {
		return localStorage.getItem('accessToken') ?? '';
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------------

	/**
	 * Forgot password
	 *
	 * @param email
	 */
	forgotPassword(email: string): Observable<HttpSimpleResponse> {
		return this._httpClient.post<HttpSimpleResponse>(`${environment.api}/auth/forgot-password`, {email});
	}

	/**
	 * Check Password reset token
	 *
	 * @param token
	 */
	checkPasswordResetToken(token: string, email: string): Observable<any> {
		return this._httpClient.post(`${environment.api}/auth/check-password-reset-token`, {token, email});
	}

	/**
	 * Reset password
	 *
	 * @param password
	 * @param passwordConfirmation
	 * @param token
	 * @param email
	 */
	// eslint-disable-next-line @typescript-eslint/naming-convention
	resetPassword(password: string, password_confirmation: string, token: string, email: string): Observable<HttpSimpleResponse> {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		const data = {password, password_confirmation, token, email};
		return this._httpClient.post<HttpSimpleResponse>(`${environment.api}/auth/reset-password`, data);
	}

	/**
	 * Sign in
	 *
	 * @param credentials
	 */
	signIn(credentials: {email: string; password: string}): Observable<any> {
		// Throw error, if the user is already logged in
		if (this._authenticated) {
			return throwError('User is already logged in.');
		}

		return this._httpClient.post(`${environment.api}/auth/sign-in`, credentials).pipe(
			switchMap((response: SignInSuccessResponse) => {
				// Store the access token in the local storage
				this.accessToken = response.data.accessToken;

				// Set the authenticated flag to true
				this._authenticated = true;

				// Store the user on the user service
				this._userService.user = response.data.user;

				// Return a new observable with the response
				return of(response);
			}),
		);
	}

	/**
	 * Sign in using the access token
	 */
	signInUsingToken(): Observable<any> {
		// Renew token
		return this._httpClient
			.post(`${environment.api}/auth/check-auth`, {
				accessToken: this.accessToken,
			})
			.pipe(
				catchError(() =>
					// Return false
					of(false),
				),
				switchMap((response: any) => {
					if(!response){
						return of(false);
					}
					// Store the access token in the local storage
					// this.accessToken = response.data.accessToken;

					// Set the authenticated flag to true
					this._authenticated = true;

					// Store the user on the user service
					this._userService.user = response.data.user;

					// Return true
					return of(true);
				}),
			);
	}

	/**
	 * Sign out
	 */
	signOut(): Observable<any> {
		// Remove the access token from the local storage
		localStorage.removeItem('accessToken');

		// Set the authenticated flag to false
		this._authenticated = false;

		// Return the observable
		return of(true);
	}

	/**
	 * Sign up
	 *
	 * @param user
	 */
	signUp(user: {name: string; email: string; password: string; company: string}): Observable<any> {
		return this._httpClient.post('api/auth/sign-up', user);
	}

	/**
	 * Unlock session
	 *
	 * @param credentials
	 */
	unlockSession(credentials: {email: string; password: string}): Observable<any> {
		return this._httpClient.post('api/auth/unlock-session', credentials);
	}

	/**
	 * Check the authentication status
	 */
	check(): Observable<boolean> {
		// Check if the user is logged in
		if (this._authenticated) {
			return of(true);
		}

		// Check the access token availability
		if (!this.accessToken) {
			return of(false);
		}

		// Check the access token expire date
		if (AuthUtils.isTokenExpired(this.accessToken)) {
			return of(false);
		}

		// If the access token exists and it didn't expire, sign in using it
		return this.signInUsingToken();
	}
}
