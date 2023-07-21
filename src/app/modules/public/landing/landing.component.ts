import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { NgFor, NgStyle, NgClass, JsonPipe } from '@angular/common';
import { CarouselModule } from 'app/shared-components/carousel/carousel.component';
import { Router } from '@angular/router';
import { PropertiesService } from 'app/modules/properties/service/properties.service';
import { PaginatorParams } from 'app/interfaces/general/paginator-params';
import { PropertyCardModule } from 'app/modules/shared/property-card/property-card.module';
import { environment } from 'environments/environment';

@Component({
	selector: 'app-landing',
	templateUrl: './landing.component.html',
	styleUrls: ['./landing.component.scss'],
	standalone: true,
	imports: [
		MatChipsModule,
		FormsModule,
		CarouselModule,
		MatIconModule,
		NgStyle,
		NgFor,
		NgClass,
		ReactiveFormsModule,
		PropertyCardModule,
		JsonPipe
	],
})
export class LandingComponent implements OnInit {
	formLanding: FormGroup;
	mainSeeker: FormGroup;
	environment = environment;
	comprarSelected = false;
	alquilarSelected = false;
	dataProperties = [];
	lattestPropertiesBreakPoints;
	propertyTypesBreakPoints;
	featurePropertiesBreakPoints;
	images: string[] = [
		'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=pexels-binyamin-mellish-106399.jpg&fm=jpg',
		'https://cdn.pixabay.com/photo/2016/11/29/03/53/house-1867187_640.jpg',
		// Agrega más imágenes aquí
		//imagenes (slider 2)
	];
	imagesSliders: string[] = [
		'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
		'https://cdn.pixabay.com/photo/2016/11/29/03/53/house-1867187_640.jpg',
		'https://images.freeimages.com/images/large-previews/e85/house-1224030.jpg',
		'https://images.freeimages.com/images/large-previews/d5b/home-1224274.jpg',
		'https://www.gavias-theme.com/wp/tolips/wp-content/uploads/2020/12/post-2.jpg',
		'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
		'https://images.unsplash.com/photo-1600585153490-76fb20a32601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
		'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
		'https://images.unsplash.com/photo-1559329145-afaf18e3f349?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
		'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
	];
	indexs: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	currentImageIndex = 0;
	propertyTypes;

	constructor(private _formBuilder: FormBuilder, private _router: Router, private _propertiesService: PropertiesService) {}

	ngOnInit(): void {
		this.setFeaturePropertiesBreakPoints();
		this.setPropertyTypesBreakPoints();
		this.setLatestPropertiesBreakPoints();
		this.initForm();
		this.mainSeeker = this._formBuilder.group({
			advanced: [false],
		});

		setInterval(() => { this.currentImageIndex = ++this.currentImageIndex % this.images.length }, 7000);

		this.getPropertyType();
		this.getPropertiesList({}, { page: 1, perPage: 10 });
	}

	getPropertyType(): void {
		this._propertiesService.getPropertyTypes().subscribe((response: any) => {
			this.propertyTypes = response.data;
			},
		);
	}

	getPropertiesList(search: any, PaginatorParams: any = { page: 1, perPage: 10 }): void {
		this._propertiesService.getList({}).subscribe((response: any) => {
				this.dataProperties = response.data.data;
			}
		);
	}

	initForm(): void {
		this.formLanding = this._formBuilder.group({
			selec1: ['house y villa'],
			buyOrRent: [''],
			keywords: [''],
			region: ['ciudad1'],
			bathrooms: ['2'],
			bedrooms: ['2'],
			garages: ['1'],
			levels: ['1'],
			piscina: [null],
			parrillera: [null],
		});
	}

	onSubmit(): void {
		console.log(this.formLanding.value);
		this._router.navigate(['/buscador-avanzado']);
	}

	toggleAdvanced(): void {
		const bool = !this.mainSeeker.get('advanced').value;
		this.mainSeeker.get('advanced').setValue(bool);
	}

	alert() {
		alert('hola');
	}

	setLatestPropertiesBreakPoints() {
		this.lattestPropertiesBreakPoints = {
			'(min-width: 200px)': {
				slides: {
					perView: 1,
					spacing: 6,
				},
			},
			'(min-width: 700px)': {
				slides: {
					perView: 2,
					spacing: 12,
				},
			},
			'(min-width: 1300px)': {
				slides: {
					perView: 3,
					spacing: 15,
				},
			},
			'(min-width: 1800px)': {
				slides: {
					perView: 4,
					spacing: 15,
				},
			},
			'(min-width: 2222px)': {
				slides: {
					perView: 5,
					spacing: 15,
				},
			},
			'(min-width: 2900px)': {
				slides: {
					perView: 6,
					spacing: 15,
				},
			}
		};
	}

	setPropertyTypesBreakPoints() {
		this.propertyTypesBreakPoints = {
			'(min-width: 500px)': {
				slides: {
					perView: 1,
					spacing: 6,
				},
			},
			'(min-width: 700px)': {
				slides: {
					perView: 2,
					spacing: 12,
				},
			},
			'(min-width: 1000px)': {
				slides: {
					perView: 4,
					spacing: 15,
				},
			},
			'(min-width: 1800px)': {
				slides: {
					perView: 5,
					spacing: 15,
				},
			},
			'(min-width: 2222px)': {
				slides: {
					perView: 6,
					spacing: 15,
				},
			},
			'(min-width: 2900px)': {
				slides: {
					perView: 7,
					spacing: 15,
				},
			}
		};
	}
	setFeaturePropertiesBreakPoints() {
		this.featurePropertiesBreakPoints = {
			'(min-width: 500px)': {
				slides: {
					perView: 2,
					spacing: 6,
				},
			},
			'(min-width: 700px)': {
				slides: {
					perView: 3,
					spacing: 12,
				},
			},
			'(min-width: 1000px)': {
				slides: {
					perView: 3,
					spacing: 15,
				},
			},
			'(min-width: 1800px)': {
				slides: {
					perView: 4,
					spacing: 15,
				},
			},
			'(min-width: 2222px)': {
				slides: {
					perView: 4,
					spacing: 15,
				},
			},
			'(min-width: 2900px)': {
				slides: {
					perView: 5,
					spacing: 15,
				},
			}
		};
	}
}
