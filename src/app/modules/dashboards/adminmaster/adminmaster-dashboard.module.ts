import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Route, RouterModule } from '@angular/router';
import { AdminMasterDashboardComponent } from './adminmaster-dashboard.component';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        AdminMasterDashboardComponent
    ]
})
export class AdminMasterDashboardModule
{
}
