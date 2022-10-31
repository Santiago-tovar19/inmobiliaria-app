import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsListComponent } from './contacts-list.component';
import { FileInputModule } from 'app/modules/shared/file-input/file-input.module';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { FuseAlertModule } from '@fuse/components/alert';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [
    ContactsListComponent
  ],
  imports: [
    CommonModule,
		MatButtonModule,
		MatFormFieldModule,
		MatSelectModule,
		ReactiveFormsModule,
		RouterModule,
		FormsModule,
		MatInputModule,
		MatTooltipModule,
		MatInputModule,
		MatTableModule,
		NgxMatSelectSearchModule,
		FuseAlertModule,
		MatPaginatorModule,
		FileInputModule,
  ]
})
export class ContactsListModule { }
