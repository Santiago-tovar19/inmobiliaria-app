import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { usersRoutes } from './users.routing';
import { ManageUserModule } from './manage-user/manage-user.module';
import { UsersListModule } from './users-list/users-list.module';



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
