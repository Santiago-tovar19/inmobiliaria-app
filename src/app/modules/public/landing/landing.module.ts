import { NgModule } from '@angular/core';
import { CommonModule, NgStyle, NgClass } from '@angular/common';
import { LandingComponent } from './landing.component';
import { RouterModule } from '@angular/router';
import { landingRoutes } from './home.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { CarouselModule } from 'app/shared-components/carousel/carousel.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PropertyCardModule } from 'app/modules/shared/property-card/property-card.module';

@NgModule({
	imports: [
		RouterModule.forChild(landingRoutes),
		NgStyle,
		FormsModule,
		CarouselModule,
		ReactiveFormsModule,
		MatIconModule,
		MatChipsModule,
		LandingComponent,
		MatFormFieldModule,
		FormsModule,
		CommonModule,
		PropertyCardModule
	],
})
export class LandingModule {}
