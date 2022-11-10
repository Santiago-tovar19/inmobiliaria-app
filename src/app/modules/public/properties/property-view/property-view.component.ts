import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Property } from 'app/interfaces/entities/properties';
import { PropertiesService } from 'app/modules/properties/service/properties.service';
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

	propertyID: string;
	property: Property = {} as any;

	constructor(
		private _propertiesService: PropertiesService,
		private _activatedRouter: ActivatedRoute,
		private sanitizer: DomSanitizer
	) { }

	ngOnInit(): void {

		this._activatedRouter.params.subscribe(params => {
			if(params.id) {
				this.propertyID = params.id;
				this.getProperty();
			}else{
				this.propertyID = '1';
				this.getProperty();
			}
		});
	}


	getProperty(): void {
		this._propertiesService.get(this.propertyID).subscribe(res => {
			this.property = res.data;
		});
	}

	updateVideoUrl(url) {
		return this.sanitizer.bypassSecurityTrustResourceUrl(url);
	}

}
