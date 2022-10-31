import {Route} from '@angular/router';
import { ManageAsignatureComponent } from './manage-asignature/manage-asignature.component';
import { AsignatureDetailsComponent } from './asignature-details/asignature-details.component';
import { AsignaturesListComponent } from './asignatures-list/asignatures-list.component';

export const asignaturesRoutes: Route[] = [
	{
		path: 'lista',
		component: AsignaturesListComponent,
	},
	{
		path: 'crear',
		component: ManageAsignatureComponent,
	},
	{
		path: 'editar/:id',
		component: ManageAsignatureComponent,
	},
	{
		path: 'detalles/:id',
		component: AsignaturesListComponent,
	},
    {
		path: '',
		// redirectTo: 'lista',
        pathMatch: 'full', // <-- this is the important part
        redirectTo: 'lista',
	},
];
