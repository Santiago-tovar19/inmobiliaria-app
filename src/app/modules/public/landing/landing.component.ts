import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-landing',
	templateUrl: './landing.component.html',
	styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {

	mainSeeker: FormGroup;

	constructor(
		private _formBuilder: FormBuilder,
	) {}

	ngOnInit(): void {
		this.mainSeeker = this._formBuilder.group({
			advanced: [false],
		});
		console.log('LandingComponent');
	}


	toggleAdvanced(): void {
		const bool = !this.mainSeeker.get('advanced').value;
		this.mainSeeker.get('advanced').setValue(bool);
	}
}
