import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { FuseLoadingBarComponent } from '../../../../@fuse/components/loading-bar/loading-bar.component';

@Component({
    selector: 'empty-layout',
    templateUrl: './empty.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [FuseLoadingBarComponent, NgIf, RouterOutlet]
})
export class EmptyLayoutComponent implements OnDestroy
{
	private _unsubscribeAll: Subject<any> = new Subject<any>();

	/**
     * Constructor
     */
	constructor()
	{
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Lifecycle hooks
	// -----------------------------------------------------------------------------------------------------

	/**
     * On destroy
     */
	ngOnDestroy(): void
	{
		// Unsubscribe from all subscriptions
		this._unsubscribeAll.next(null);
		this._unsubscribeAll.complete();
	}
}
