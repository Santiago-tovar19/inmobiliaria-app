import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { environment } from 'environments/environment';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    public _authenticated: boolean = false;

    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService
    ) {}

    // Access token
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    resetPassword(password: string): Observable<any> {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    signIn(credentials: { email: string; password: string }): Observable<any> {
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post(`${environment.api}/auth/sign-in`, credentials).pipe(
            switchMap((response: any) => {
                this.accessToken = response.data.accessToken;
                this._authenticated = true;
                this._userService.user = response.data.user;
                this._userService._user.next(response.data.user);
                return of(response);
            })
        );
    }

    // 🔐 Login automático como admin
    signInAsAdmin(): Observable<any> {
        const credentials = {
            email: 'santiago@gmail.com', // <-- Cambia si usas otro
            password: 'admin123'         // <-- Cambia si usas otro
        };

        return this.signIn(credentials);
    }

    // ✅ Validar token existente usando Authorization header
    signInUsingToken(): Observable<any> {
        const token = this.accessToken;

        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`
        });

        return this._httpClient
            .post(`${environment.api}/auth/check-auth`, {}, { headers })
            .pipe(
                catchError(() => of(false)),
                switchMap((response: any) => {
                    response = response.data;

                    if (response.accessToken) {
                        this.accessToken = response.accessToken;
                    }

                    this._authenticated = true;
                    this._userService.user = response.user;
                    this._userService._user.next(response.user);

                    return of(true);
                })
            );
    }

    signOut(): Observable<any> {
        localStorage.removeItem('accessToken');
        this._userService._user.next(null);
        this._userService.user = null;
        this._authenticated = false;
        return of(true);
    }

    signUp(user: {
        name: string;
        email: string;
        password: string;
        company: string;
    }): Observable<any> {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    unlockSession(credentials: {
        email: string;
        password: string;
    }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    check(): Observable<boolean> {
        if (this._authenticated) {
            return of(true);
        }

        if (!this.accessToken) {
            return of(false);
        }

        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }

        return this.signInUsingToken();
    }
}
