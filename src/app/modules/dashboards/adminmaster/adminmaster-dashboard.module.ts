import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Route, RouterModule } from '@angular/router';
import { AdminMasterDashboardComponent } from './adminmaster-dashboard.component';

const exampleRoutes: Route[] = [
    {
        path     : '',
        component: AdminMasterDashboardComponent
    }
];

@NgModule({
    declarations: [
        AdminMasterDashboardComponent
    ],
    imports     : [
				CommonModule,
        RouterModule.forChild(exampleRoutes),
				MatButtonModule,
				MatIconModule
    ]
})
export class AdminMasterDashboardModule
{
}
