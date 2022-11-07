import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PropertyViewComponent} from './property-view.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {HttpClientModule} from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';





@NgModule({
  declarations: [
    PropertyViewComponent
  ],
  imports: [
    CommonModule,
		MatIconModule,
    CarouselModule,
		FormsModule,
		MatExpansionModule,
		MatButtonModule,
		CarouselModule,
		HttpClientModule,
		MatFormFieldModule,
		MatProgressBarModule,
		MatInputModule,
		ReactiveFormsModule
  ]
})
export class PropertyViewModule { }
