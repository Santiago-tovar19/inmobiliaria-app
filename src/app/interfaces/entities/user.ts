import {Paginator} from '../general/paginator';
import {HttpGeneralResponse} from '../http-responses/http-general-response';
import { Module } from './module';
import {Role} from './role';

/* eslint-disable @typescript-eslint/naming-convention */
export interface User {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	role_id: number;
	role: Role;
	email_verified_at: string;
	modules: Module[];
	code: string;
	phone: string;
	document: string;
	address: string;
	country_id: number;
	sex: string;
	marital_status: string;
	img: string;
	born_at: string;
	active: number;
	deleted: number;
	created_at?: string;
	updated_at?: string;

}

export interface UsersPaginatedResponse extends HttpGeneralResponse {
	data: UsersPaginated;
}

export interface UsersPaginated extends Paginator {
	data: User[];
}

export interface UserResponse extends HttpGeneralResponse {
	data: User;
}

