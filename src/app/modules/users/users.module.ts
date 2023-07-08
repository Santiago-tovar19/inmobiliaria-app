import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ManageUserModule } from './manage-user/manage-user.module';
import { UsersListModule } from './users-list/users-list.module';
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

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		RouterModule.forChild(usersRoutes),
		ManageUserModule,
		UsersListModule
	]
})
export class UsersModule { }
