import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
// import { FuseCardModule } from '@fuse/components/card';
import { SharedModule } from 'app/shared/shared.module';
import { AuthConfirmationRequiredComponent } from 'app/modules/auth/confirmation-required/confirmation-required.component';

@NgModule({
    imports: [
        MatButtonModule,
        // FuseCardModule,
        SharedModule,
        AuthConfirmationRequiredComponent
    ]
})
export class AuthConfirmationRequiredModule
{
}
