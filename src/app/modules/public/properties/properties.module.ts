import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { PropertyViewComponent } from './property-view/property-view.component';
import { PropertyViewModule } from './property-view/property-view.module';

const routes: Route[] = [
	// {
	// 	path: ':id',
	// 	component: PropertyViewComponent,
	// },
	{
		path: '',
		component: PropertyViewComponent,
	}
]

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		PropertyViewModule
	],
})
export class PropertyModule {}
