import { Route } from '@angular/router';
import { UsersListComponent } from '../users/users-list/users-list.component';
import { ManageUserComponent } from '../users/manage-user/manage-user.component';
import { ReportesGraficasComponent } from './reportes-graficas/reportes-graficas.component';

export default [
	{
		path: '',
		component: ReportesGraficasComponent,
	},
	{
		path: '',
		// redirectTo: 'lista',
		pathMatch: 'full', // <-- this is the important part
		redirectTo: '',
	},
] as Route[];
