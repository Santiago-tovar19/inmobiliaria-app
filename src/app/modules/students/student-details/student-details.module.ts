import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {ExcerptPipesModule} from 'app/pipes/excerpt/excerpt.pipe';
import { StudentDetailsComponent } from './student-details.component';


@NgModule({
	declarations: [
		StudentDetailsComponent
	],
	imports: [
		CommonModule,
		MatSidenavModule,
		MatExpansionModule,
		MatIconModule,
		MatButtonModule,
		ExcerptPipesModule
	],
	exports: [StudentDetailsComponent],
})
export class StudentDetailsModule {}
