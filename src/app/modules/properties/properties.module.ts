import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { propertiesRoutes } from './properties.routing';
import { PropertiesListModule } from './properties-list/properties-list.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
		RouterModule.forChild(propertiesRoutes),
		PropertiesListModule
  ]
})
export class PropertiesModule { }
