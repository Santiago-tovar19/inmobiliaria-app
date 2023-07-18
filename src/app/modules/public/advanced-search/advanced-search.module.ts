import { CommonModule } from '@angular/common';
import { AdvancedSearchComponent } from './advanced-search.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { advancedRoutes } from './advanced-search.routing';

@NgModule({
	declarations: [],
	imports: [CommonModule, RouterModule.forChild(advancedRoutes)],
})
export class AdvancedSearchModule {}
