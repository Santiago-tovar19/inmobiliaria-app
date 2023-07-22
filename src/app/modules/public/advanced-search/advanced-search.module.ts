import { CommonModule, NgStyle } from '@angular/common';
import { AdvancedSearchComponent } from './advanced-search.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { advancedRoutes } from './advanced-search.routing';
import { CarouselModule } from 'app/shared-components/carousel/carousel.component';
import { PropertyCardModule } from 'app/modules/shared/property-card/property-card.module';

@NgModule({
	declarations: [],
	imports: [CommonModule, RouterModule.forChild(advancedRoutes), CarouselModule, PropertyCardModule, NgStyle],
})
export class AdvancedSearchModule {}
