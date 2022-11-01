import {Route} from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { ManageUserComponent } from './manage-user/manage-user.component';

export const usersRoutes: Route[] = [
	{
		path: 'lista',
		component: UsersListComponent,
	},
	{
		path: 'crear',
		component: ManageUserComponent,
	},
	{
		path: 'editar/:id',
		component: ManageUserComponent,
	},
    {
		path: '',
		// redirectTo: 'lista',
        pathMatch: 'full', // <-- this is the important part
        redirectTo: 'lista',
	},
];
