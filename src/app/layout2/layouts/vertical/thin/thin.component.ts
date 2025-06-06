import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { Navigation } from 'app/core/navigation/navigation.types';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { QuickChatComponent } from '../../../common/quick-chat/quick-chat.component';
import { NgIf } from '@angular/common';
import { UserComponent } from '../../../common/user/user.component';
import { NotificationsComponent } from '../../../common/notifications/notifications.component';
import { MessagesComponent } from '../../../common/messages/messages.component';
import { ShortcutsComponent } from '../../../common/shortcuts/shortcuts.component';
import { SearchComponent } from '../../../common/search/search.component';
import { FuseFullscreenComponent } from '../../../../../@fuse/components/fullscreen/fullscreen.component';
import { LanguagesComponent } from '../../../common/languages/languages.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FuseVerticalNavigationComponent as FuseVerticalNavigationComponent_1 } from '../../../../../@fuse/components/navigation/vertical/vertical.component';
import { FuseLoadingBarComponent } from '../../../../../@fuse/components/loading-bar/loading-bar.component';

@Component({
    selector: 'thin-layout',
    templateUrl: './thin.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [FuseLoadingBarComponent, FuseVerticalNavigationComponent_1, MatButtonModule, MatIconModule, LanguagesComponent, FuseFullscreenComponent, SearchComponent, ShortcutsComponent, MessagesComponent, NotificationsComponent, UserComponent, NgIf, RouterOutlet, QuickChatComponent]
})
export class ThinLayoutComponent implements OnInit, OnDestroy
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
		private _navigationService: NavigationService,
		private _fuseMediaWatcherService: FuseMediaWatcherService,
		private _fuseNavigationService: FuseNavigationService
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
				this.navigation = navigation;
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
