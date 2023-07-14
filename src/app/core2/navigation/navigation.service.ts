import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, ReplaySubject, tap} from 'rxjs';
import {Navigation} from 'app/core/navigation/navigation.types';
import {FuseNavigationItem} from '@fuse/components/navigation';
import {User} from 'app/interfaces/entities/user';

@Injectable({
	providedIn: 'root',
})
export class NavigationService {
	public navi: Navigation = {} as any;
	private _navigation: ReplaySubject<Navigation> = new ReplaySubject<Navigation>(1);

	/**
	 * Constructor
	 */
	constructor(private _httpClient: HttpClient) {}

	// -----------------------------------------------------------------------------------------------------
	// @ Accessors
	// -----------------------------------------------------------------------------------------------------

	/**
	 * Getter for navigation
	 */
	get navigation$(): Observable<Navigation> {
		return this._navigation.asObservable();
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------------

	/**
	 * Get all navigation data
	 */
	get(): Observable<Navigation> {
		// return this.navigation$;
		return this._httpClient.get<Navigation>('api/common/navigation').pipe(
			tap(() => {
				this._navigation.next(this.navi);
			}),
		);
	}

	formatMenu(user: User): FuseNavigationItem[] {

		const navigation: FuseNavigationItem[] = [];
		navigation.push({
			id: 'inicio',
			title: 'Dashboard',
			type: 'basic',
			icon: 'dashboard',
			link: '/dashboard',
		});

		const modules = user.modules.map(module => ({
			id: module.id+'',
			title: module.name,
			type: 'basic',
			icon: module.icon,
			link: `/${module.path}`,
		}));

		navigation.push(...modules as any);
		return navigation;
	}
}
