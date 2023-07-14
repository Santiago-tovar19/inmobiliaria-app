import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { Navigation } from 'app/core/navigation/navigation.types';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { UserService } from 'app/core/user/user.service';
import { UserComponent } from '../../../common/user/user.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FuseHorizontalNavigationComponent } from '../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import { FuseVerticalNavigationComponent as FuseVerticalNavigationComponent_1 } from '../../../../../@fuse/components/navigation/vertical/vertical.component';
import { NgIf } from '@angular/common';
import { FuseLoadingBarComponent } from '../../../../../@fuse/components/loading-bar/loading-bar.component';

@Component({
    selector: 'modern-layout',
    templateUrl: './modern.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [FuseLoadingBarComponent, NgIf, FuseVerticalNavigationComponent_1, FuseHorizontalNavigationComponent, MatButtonModule, MatIconModule, UserComponent, RouterOutlet]
})
export class ModernLayoutComponent implements OnInit, OnDestroy
{
	isScreenSmall: boolean;
	navigation: Navigation;
	private _unsubscribeAll: Subject<any> = new Subject<any>();

	/**
     * Constructor
     */
	constructor(
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
		public _navigationService: NavigationService,
		private _fuseMediaWatcherService: FuseMediaWatcherService,
		private _fuseNavigationService: FuseNavigationService,
		private _userService: UserService
	)
	{
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Accessors
	// -----------------------------------------------------------------------------------------------------

	/**
     * Getter for current year
     */
	get currentYear(): number
	{
		return new Date().getFullYear();
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Lifecycle hooks
	// -----------------------------------------------------------------------------------------------------

	/**
     * On init
     */
	ngOnInit(): void
	{
		// Subscribe to navigation data
		this._navigationService.navigation$
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe((navigation: Navigation) => {
				this._navigationService.navi = navigation;
			});

		// Subscribe to media changes
		this._fuseMediaWatcherService.onMediaChange$
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe(({matchingAliases}) => {

				// Check if the screen is small
				this.isScreenSmall = !matchingAliases.includes('md');
			});

		this._userService.user$.pipe(takeUntil(this._unsubscribeAll)).subscribe((user) => {
			this._navigationService.navi.default = this._navigationService.formatMenu(user);
		});
	}

	/**
     * On destroy
     */
	ngOnDestroy(): void
	{
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
	toggleNavigation(name: string): void
	{
		// Get the navigation
		const navigation = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(name);

		if ( navigation )
		{
			// Toggle the opened status
			navigation.toggle();
		}
	}
}
