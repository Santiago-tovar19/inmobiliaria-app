import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-property-view',
  templateUrl: './property-view.component.html',
  styleUrls: ['./property-view.component.scss']
})
export class PropertyViewComponent implements OnInit {

	customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
		margin: 5,
		stagePadding: 50,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 2
			},
    },
    nav: true
  }

	constructor() { }

	ngOnInit(): void {
	}

}
