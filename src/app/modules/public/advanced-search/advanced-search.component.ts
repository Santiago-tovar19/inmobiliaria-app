import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AuthService } from 'app/core/auth/auth.service';
import { UserService } from 'app/core/user/user.service';
import { FuseAlertService } from '../../../../@fuse/components/alert/alert.service';
import { ModalUserComponent } from 'app/shared-components/modal-user/modal-user.component';

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
		if (
			this._authService._authenticated === false
			// && !this._userService.user
		) {
			this.abrirModal();
		}
	}

	abrirModal(): void {
		const dialogRef = this._dialog.open(ModalUserComponent, {
			width: '400px',
		});

		dialogRef.afterClosed().subscribe((result) => {
			console.log('El modal se cerró');
		});
	}
}
