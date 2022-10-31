import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {FuseAlertModule} from '@fuse/components/alert';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {AsignaturesListComponent} from './asignatures-list.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {SharedModule} from 'app/shared/shared.module';
import { AsignatureDetailsModule } from '../asignature-details/asignature-details.module';
import { RouterModule } from '@angular/router';


@NgModule({
	declarations: [AsignaturesListComponent],
	imports: [
		CommonModule,
		RouterModule,
		MatTableModule,
		MatPaginatorModule,
		MatButtonModule,
		MatSnackBarModule,
		FuseAlertModule,
		AsignatureDetailsModule,
		MatSidenavModule,
		MatFormFieldModule,
		MatInputModule,
		SharedModule
	],
})
export class AsignaturesListModule {}
