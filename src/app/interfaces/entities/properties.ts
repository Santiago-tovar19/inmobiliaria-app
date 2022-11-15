import {Paginator} from '../general/paginator';
import {HttpGeneralResponse} from '../http-responses/http-general-response';
import { Generic } from './generic';
import {Module} from './module';
import {Role} from './role';
import { User } from './user';

/* eslint-disable @typescript-eslint/naming-convention */
export interface Property {
	id: number;
	name: string;
	description: string;
	property_type_id: number;
	property_type: Generic;
	address: string;
	kitchen: number;
	elevator: number;
	construction_year: string;
	wifi: number;
	fireplace: number;
	mls_number: string;
	location_type: string;
	bedrooms: number;
	bathrooms: number;
	size: number;
	price: number;
	currency_id: number;
	currency: Generic;
	youtube_link: string;
	status_id: number;
	status: Generic;
	images: Array<{
		id: number;
		name: string;
		type: string;
	}>;
	contact_type: {
		id: number;
		name: string;
	};
	created_by: User
	parking: 0 | 1;
	hoa: 0 | 1;
	stories: 0 | 1;
	exclusions: 0 | 1;
	level: 0 | 1;
	security: 0 | 1;
	lobby: 0 | 1;
	balcony: 0 | 1;
	terrace: 0 | 1;
	power_plant: 0 | 1;
	gym: 0 | 1;
	walk_in_closet: 0 | 1;
	swimming_pool: 0 | 1;
	kids_area: 0 | 1;
	pets_allowed: 0 | 1;
	central_air_conditioner: 0 | 1;
	published_at: string;

}

export interface PropertiesPaginatedResponse extends HttpGeneralResponse {
	data: PropertiesPaginated;
}

export interface PropertiesPaginated extends Paginator {
	data: Property[];
}

export interface PropertyResponse extends HttpGeneralResponse {
	data: Property;
}

