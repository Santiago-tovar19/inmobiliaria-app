import { CommonModule, NgStyle } from '@angular/common';
import { AdvancedSearchComponent } from './advanced-search.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { advancedRoutes } from './advanced-search.routing';
import { CarouselModule } from 'app/shared-components/carousel/carousel.component';
import { PropertyCardModule } from 'app/modules/shared/property-card/property-card.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@NgModule({
	declarations: [],
	imports: [CommonModule, RouterModule.forChild(advancedRoutes), CarouselModule, PropertyCardModule, NgStyle, MatPaginatorModule, MatFormFieldModule, MatChipsModule, FormsModule, ReactiveFormsModule],
})
export class AdvancedSearchModule {}
