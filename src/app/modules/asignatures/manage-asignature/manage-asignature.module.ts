import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManageAsignatureComponent} from './manage-asignature.component';
import {FuseAlertModule} from '@fuse/components/alert';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelect, MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
	declarations: [ManageAsignatureComponent],
	imports: [
		CommonModule,
		FuseAlertModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		FormsModule,
		ReactiveFormsModule,
		MatIconModule,
		MatButtonModule,
		MatDatepickerModule,
		MatNativeDateModule
	],
})
export class ManageAsignatureModule {}
