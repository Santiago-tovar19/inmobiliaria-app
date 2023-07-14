import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseLoadingBarModule } from '@fuse/components/loading-bar';
import { SharedModule } from 'app/shared/shared.module';
import { EmptyLayoutComponent } from 'app/layout/layouts/empty/empty.component';

@NgModule({
    imports: [
        RouterModule,
        FuseLoadingBarModule,
        SharedModule,
        EmptyLayoutComponent
    ],
    exports: [
        EmptyLayoutComponent
    ]
})
export class EmptyLayoutModule
{
}
