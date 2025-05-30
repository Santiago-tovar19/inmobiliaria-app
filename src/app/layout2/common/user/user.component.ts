import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	Input,
	OnDestroy,
	OnInit,
	ViewEncapsulation,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {BooleanInput} from '@angular/cdk/coercion';
import {Subject, takeUntil} from 'rxjs';
import {UserService} from 'app/core/user/user.service';
import {User} from 'app/interfaces/entities/user';
import { MatDividerModule } from '@angular/material/divider';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'user',
    standalone: true,
    imports: [
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        NgIf,
        MatDividerModule,
        RouterLink,
    ],
})
export class UserComponent implements OnInit, OnDestroy {
	/* eslint-disable @typescript-eslint/naming-convention */
	static ngAcceptInputType_showAvatar: BooleanInput;
	/* eslint-enable @typescript-eslint/naming-convention */

	@Input() showAvatar: boolean = true;
	user: User;

	private _unsubscribeAll: Subject<any> = new Subject<any>();

	/**
	 * Constructor
	 */
	constructor(
		private _changeDetectorRef: ChangeDetectorRef,
		private _router: Router,
		private _userService: UserService,
	) {}

	// -----------------------------------------------------------------------------------------------------
	// @ Lifecycle hooks
	// -----------------------------------------------------------------------------------------------------

	/**
	 * On init
	 */
	ngOnInit(): void {
		// Subscribe to user changes
		this._userService.user$.pipe(takeUntil(this._unsubscribeAll)).subscribe((user: User) => {
			this.user = user;

			// Mark for check
			this._changeDetectorRef.markForCheck();
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
	 * Update the user status
	 *
	 * @param status
	 */
	//  status: string
	updateUserStatus(): void {
		// Return if user is not available
		if (!this.user) {
			return;
		}

		// Update the user
		// this._userService
		// 	.update({
		// 		...this.user,
		// 		// status
		// 	})
		// 	.subscribe();
	}

	/**
	 * Sign out
	 */
	signOut(): void {
		this._router.navigate(['/sign-out']);
	}
}
