import { Component, OnInit } from '@angular/core';
import { TestService } from './service/test.service';
import { FileInputComponent } from '../shared/file-input/file-input.component';
import {Slick} from 'slick-carousel';
import {jquery} from 'jquery';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss'],
    standalone: true,
    imports: [
			FileInputComponent,
			SlickCarouselModule,
			NgFor
		]
})
export class TestComponent implements OnInit {

	slides = [
    { img: 'https://via.placeholder.com/600.png/09f/fff' },
    { img: 'https://via.placeholder.com/600.png/021/fff' },
    { img: 'https://via.placeholder.com/600.png/321/fff' },
    { img: 'https://via.placeholder.com/600.png/422/fff' },
    { img: 'https://via.placeholder.com/600.png/654/fff' },
  ];
  slideConfig = {
		slidesToShow: 4,
		slidesToScroll: 4
	};

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }
  slickInit(e: any) {
    console.log('slick initialized');
  }
  breakpoint(e: any) {
    console.log('breakpoint');
  }
  afterChange(e: any) {
    console.log('afterChange');
  }
  beforeChange(e: any) {
    console.log('beforeChange');
  }
  constructor() {}
  ngOnInit(): void {}

}
