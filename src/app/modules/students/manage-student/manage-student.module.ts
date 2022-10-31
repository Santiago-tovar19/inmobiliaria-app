import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManageStudentComponent} from './manage-student.component';
import {FuseAlertModule} from '@fuse/components/alert';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelect, MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatTabsModule} from '@angular/material/tabs';
import { FileInputModule } from 'app/shared/file-input/file-input.module';




@NgModule({
	declarations: [ManageStudentComponent],
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
		MatNativeDateModule,
		MatTabsModule,
		FileInputModule
	],
})
export class ManageStudentModule {}
