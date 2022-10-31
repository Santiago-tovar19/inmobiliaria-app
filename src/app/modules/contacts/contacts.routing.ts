import {Route} from '@angular/router';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ManageContactComponent } from './manage-contact/manage-contact.component';

export const contactsRoutes: Route[] = [
	{
		path: 'lista',
		component: ContactsListComponent,
	},
	{
		path: 'crear',
		component: ManageContactComponent,
	},
	{
		path: 'editar/:id',
		component: ManageContactComponent,
	},
    {
		path: '',
		// redirectTo: 'lista',
        pathMatch: 'full', // <-- this is the important part
        redirectTo: 'lista',
	},
];
