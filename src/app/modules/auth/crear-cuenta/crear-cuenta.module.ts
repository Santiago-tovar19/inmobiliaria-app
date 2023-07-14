import {NgModule} from '@angular/core';
import {CrearCuentaComponent} from './crear-cuenta.component';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
// import {FuseAlertModule} from '@fuse/components/alert';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatCheckboxModule,
        // FuseAlertModule,
        MatProgressSpinnerModule,
        CrearCuentaComponent
    ],
})
export class CrearCuentaModule {}
