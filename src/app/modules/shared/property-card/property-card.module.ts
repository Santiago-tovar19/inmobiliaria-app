import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PropertyCardComponent } from './property-card.component';



@NgModule({
	declarations: [PropertyCardComponent],
    imports: [
        CommonModule,
				MatIconModule
    ],
    exports: [PropertyCardComponent]
})
export class PropertyCardModule { }
