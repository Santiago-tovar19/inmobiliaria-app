import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { propertiesRoutes } from './properties.routing';
import { PropertiesListModule } from './properties-list/properties-list.module';
import { ManagePropertyModule } from './manage-property/manage-property.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
		RouterModule.forChild(propertiesRoutes),
		PropertiesListModule,
		ManagePropertyModule
  ]
})
export class PropertiesModule { }
