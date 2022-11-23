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
	video: string;
	status_id: number;
	status: Generic;
	images: Array<{
		id: number;
		name: string;
		type: string;
	}>;
	contract_type: {
		id: number;
		name: string;
	};
	lat: string,
	lon: string,
	created_by: User
	parking: 0 | 1 | 2;
	hoa: 0 | 1 | 2;
	stories: 0 | 1 | 2;
	exclusions: 0 | 1 | 2;
	level: 0 | 1 | 2;
	security: 0 | 1 | 2;
	lobby: 0 | 1 | 2;
	balcony: 0 | 1 | 2;
	terrace: 0 | 1 | 2;
	power_plant: 0 | 1 | 2;
	gym: 0 | 1 | 2;
	walk_in_closet: 0 | 1 | 2;
	swimming_pool: 0 | 1 | 2;
	kids_area: 0 | 1 | 2;
	pets_allowed: 0 | 1 | 2;
	central_air_conditioner: 0 | 1 | 2;
	deleted_at: string;
	published: 0 | 1;
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

