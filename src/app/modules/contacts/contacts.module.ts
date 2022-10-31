import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { contactsRoutes } from './contacts.routing';
import { ManageContactModule } from './manage-contact/manage-contact.module';
import { ContactsListModule } from './contacts-list/contacts-list.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
		RouterModule.forChild(contactsRoutes),
		ManageContactModule,
		ContactsListModule
  ]
})
export class ContactsModule { }
