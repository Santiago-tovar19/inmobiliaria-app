import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, ReplaySubject} from 'rxjs';
import {User} from 'app/interfaces/entities/user';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	public userObject: User;
	private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

	/**
	 * Constructor
	 */
	constructor(private _httpClient: HttpClient) {}

	// -----------------------------------------------------------------------------------------------------
	// @ Accessors
	// -----------------------------------------------------------------------------------------------------

	get user$(): Observable<User> {
		return this._user.asObservable();
	}

	/**
	 * Setter & getter for user
	 *
	 * @param value
	 */
	set user(value: User) {
		// Store the value
		this.userObject = value;
		this._user.next(value);
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------------

	/**
	 * Get the current logged in user data
	 */
	// get(): Observable<Usuario> {
	// 	return this._httpClient.get<Usuario>('api/common/user').pipe(
	// 		tap((user) => {
	// 			this._user.next(user);
	// 		}),
	// 	);
	// }

	/**
	 * Update the user
	 *
	 * @param user
	 */
	// update(user: Usuario): Observable<Usuario> {
	// 	return this._httpClient.patch<Usuario>('api/common/user', {user}).pipe(
	// 		map((response) => {
	// 			this._user.next(response);
	// 			return response;
	// 		}),
	// 	);
	// }
}
