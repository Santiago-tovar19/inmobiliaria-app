import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { NgFor, NgStyle, NgClass, JsonPipe, DatePipe } from '@angular/common';
import { CarouselModule } from 'app/shared-components/carousel/carousel.component';
import { Router } from '@angular/router';
import { PropertiesService } from 'app/modules/properties/service/properties.service';
import { PaginatorParams } from 'app/interfaces/general/paginator-params';
import { PropertyCardModule } from 'app/modules/shared/property-card/property-card.module';
import { environment } from 'environments/environment';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
	selector: 'app-landing',
	templateUrl: './landing.component.html',
	styleUrls: ['./landing.component.scss'],
	standalone: true,
	imports: [MatInputModule, DatePipe, MatChipsModule, FormsModule, CarouselModule, MatIconModule, NgStyle, NgFor, NgClass, ReactiveFormsModule, PropertyCardModule, JsonPipe, MatCheckboxModule, MatSelectModule, MatFormFieldModule],
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
		'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
		'https://images.unsplash.com/photo-1600585153490-76fb20a32601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
		'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
		'https://images.unsplash.com/photo-1559329145-afaf18e3f349?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
		'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
		'https://gpvivienda.com/blog/wp-content/uploads/2023/03/digital-marketing-agency-ntwrk-g39p1kDjvSY-unsplash-1.jpg',
	];

	propertyTypess = [
		{
			id: 1,
			name: 'Casa',
			properties_count: 12,
			imageUrl: 'https://nhs-dynamic-secure.akamaized.net/Images/Homes/Brook41827/66415381-230321.jpg',
		},
		{
			id: 2,
			name: 'Apartamento',
			properties_count: 7,
			imageUrl: 'https://img.freepik.com/fotos-premium/parte-apartamento-residencial-moderno-detalles-exteriores-edificios-planos-nueva-casa-hogar-lujo_230311-48104.jpg',
		},
		{
			id: 3,
			name: 'Penthouse',
			properties_count: 14,
			imageUrl: 'https://static1.mansionglobal.com/production/media/article-images/1484cdf2759400ba58087dd9db27cae4/large_living-room-of-a-3-Bedroom-apartment.jpg',
		},
		{
			id: 4,
			name: 'Nuevo Proyecto',
			properties_count: 15,
			imageUrl: 'https://cl.habcdn.com/photos/business/medium/construccion-casas-de-madera-416219.jpg',
		},
		{
			id: 5,
			name: 'Terreno',
			properties_count: 12,
			imageUrl: 'https://img.freepik.com/foto-gratis/vista-terreno-desarrollo-inmobiliario-empresarial_23-2149916719.jpg?semt=ais_hybrid',
		},
		{
			id: 6,
			name: 'Corporativo',
			properties_count: 18,
			imageUrl: 'https://arqa.com/empresas/wp-content/uploads/sites/2/2024/08/casa-working-ocampo-860x600.jpg',
		},
		{
			id: 7,
			name: 'Propiedad',
			properties_count: 12,
			imageUrl: 'https://concepto.de/wp-content/uploads/2018/01/propiedad-privada-e1547745521439.jpg',
		},
		{
			id: 8,
			name: 'Vacacional',
			properties_count: 11,
			imageUrl: 'https://dinorank.com/img/dinobrain/171849/imagena1ae37d633827cf9b66a287326dd594c.jpg',
		},
	];

	propiedades = [
		'https://www.cdt.cl/wp-content/uploads/2023/03/Gary-Todd.jpeg',
		'https://humanidades.com/wp-content/uploads/2018/07/propiedad-privada-1-e1572226252649.jpg',
		'https://www.consumoteca.com/wp-content/uploads/Elevador.jpg',
		'https://images.trvl-media.com/lodging/55000000/54030000/54021200/54021121/1bc080e8.jpg?impolicy=resizecrop&rw=400&ra=fit',
		'https://images.trvl-media.com/lodging/35000000/34620000/34619800/34619713/1649e53b_w.jpg',
		'https://www.viacelere.com/wp-content/uploads/old-blog/2017/12/Grace-scaled.jpg',
		'https://gpvivienda.com/blog/wp-content/uploads/2023/03/digital-marketing-agency-ntwrk-g39p1kDjvSY-unsplash-1.jpg',
		'https://curbelolaw.com/wp-content/uploads/2021/12/casa-estilo-rancho.jpg',
		'https://res.listglobally.com/listings/5682245/103057474/de07f7fc37d54059bc9ecc2464198518?mode=crop&height=300',
		'https://res.listglobally.com/listings/2882816/104198435/f83fe0760d06b7c4f8e41f9b4faccae4?mode=crop&height=300',
	];

	// Función para seleccionar la imagen ciclando el array

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

		setInterval(() => {
			this.currentImageIndex = ++this.currentImageIndex % this.images.length;
		}, 7000);

		this.getPropertyType();
		this.getPropertiesList({}, { page: 1, perPage: 10 });
	}

	getPropertyImage(index: number): string {
		return this.propiedades[index % this.propiedades.length]; // Se repiten las imágenes cuando se acaban
	}

	getPropertyImageUltimate(index: number): string {
		return this.imagesSliders[index % this.imagesSliders.length]; // Se repiten las imágenes cuando se acaban
	}

	getPropertyType(): void {
		this._propertiesService.getPropertyTypes().subscribe((response: any) => {
			console.log(response);
			this.propertyTypes = response.data;
			console.log(this.propertyTypes);
		});
	}

	getPropertiesList(search: any, PaginatorParams: any = { page: 1, perPage: 10 }): void {
		this._propertiesService.getList({}).subscribe((response: any) => {
			this.dataProperties = response.data.data;
		});
	}

	initForm(): void {
		this.formLanding = this._formBuilder.group({
			contract_type_id: [''],
			name: [''], //en revision
			property_type_id: [''],
			bathrooms: [''],
			bedrooms: [''],
			location_type: [''],
			level: [],
			size: [''],
			price: [''],
			parking: [],
			kitchen: [],
			elevator: [],
			wifi: [],
			fireplace: [],
			exclusions: [],
			security: [],
			lobby: [],
			balcony: [],
			terrace: [],
			power_plant: [],
			gym: [],
			walk_in_closet: [],
			kids_area: [],
			pets_allowed: [],
			central_air_conditioner: [],
		});
	}

	onChangeCheckbox(controlName: string) {
		const v = this.formLanding.get(controlName)?.value ? 1 : 0;
		this.formLanding.get(controlName)?.setValue(v);
	}

	onChangeSelect(event: Event, controlName: string) {
		const selectElement = event.target as HTMLSelectElement;
		const selectedValue = selectElement.value;
		this.formLanding.get(controlName)?.setValue(selectedValue);
	}

	onSubmit(): void {
		const data = {};
		Object.entries(this.formLanding.value).map((item) => {
			if (item[1]) {
				data[item[0]] = item[1];
			}
		});

		this._router.navigate(['/buscador-avanzado'], {
			queryParams: data,
		});
	}

	onCardClick(id: number): void {
		// Redirigir a la página con el Query Parameter
		this._router.navigate(['/buscador-avanzado'], { queryParams: { property_type_id: id } });
	}

	goToAdvancedSearch(): void {
		this._router.navigate(['/buscador-avanzado'], { queryParams: { featured: 1 } });
	}

	explorerProperties(): void {
		this._router.navigate(['/buscador-avanzado'], { queryParams: { orderBy: 'created_at', order: 'DESC' } });
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

			'(min-width: 1024px)': {
				slides: {
					perView: 3,
					spacing: 15,
				},
			},

			'(min-width: 1300px)': {
				slides: {
					perView: 3,
					spacing: 15,
				},
			},
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
			},
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
			},
		};
	}

	goToPropertyView(id): void {
		this._router.navigate(['/propiedades', id]);
	}
}
