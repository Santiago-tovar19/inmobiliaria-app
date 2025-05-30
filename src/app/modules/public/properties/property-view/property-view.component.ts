import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { UserService } from 'app/core/user/user.service';
import { Property } from 'app/interfaces/entities/properties';
import { DashboardsService } from 'app/modules/dashboards/service/dashboards.service';
import { PropertiesService } from 'app/modules/properties/service/properties.service';
import { ImagesViewerComponent } from 'app/modules/shared/images-viewer/images-viewer.component';
import { ImagesViewerModule } from 'app/modules/shared/images-viewer/images-viewer.module';
import { UsersService } from 'app/modules/users/service/users.service';
import { AppointmentService } from 'app/services/appointment/appointment-service.service';
import { CarouselModule } from 'app/shared-components/carousel/carousel.component';
import { ModalUserComponent } from 'app/shared-components/modal-user/modal-user.component';
import { SharedModule } from 'app/shared-components/shared.module';
import { environment } from 'environments/environment';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import Modern from 'ngx-sharebuttons/themes/modern.scss';
import { filter } from 'rxjs';

@Component({
	selector: 'app-property-view',
	templateUrl: './property-view.component.html',
	styleUrls: ['./property-view.component.scss'],
	standalone: true,
	imports: [NgIf, NgFor, MatIconModule, RouterModule, FormsModule, MatExpansionModule, MatButtonModule, HttpClientModule, MatFormFieldModule, MatTabsModule, MatDialogModule, MatProgressBarModule, MatInputModule, ImagesViewerModule, ReactiveFormsModule, CarouselModule, CommonModule, SharedModule, ShareButtonsModule, ShareIconsModule],
})
export class PropertyViewComponent implements OnInit {
	propertyID: string;
	property: Property = {} as any;
	brokerID: string;
	environment = environment;
	bannerImgs = [];
	galleryImgs = [];
	featureProperties;
	user;
	mapUrl: any;
	favorite: any;
	number: number = 0;
	public currentUrl: string;
	public serverResponse: string;
	public showServerResponse: boolean = false;
	public mainSeeker: FormGroup;
	public contactForm: FormGroup = this.formBuilder.group({
		email: ['', [Validators.required, Validators.email]],
		phone: ['', [Validators.required, Validators.minLength(6)]],
		message: ['', [Validators.required]],
	});

	constructor(
		private _propertiesService: PropertiesService,
		private _activatedRouter: ActivatedRoute,
		private sanitizer: DomSanitizer,
		private _userService: UserService,
		private _usersServices: UsersService,
		private _dashboardsService: DashboardsService,
		public dialog: MatDialog,
		private router: Router,
		private formBuilder: FormBuilder,
		private _dialog: MatDialog,
		private _authService: AuthService,
	) {}

	ngOnInit(): void {
		this._activatedRouter.params.subscribe((params) => {
			if (params.id) {
				this.propertyID = params.id;
				this.getProperty();
			} else {
				this.propertyID = '1';
				this.getProperty();
			}
		});
		this.getUser();

		this.getFeatureProperties();

		this.getPropertyInFavorites(this.propertyID);

		this.mainSeeker = this.formBuilder.group({
			advanced: [false],
		});

		this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
			this.currentUrl = window.location.href;
		});

		setTimeout(() => {
			if (!this.user || this.user?.role_id === 4) {
				this._propertiesService.registerView(this.user?.id, this.propertyID, this.brokerID).subscribe((res) => {
					console.log(res);
				});
			}
		}, 5000);
	}

	getUser(): void {
		this._userService._user.subscribe((res) => {
			this.user = res;
		});
	}

	getProperty(): void {
		this._propertiesService.get(this.propertyID).subscribe((res) => {
			this.property = res.data;
			this.brokerID = res.data.broker_id;
			this.bannerImgs = this.property.images.filter((img) => img.type == 'Banner');
			this.galleryImgs = this.property.images.filter((img) => img.type == 'Gallery');
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
		this._propertiesService.getFeatureProperties(this.propertyID).subscribe((res) => {
			this.featureProperties = res.data;
		});
	}

	openDialog(mainImage, imagesType: 'Banner' | 'Gallery'): void {
		const images = this.property.images
			.filter((img) => img.type == imagesType)
			.map((img) => {
				return environment.assets + '/storage/properties/' + img.name;
			});

		const dialogRef = this.dialog.open(ImagesViewerComponent, {
			data: { images: images, mainImage: mainImage },
			width: '60vw',
			height: '90vh',
		});

		dialogRef.afterClosed().subscribe((result) => {
			console.log(`Dialog result: ${result}`);
		});
	}

	goToProperty(id: string): void {
		console.log('Hola que tal');
		this.router.navigate(['/propiedades/', id]);
	}

	getVideoUrl() {
		return this.sanitizer.bypassSecurityTrustResourceUrl(environment.assets + '/storage/properties/' + this.property.video);
	}

	sanitizeUrl() {
		const url = `https://maps.google.com/maps?q=${this.property.lat},${this.property.lon}&hl=es&z=14&amp&output=embed`;
		return this.sanitizer.bypassSecurityTrustResourceUrl(url);
	}

	addFavoriteProperty(propertyID: any, fav: any): void {
		if (this._authService._authenticated === false) {
			this.abrirModal();
		} else {
			this._usersServices.postPropertyFavorites(propertyID, fav).subscribe((response): any => {
				this.favorite = response.message;
			});
		}
	}

	getPropertyInFavorites(propertyID: any): void {
		this._usersServices.isPropertyInFavorites(propertyID).subscribe((response) => {
			// console.log('desde getfavorite', response);
			this.favorite = response.message;
		});
	}

	itsFavorite() {
		if (this.favorite === '1') {
			return true;
		} else {
			return false;
		}
	}

	onSubmit(formData: any, formDirective: FormGroupDirective) {
		if (this.contactForm.invalid) {
			return;
		}

		this.registerAppointment();
		console.log(this.contactForm.value);
		formDirective.resetForm();
		this.contactForm.reset();
	}

	registerAppointment() {
		this._propertiesService.registerAppointment(this.propertyID, this.contactForm.value.email, this.contactForm.value.phone, this.contactForm.value.message).subscribe((res) => {
			this.serverResponse = res.message;
			this.showServerResponse = true;

			setTimeout(() => {
				this.showServerResponse = false;
			}, 5000);
		});
	}

	abrirModal(): void {
		const dialogRef = this._dialog.open(ModalUserComponent, {
			width: '400px',
		});

		dialogRef.afterClosed().subscribe((result) => {
			console.log('El modal se cerró');
		});
	}

	toggleAdvanced(): void {
		const bool = !this.mainSeeker.get('advanced').value;
		this.mainSeeker.get('advanced').setValue(bool);
	}
}
