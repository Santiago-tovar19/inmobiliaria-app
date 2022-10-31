import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {asignaturesRoutes} from './asignatures.routing';
import { ManageAsignatureModule } from './manage-asignature/manage-asignature.module';
import { AsignaturesListModule } from './asignatures-list/asignatures-list.module';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		RouterModule.forChild(asignaturesRoutes),

		ManageAsignatureModule,
		AsignaturesListModule
	],
})
export class AsignaturesModule {}
