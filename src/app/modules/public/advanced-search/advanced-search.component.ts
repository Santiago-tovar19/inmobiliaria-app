import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AuthService } from 'app/core/auth/auth.service';
import { UserService } from 'app/core/user/user.service';
import { FuseAlertService } from '../../../../@fuse/components/alert/alert.service';

@Component({
	selector: 'app-advanced-search',
	templateUrl: './advanced-search.component.html',
	styleUrls: ['./advanced-search.component.scss'],
	standalone: true,
	imports: [],
})
export class AdvancedSearchComponent implements OnInit {
	constructor(private _router: Router, private _dialog: MatDialog, private _authService: AuthService, private _userService: UserService, private _fuseAlertService: FuseAlertService) {}

	ngOnInit(): void {
		if (2 > 1) {
			// !this._userService.user
		}
		// if (this._authService._authenticated) {
		// 	//
		// }
	}
}
