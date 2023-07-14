import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { NgFor, NgStyle } from '@angular/common';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss'],
    standalone: true,
    imports: [
        MatChipsModule,
        FormsModule,
        MatIconModule,
				NgStyle,
				NgFor,
    ],
})
export class LandingComponent implements OnInit {

	mainSeeker: FormGroup;

	images: string[] = [
    'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=pexels-binyamin-mellish-106399.jpg&fm=jpg',
    'https://cdn.pixabay.com/photo/2016/11/29/03/53/house-1867187_640.jpg',
    // Agrega más imágenes aquí
  ];
	currentImageIndex = 0;

	constructor(
		private _formBuilder: FormBuilder,
	) {}

	ngOnInit(): void {
		this.mainSeeker = this._formBuilder.group({
			advanced: [false],
		});
		setInterval(() => {
      this.currentImageIndex = ++this.currentImageIndex % this.images.length;
			// console.log(this.currentImageIndex);
    }, 7000);
	}


	toggleAdvanced(): void {
		const bool = !this.mainSeeker.get('advanced').value;
		this.mainSeeker.get('advanced').setValue(bool);
	}
}
