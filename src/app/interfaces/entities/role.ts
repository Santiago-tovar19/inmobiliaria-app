import {Paginator} from '../general/paginator';
import {HttpGeneralResponse} from '../http-responses/http-general-response';

/* eslint-disable @typescript-eslint/naming-convention */
export interface Role {
	id: number;
	name: string;
	slug: string;
	descripcion: string;
	created_at?: string;
	updated_at?: string;
}


export interface RolesPaginated extends Paginator {
	data: Role[];
}

export interface RoleResponse extends HttpGeneralResponse {
	data: Role;
}

export interface RolesResponse extends HttpGeneralResponse {
	data: Role[];
}
