import { NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from 'app/core/user/user.service';
import { Property } from 'app/interfaces/entities/properties';
import { DashboardsService } from 'app/modules/dashboards/service/dashboards.service';
import { PropertiesService } from 'app/modules/properties/service/properties.service';
import { ImagesViewerComponent } from 'app/modules/shared/images-viewer/images-viewer.component';
import { ImagesViewerModule } from 'app/modules/shared/images-viewer/images-viewer.module';
import { environment } from 'environments/environment';

@Component({
	selector: 'app-property-view',
	templateUrl: './property-view.component.html',
	styleUrls: ['./property-view.component.scss'],
	standalone: true,
	imports: [
		NgIf,
		NgFor,

		MatIconModule,
		RouterModule,
		FormsModule,
		MatExpansionModule,
		MatButtonModule,
		HttpClientModule,
		MatFormFieldModule,
		MatTabsModule,
		MatDialogModule,
		MatProgressBarModule,
		MatInputModule,
		ImagesViewerModule,
		ReactiveFormsModule
	]
})
export class PropertyViewComponent implements OnInit {



	propertyID: string;
	property: Property = {} as any;
	environment = environment;
	bannerImgs = [];
	galleryImgs = [];
	featureProperties;
	user;
	mapUrl: any;

	constructor(
		private _propertiesService: PropertiesService,
		private _activatedRouter: ActivatedRoute,
		private sanitizer: DomSanitizer,
		private _userService: UserService,
		private _dashboardsService: DashboardsService,
		public dialog: MatDialog,
		private router: Router
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
			this.mapUrl = this.sanitizeUrl();
		});
	}

	updateVideoUrl(url) {
		// get yoputube video id
		const videoId = url.split('v=')[1];
		// set video url
		const videoUrl = 'https://www.youtube.com/embed/' + videoId;
		return this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
	}


	getFeatureProperties(): void {
		this._propertiesService.getFeatureProperties(this.propertyID).subscribe(res => {
			this.featureProperties = res.data;
		});
	}

	openDialog(mainImage, imagesType: 'Banner' | 'Gallery'): void{

		const images = this.property.images.filter(img => img.type == imagesType).map(img => {
			return environment.assets + '/storage/properties/' + img.name;
		});

		const dialogRef = this.dialog.open(ImagesViewerComponent, {
			data: {images: images, mainImage: mainImage},
			width: '60vw',
			height: '90vh',
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log(`Dialog result: ${result}`);
		});
	}

	goToProperty(id: string): void {
		console.log('Hola que tal');
		this.router.navigate(['/propiedad/', id]);
	}

	getVideoUrl(){
		return this.sanitizer.bypassSecurityTrustResourceUrl(environment.assets+'/storage/properties/'+this.property.video);
	}

	sanitizeUrl(){
		const url = `https://maps.google.com/maps?q=${this.property.lat},${this.property.lon}&hl=es&z=14&amp&output=embed`;
		return this.sanitizer.bypassSecurityTrustResourceUrl(url);
	}
}
