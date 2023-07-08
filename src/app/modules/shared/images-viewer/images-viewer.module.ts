import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesViewerComponent } from './images-viewer.component';
import {CarouselModule} from 'ngx-owl-carousel-o';



@NgModule({
	declarations: [
		ImagesViewerComponent
	],
	imports: [
		CommonModule,
		CarouselModule
	],
	exports: [
		ImagesViewerComponent
	]
})
export class ImagesViewerModule { }
