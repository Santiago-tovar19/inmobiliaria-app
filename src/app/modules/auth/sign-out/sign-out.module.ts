import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
// import { FuseCardModule } from '@fuse/components/card';
import { SharedModule } from 'app/shared/shared.module';
import { AuthSignOutComponent } from 'app/modules/auth/sign-out/sign-out.component';

@NgModule({
    imports: [
        MatButtonModule,
        // FuseCardModule,
        SharedModule,
        AuthSignOutComponent
    ]
})
export class AuthSignOutModule
{
}
