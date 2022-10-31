import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageContactComponent } from './manage-contact.component';
import { FileInputModule } from 'app/modules/shared/file-input/file-input.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    ManageContactComponent
  ],
  imports: [
    CommonModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		ReactiveFormsModule,
		FormsModule,
		MatButtonModule,
		FileInputModule
  ]
})
export class ManageContactModule { }
