import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'app/core/user/user.service';
import { Property } from 'app/interfaces/entities/properties';
import { PropertiesService } from 'app/modules/properties/service/properties.service';
import { GlobalService } from 'app/services/global/global.service';
import { environment } from 'environments/environment';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
	selector: 'app-manage-property',
	templateUrl: './manage-property.component.html',
	styleUrls: ['./manage-property.component.scss'],
})
export class ManagePropertyComponent implements OnInit {
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
				items: 2,
			},
		},
		nav: true,
	};

	propertyID: string;
	property: Property = {} as any;
	currencies;
	propertyTypes;
	status;
	contractTypes;
	files = [];
	filesBanner = [];
	video: any;
	videoUrl: any;
	filesToRemove = [];
	errors;
	user;
	showMap = false;

	propertyFG: FormGroup;

	nameKeys = {
		name: 'nombre',
		address: 'direccion',
		currency_id: 'moneda',
		price: 'precio',
	};

	constructor(private _propertiesService: PropertiesService, private _activatedRouter: ActivatedRoute, private sanitizer: DomSanitizer, private _formBuilder: FormBuilder, private _globalService: GlobalService, private _userService: UserService, private location: Location) {}

	ngOnInit(): void {
		this._userService.user$.subscribe((user: any) => {
			this.user = user;
		});

		this.propertyFG = this._formBuilder.group({
			name: ['', Validators.required],
			description: ['', [Validators.maxLength(1200)]],
			address: ['', Validators.required],
			currency_id: [null, Validators.required],
			price: ['', Validators.required],
			lat: [''],
			lon: [''],
			bedrooms: [0],
			bathrooms: [0],
			construction_year: [null],
			trashed: [false],
			size: [null],
			property_type_id: [null],
			contract_type_id: [null],
			status_id: [null],

			published: [true],
			deleteVideo: [false],
			wifi: [1],
			kitchen: [1],
			lobby: [1],
			elevator: [1],
			parking: [1],
			gym: [1],
			security: [1],
			fireplace: [1],
			balcony: [1],
			terrace: [1],
			power_plant: [1],
			walk_in_closet: [1],
			swimming_pool: [1],
			kids_area: [1],
			pets_allowed: [1],
			youtube_link: [''],
		});

		this._propertiesService.getFeatures().subscribe((res) => {
			this.currencies = res.data.currencies;
			this.propertyTypes = res.data.propertyTypes;
			this.status = res.data.status;
			this.contractTypes = res.data.contractTypes;
		});

		this.checkIfEdit();
	}

	checkIfEdit(): void {
		this._activatedRouter.params.subscribe((params) => {
			if (params.id) {
				this.propertyID = params.id;
				this.getProperty();
			} else {
				this.showMap = true;
			}
		});
	}

	async fileChanges(files: FileList | File): Promise<void> {
		files = files as FileList;
		for (let i = 0; i < files.length; i++) {
			this.files.push({
				id: this.generateRandomId(),
				name: files[i].name,
				file: files[i],
				base64: await this.imgToBase64(files[i]),
			});
		}
		console.log();
	}

	remove(index): void {
		const file = this.filesBanner.find((f) => f.id === index);
		if (file.base64.startsWith('http')) {
			this.filesToRemove.push(file.id);
		}
		this.filesBanner = this.filesBanner.filter((f) => f.id !== index);
	}

	imgToBase64(file: File): Promise<string> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = (error) => reject(error);
		});
	}

	getProperty(): void {
		this._propertiesService.get(this.propertyID).subscribe((res) => {
			this.property = res.data;
			this.propertyFG.patchValue(this.property);
			this.filesBanner = this.property.images
				.filter((i) => i.type === 'Banner')
				.map((i) => ({
					id: i.id,
					base64: `${environment.assets}/storage/properties/${i.name}`,
				}));
			this.files = this.property.images
				.filter((i) => i.type === 'Gallery')
				.map((i) => ({
					id: i.id,
					base64: `${environment.assets}/storage/properties/${i.name}`,
				}));
			if (this.property.video) {
				this.video = this.property.video;
				this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(environment.assets + '/storage/properties/' + this.property.video);
			}
			if (this.property.deleted_at) {
				this.propertyFG.patchValue({ trashed: true });
			}
			setTimeout(() => {
				this.showMap = true;
			}, 100);
		});
	}

	generateRandomId(): string {
		return Math.random().toString(36).substring(2);
	}

	updateVideoUrl(url) {
		// get yoputube video id
		const videoId = url.split('v=')[1];
		// set video url
		const videoUrl = 'https://www.youtube.com/embed/' + videoId;
		return this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
	}

	async fileChangesBanner(files: FileList | File): Promise<void> {
		files = files as FileList;
		for (let i = 0; i < files.length; i++) {
			this.filesBanner.push({
				id: this.generateRandomId(),
				name: files[i].name,
				file: files[i],
				base64: await this.imgToBase64(files[i]),
			});
		}
		console.log(this.filesBanner);
	}
	removeBanner(index): void {
		const file = this.filesBanner.find((f) => f.id === index);
		if (file.base64.startsWith('http')) {
			this.filesToRemove.push(file.id);
		}
		console.log(this.filesToRemove);

		this.filesBanner = this.filesBanner.filter((f) => f.id !== index);
	}

	actualizar(): void {
		this.errors = [];
		if (this.propertyFG.invalid) {
			this.propertyFG.markAllAsTouched();

			// Get key and errors. Example: [{key: 'name', errors: ['required']}]
			this.errors = Object.keys(this.propertyFG.controls)
				.map((key) => {
					const controlErrors: ValidationErrors = this.propertyFG.get(key).errors;
					if (controlErrors != null) {
						return { key, errors: Object.keys(controlErrors) };
					}
				})
				.filter((x) => x);
			this._globalService.openSnackBar('Hay errores en el formulario', 5000, 'error');
			return;
		}

		const imgs = this.files.filter((file) => file.file).map((file) => file.file);
		const bannerImgs = this.filesBanner.filter((file) => file.file).map((file) => file.file);
		const values = { ...this.propertyFG.value, filesToRemove: this.filesToRemove };
		console.log(values);
		this._propertiesService.actualizar(this.propertyID, values, imgs, bannerImgs, this.video).subscribe((response) => {
			this.propertyFG.patchValue(response.data);
			this.propertyFG.get('deleteVideo').setValue(false);
			this.property = response.data;
			this.filesBanner = this.property.images
				.filter((i) => i.type === 'Banner')
				.map((i) => ({
					id: i.id,
					base64: `${environment.assets}/storage/properties/${i.name}`,
				}));
			this.files = this.property.images
				.filter((i) => i.type === 'Gallery')
				.map((i) => ({
					id: i.id,
					base64: `${environment.assets}/storage/properties/${i.name}`,
				}));

			this._globalService.openSnackBar('Propiedad actualizada correctamente', 10000, 'success', 'Ver pagina publica de propiedad').then(() => {
				const url = new URL('/propiedad/' + response.data.id, environment.front_url);
				window.open(url.toString(), '_blank');
			});
		});
	}

	guardar(): void {
		this.errors = [];
		if (this.propertyFG.invalid) {
			this.propertyFG.markAllAsTouched();

			// Get key and errors. Example: [{key: 'name', errors: ['required']}]
			this.errors = Object.keys(this.propertyFG.controls)
				.map((key) => {
					const controlErrors: ValidationErrors = this.propertyFG.get(key).errors;
					if (controlErrors != null) {
						return { key, errors: Object.keys(controlErrors) };
					}
				})
				.filter((x) => x);

			this._globalService.openSnackBar('Hay errores en el formulario', 5000, 'error');
			return;
		}

		const imgs = this.files.map((file) => file.file);
		const bannerImgs = this.filesBanner.map((file) => file.file);
		this._propertiesService.crear(this.propertyFG.value, imgs, bannerImgs, this.video).subscribe((response) => {
			this.location.go('/propiedades/editar/' + response.data.id);

			this.propertyFG.patchValue(response.data);
			this.property = response.data;
			this.propertyID = response.data.id;
			this.filesBanner = this.property.images
				.filter((i) => i.type === 'Banner')
				.map((i) => ({
					id: i.id,
					base64: `${environment.assets}/storage/properties/${i.name}`,
				}));
			this.files = this.property.images
				.filter((i) => i.type === 'Gallery')
				.map((i) => ({
					id: i.id,
					base64: `${environment.assets}/storage/properties/${i.name}`,
				}));

			this._globalService.openSnackBar('Propiedad creada correctamente', 10000, 'success', 'Ver pagina publica de propiedad').then(() => {
				const url = new URL('/propiedad/' + response.data.id, environment.front_url);
				window.open(url.toString(), '_blank');
			});
		});
	}

	selectVideo(file: File | FileList): void {
		this.video = file as File;
		console.log(this.video);

		// Make an object URL that points to the File object
		const url = URL.createObjectURL(file as any);
		this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
	}

	deleteVideo(): void {
		this.video = null;
		this.videoUrl = null;
		if (this.propertyID) {
			this.propertyFG.get('deleteVideo').setValue(true);
		}
	}

	getCharactersLeft(): number {
		return 1200 - this.propertyFG.get('description').value?.length || 0;
	}

	getSafeUrl(url): SafeUrl {
		// replace spaces with %20
		url = url.replace(/ /g, '+');
		console.log(url);
		console.log(this.sanitizer.bypassSecurityTrustResourceUrl(url));
		return this.sanitizer.bypassSecurityTrustResourceUrl(url);
	}

	setCoordinates(coordinates: [number, number]): void {
		this.propertyFG.get('lon').setValue(coordinates[0]);
		this.propertyFG.get('lat').setValue(coordinates[1]);
	}
}
