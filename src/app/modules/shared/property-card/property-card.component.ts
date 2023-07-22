import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Property } from "app/interfaces/entities/properties";
import { environment } from "environments/environment";


@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
	standalone: false
})
export class PropertyCardComponent {
	environment=environment;
	@Input() property: Property;

	constructor(
		private _router: Router,
	) {}

	goToPropertyView(): void {
		this._router.navigate(['/propiedades', this.property.id]);
	}
}


