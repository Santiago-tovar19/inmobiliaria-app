import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-modal-user',
	templateUrl: './modal-user.component.html',
	styleUrls: ['./modal-user.component.scss'],
})
export class ModalUserComponent {
	constructor(public dialogRef: MatDialogRef<ModalUserComponent>) {}

	cerrarModal(): void {
		this.dialogRef.close();
	}
}
