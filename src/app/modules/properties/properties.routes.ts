import {Route} from '@angular/router';
import { ManagePropertyComponent } from './manage-property/manage-property.component';
import { PropertiesListComponent } from './properties-list/properties-list.component';

export default [
	{
		path: 'lista',
		component: PropertiesListComponent,
	},
	{
		path: 'crear',
		component: ManagePropertyComponent,
	},
	{
		path: 'editar/:id',
		component: ManagePropertyComponent,
	},
	{
		path: '',
		// redirectTo: 'lista',
		pathMatch: 'full', // <-- this is the important part
		redirectTo: 'lista',
	},
] as Route[];
