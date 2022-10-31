import {Paginator} from '../general/paginator';
import {HttpGeneralResponse} from '../http-responses/http-general-response';

/* eslint-disable @typescript-eslint/naming-convention */
export interface Asignature {
	id: number;
	name: string;
	description: string;
}

export interface AsignaturesPaginated extends Paginator {
	data: Asignature[];
}

export interface AsignaturesPaginatedResponse extends HttpGeneralResponse {
	data: AsignaturesPaginated;
}

export interface AsignatureResponse extends HttpGeneralResponse {
	data: Asignature;
}

export interface AsignaturesResponse extends HttpGeneralResponse {
	data: Asignature[];
}
