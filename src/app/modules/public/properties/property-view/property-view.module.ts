import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyViewComponent } from './property-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ExcerptPipesModule } from 'app/pipes/excerpt/excerpt.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { ImagesViewerModule } from 'app/modules/shared/images-viewer/images-viewer.module';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [PropertyViewComponent],
	imports: [CommonModule, MatIconModule, RouterModule, FormsModule, MatExpansionModule, MatButtonModule, CarouselModule, HttpClientModule, MatFormFieldModule, MatTabsModule, MatDialogModule, MatProgressBarModule, MatInputModule, ImagesViewerModule, ReactiveFormsModule],
})
export class PropertyViewModule {}
