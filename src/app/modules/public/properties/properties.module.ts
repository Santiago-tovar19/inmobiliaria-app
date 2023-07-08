import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { PropertyViewComponent } from './property-view/property-view.component';
import { PropertyViewModule } from './property-view/property-view.module';
import { ExcerptPipesModule } from 'app/pipes/excerpt/excerpt.pipe';

const routes: Route[] = [
	{
		path: 'propiedad/:id',
		component: PropertyViewComponent,
	},
	{
		path: '',
		component: PropertyViewComponent,
	}
];

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		PropertyViewModule
	],
})
export class PropertyModule {}
