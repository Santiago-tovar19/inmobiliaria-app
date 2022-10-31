import {Route} from '@angular/router';
import { ManageStudentComponent } from './manage-student/manage-student.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentsListComponent } from './students-list/students-list.component';

export const studentsRoutes: Route[] = [
	{
		path: 'lista',
		component: StudentsListComponent,
	},
	{
		path: 'crear',
		component: ManageStudentComponent,
	},
	{
		path: 'editar/:id',
		component: ManageStudentComponent,
	},
	{
		path: 'detalles/:id',
		component: StudentsListComponent,
	},
    {
		path: '',
		// redirectTo: 'lista',
        pathMatch: 'full', // <-- this is the important part
        redirectTo: 'lista',
	},
];
