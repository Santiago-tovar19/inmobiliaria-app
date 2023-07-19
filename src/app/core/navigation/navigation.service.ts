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
	public navi: FuseNavigationItem[] = [];
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
	// get(): Observable<Navigation> {
	// 	// return this.navigation$;
	// 	return this._httpClient.get<Navigation>('api/common/navigation').pipe(
	// 		tap(() => {
	// 			this._navigation.next(this.navi);
	// 		}),
	// 	);
	// }

	buildMenu(user: User | null = null, layout: 'theme-default'): void {

		const navigation: FuseNavigationItem[] = [];

		if(layout === 'theme-default') {
			this.getPublicMenu().map(i => navigation.push(i));
		}

		if(user) {
			this.getAuthMenu(user).map(i => navigation.push(i));
		}

		if(!user){
			navigation.push({
				id: 'sign-in',
				title: 'Iniciar sesión',
				type: 'basic',
				icon: 'dashboard',
				link: '/ingresar',
			});
		}

		if(JSON.stringify(navigation) !== JSON.stringify(this.navi)){
			this.navi = navigation;
		}
	}


	getPublicMenu(): FuseNavigationItem[] {

		return [
			{
				id: 'inicio',
				title: 'Inicio',
				type: 'basic',
				icon: 'dashboard',
				link: '/',
			},
			{
				id: 'propiedades',
				title: 'Propiedades',
				type: 'basic',
				icon: 'home',
				link: '/buscador-avanzado',
			}
		]
	}

	getAuthMenu(user): FuseNavigationItem[] {

		const authMenu: FuseNavigationItem[] = [];

		if(user.role_id !== 4){
			authMenu.push({
				id: 'inicio',
				title: 'Dashboard',
				type: 'basic',
				icon: 'dashboard',
				link: '/dashboard',
			});
		}

		const modules = user.modules.map(module => ({
			id: module.id+'',
			title: module.name,
			type: 'basic',
			icon: module.icon,
			link: `/${module.path}`,
		}));

		modules.push({
			id: 'sign-out',
			title: 'Cerrar sesión',
			type: 'basic',
			icon: 'dashboard',
			link: '/cerrar-sesion',
		});

		authMenu.push(...modules as any);

		return authMenu;

	}
}
