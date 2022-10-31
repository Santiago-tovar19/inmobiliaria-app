import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {ExcerptPipesModule} from 'app/pipes/excerpt/excerpt.pipe';
import { AsignatureDetailsComponent } from './asignature-details.component';


@NgModule({
	declarations: [
		AsignatureDetailsComponent
	],
	imports: [
		CommonModule,
		MatSidenavModule,
		MatExpansionModule,
		MatIconModule,
		MatButtonModule,
		ExcerptPipesModule
	],
	exports: [AsignatureDetailsComponent],
})
export class AsignatureDetailsModule {}
