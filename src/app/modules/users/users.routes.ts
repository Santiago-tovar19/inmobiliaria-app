import { Route } from "@angular/router";
import { ManageUserComponent } from "./manage-user/manage-user.component";
import { UsersListComponent } from "./users-list/users-list.component";

export default [
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
] as Route[];