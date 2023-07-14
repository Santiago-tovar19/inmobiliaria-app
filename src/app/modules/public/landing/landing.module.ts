import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { RouterModule } from '@angular/router';
import { landingRoutes } from './home.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [LandingComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(landingRoutes),
		FormsModule,
		ReactiveFormsModule
	],
})
export class LandingModule {}
