import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import {Subject, takeUntil} from 'rxjs';
import {FuseMediaWatcherService} from '@fuse/services/media-watcher';
import {FuseNavigationService, FuseVerticalNavigationComponent} from '@fuse/components/navigation';
import {Navigation} from 'app/core/navigation/navigation.types';
import {NavigationService} from 'app/core/navigation/navigation.service';
import {UserService} from 'app/core/user/user.service';
import {User} from 'app/interfaces/entities/user';
import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { UserComponent } from '../../../common/user/user.component';
import { FuseVerticalNavigationComponent as FuseVerticalNavigationComponent_1 } from '../../../../../@fuse/components/navigation/vertical/vertical.component';
import { FuseLoadingBarComponent } from '../../../../../@fuse/components/loading-bar/loading-bar.component';

@Component({
    selector: 'classy-layout',
    templateUrl: './classy.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        FuseLoadingBarComponent,
        FuseVerticalNavigationComponent_1,
        UserComponent,
        NgFor,
        NgIf,
        RouterOutlet,
        TitleCasePipe,
    ],
})
export class ClassyLayoutComponent implements OnInit, OnDestroy {
	isScreenSmall: boolean;
	user: User;
	breadcrumbs: string[] = [];
	@Input() spacing: boolean = false;
	private _unsubscribeAll: Subject<any> = new Subject<any>();

	/**
	 * Constructor
	 */
	constructor(
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
		public _navigationService: NavigationService,
		private _userService: UserService,
		private _fuseMediaWatcherService: FuseMediaWatcherService,
		private _fuseNavigationService: FuseNavigationService,
	) {}

	// -----------------------------------------------------------------------------------------------------
	// @ Accessors
	// -----------------------------------------------------------------------------------------------------

	/**
	 * Getter for current year
	 */
	get currentYear(): number {
		return new Date().getFullYear();
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Lifecycle hooks
	// -----------------------------------------------------------------------------------------------------

	/**
	 * On init
	 */
	ngOnInit(): void {

		this.breadcrumbs = this._router.url.split('/').map(path => path.replace('-', ' ') ).filter(path => path !== '');
		this._router.events.subscribe((event) => {
			if (!(event instanceof NavigationEnd)){
				return;
			}
			// Breadcrumb
			this.breadcrumbs = event.url.split('/').map(path => path.replace('-', ' ') ).filter(path => path !== '');
		});

		// Subscribe to navigation data
		this._navigationService.navigation$
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe((navigation: Navigation) => {
				// console.log(navigation);
				this._navigationService.navi = navigation;
			});

		this._userService.user$.pipe(takeUntil(this._unsubscribeAll)).subscribe((user) => {
			console.log(user);
			this._navigationService.navi.default = this._navigationService.formatMenu(user as any);
		});

		// Subscribe to the user service
		this._userService.user$.pipe(takeUntil(this._unsubscribeAll)).subscribe((user: any) => {
			this.user = user;
		});

		// Subscribe to media changes
		this._fuseMediaWatcherService.onMediaChange$
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe(({matchingAliases}) => {
				// Check if the screen is small
				this.isScreenSmall = !matchingAliases.includes('md');
			});
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		// Unsubscribe from all subscriptions
		this._unsubscribeAll.next(null);
		this._unsubscribeAll.complete();
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------------

	/**
	 * Toggle navigation
	 *
	 * @param name
	 */
	toggleNavigation(name: string): void {
		// Get the navigation
		const navigation = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(name);

		if (navigation) {
			// Toggle the opened status
			navigation.toggle();
		}
	}
}
