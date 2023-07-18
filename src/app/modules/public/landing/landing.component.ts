import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { NgFor, NgStyle, NgClass } from '@angular/common';
import { CarouselModule } from 'app/shared-components/carousel/carousel.component';
import { Router } from '@angular/router';

@Component({
	selector: 'app-landing',
	templateUrl: './landing.component.html',
	styleUrls: ['./landing.component.scss'],
	standalone: true,
	imports: [MatChipsModule, FormsModule, CarouselModule, MatIconModule, NgStyle, NgFor, NgClass, ReactiveFormsModule],
})
export class LandingComponent implements OnInit {
	formLanding: FormGroup;
	mainSeeker: FormGroup;
	comprarSelected = false;
	alquilarSelected = false;
	images: string[] = [
		'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=pexels-binyamin-mellish-106399.jpg&fm=jpg',
		'https://cdn.pixabay.com/photo/2016/11/29/03/53/house-1867187_640.jpg',
		// Agrega más imágenes aquí
	];
	currentImageIndex = 0;

	constructor(private _formBuilder: FormBuilder, private _router: Router) {}

	ngOnInit(): void {
		this.initForm();
		this.mainSeeker = this._formBuilder.group({
			advanced: [false],
		});
		setInterval(() => {
			this.currentImageIndex = ++this.currentImageIndex % this.images.length;
			// console.log(this.currentImageIndex);
		}, 7000);
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
		this._router.navigate(['/advanced-search']);
	}

	onClickChip(chip: string): void {
		if (chip === 'buy') {
			this.comprarSelected = true;
			this.alquilarSelected = false;
			this.formLanding.get('buy').setValue('buy');
		} else if (chip === 'rent') {
			this.alquilarSelected = true;
			this.comprarSelected = false;
			this.formLanding.get('rent').setValue('rent');
		}
	}

	toggleAdvanced(): void {
		const bool = !this.mainSeeker.get('advanced').value;
		this.mainSeeker.get('advanced').setValue(bool);
	}

	alert(): void {
		alert('Hola');
	}
}
