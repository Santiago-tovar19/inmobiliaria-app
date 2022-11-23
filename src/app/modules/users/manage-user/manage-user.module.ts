import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManageUserComponent} from './manage-user.component';
import {FileInputModule} from 'app/modules/shared/file-input/file-input.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    ManageUserComponent
  ],
  imports: [
    CommonModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		ReactiveFormsModule,
		FormsModule,
		MatIconModule,
		MatCheckboxModule,
		MatButtonModule,
		FileInputModule
  ]
})
export class ManageUserModule { }
