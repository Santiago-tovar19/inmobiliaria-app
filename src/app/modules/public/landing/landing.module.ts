import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { RouterModule } from '@angular/router';
import { landingRoutes } from './home.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
	declarations: [LandingComponent],
	imports: [CommonModule, RouterModule.forChild(landingRoutes), FormsModule, ReactiveFormsModule, MatIconModule, MatChipsModule],
})
export class LandingModule {}
