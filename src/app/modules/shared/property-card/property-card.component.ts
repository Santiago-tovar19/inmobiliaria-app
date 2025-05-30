import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Property } from "app/interfaces/entities/properties";
import { environment } from "environments/environment";


@Component({
	selector: 'app-property-card',
	templateUrl: './property-card.component.html',
	standalone: false,
})
export class PropertyCardComponent {
	environment = environment;
	@Input() property: Property;
	@Input() imageUrl!: string;

	public propiedades: any = [
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

	// Función para obtener una imagen en bucle

	constructor(private _router: Router) {}

	// Función para asignar imágenes de manera cíclica
	getPropertyImage(index: number): string {
		return this.propiedades[index % this.propiedades.length]; // Esto asegura que las imágenes se repitan si las propiedades son más
	}

	goToPropertyView(): void {
		this._router.navigate(['/propiedades', this.property.id]);
	}
}


