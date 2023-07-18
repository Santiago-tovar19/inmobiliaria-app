import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalUserComponent } from './modal-user/modal-user.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
    ReactiveFormsModule,
    
	],
	exports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule
	],
	declarations: [
   ModalUserComponent
	]
})
export class SharedModule
{
}
