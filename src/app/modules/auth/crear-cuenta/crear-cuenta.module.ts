import {NgModule} from '@angular/core';
import {CrearCuentaComponent} from './crear-cuenta.component';
import {RouterModule} from '@angular/router';
import {crearCuentaRoutes} from './crear-cuenta.routing';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {FuseAlertModule} from '@fuse/components/alert';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
	declarations: [CrearCuentaComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(crearCuentaRoutes),
		MatButtonModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		MatCheckboxModule,
		FuseAlertModule
	],
})
export class CrearCuentaModule {}
