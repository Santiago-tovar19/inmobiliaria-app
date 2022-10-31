import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {studentsRoutes} from './students.routing';
import { ManageStudentModule } from './manage-student/manage-student.module';
import { StudentsListModule } from './students-list/students-list.module';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		RouterModule.forChild(studentsRoutes),

		ManageStudentModule,
		StudentsListModule
	],
})
export class StudentsModule {}
