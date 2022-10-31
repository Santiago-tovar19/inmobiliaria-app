import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {FuseAlertModule} from '@fuse/components/alert';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {StudentsListComponent} from './students-list.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {SharedModule} from 'app/shared/shared.module';
import { StudentDetailsModule } from '../student-details/student-details.module';
import { RouterModule } from '@angular/router';


@NgModule({
	declarations: [StudentsListComponent],
	imports: [
		CommonModule,
		RouterModule,
		MatTableModule,
		MatPaginatorModule,
		MatButtonModule,
		MatSnackBarModule,
		FuseAlertModule,
		StudentDetailsModule,
		MatSidenavModule,
		MatFormFieldModule,
		MatInputModule,
		SharedModule
	],
})
export class StudentsListModule {}
