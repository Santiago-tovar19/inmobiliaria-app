import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'app/core/user/user.service';
import { Property } from 'app/interfaces/entities/properties';
import { DashboardsService } from 'app/modules/dashboards/service/dashboards.service';
import { PropertiesService } from 'app/modules/properties/service/properties.service';
import { UsersService } from 'app/modules/users/service/users.service';
import { environment } from 'environments/environment';
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
	environment = environment;
	bannerImgs = [];
	galleryImgs = [];
	featureProperties;
	user;

	constructor(
		private _propertiesService: PropertiesService,
		private _activatedRouter: ActivatedRoute,
		private sanitizer: DomSanitizer,
		private _userService: UserService,
		private _dashboardsService: DashboardsService
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
		this.getUser();

		this.getFeatureProperties();

		setTimeout(() => {
			if(!this.user || this.user?.role_id===4){
				this._propertiesService.registerView(this.user?.id, this.propertyID).subscribe(res => {
					console.log(res);
				});
			}
		}, 5000);
	}

	getUser(): void {
		this._userService._user.subscribe(res => {
			this.user = res;

		});
	}


	getProperty(): void {
		this._propertiesService.get(this.propertyID).subscribe(res => {
			this.property = res.data;
			this.bannerImgs = this.property.images.filter(img => img.type == 'Banner');
			this.galleryImgs = this.property.images.filter(img => img.type == 'Gallery');
		});
	}


	getFeatureProperties(): void {
		this._propertiesService.getFeatureProperties(this.propertyID).subscribe(res => {
			this.featureProperties = res.data;
		});
	}
	updateVideoUrl(url) {
		return this.sanitizer.bypassSecurityTrustResourceUrl(url);
	}

}
