import {Route} from '@angular/router';
import { PropertiesListComponent } from './properties-list/properties-list.component';

export const propertiesRoutes: Route[] = [
	{
		path: 'lista',
		component: PropertiesListComponent,
	},
	// {
	// 	path: 'crear',
	// 	component: ManageUserComponent,
	// },
	// {
	// 	path: 'editar/:id',
	// 	component: ManageUserComponent,
	// },
    {
		path: '',
		// redirectTo: 'lista',
        pathMatch: 'full', // <-- this is the important part
        redirectTo: 'lista',
	},
];
