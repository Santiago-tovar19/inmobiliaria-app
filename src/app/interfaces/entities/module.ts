import {Paginator} from '../general/paginator';
import {HttpGeneralResponse} from '../http-responses/http-general-response';

/* eslint-disable @typescript-eslint/naming-convention */
export interface Module {
	id: number;
	name: string;
	description: string;
	icon: string;
	path: string;
	father_id: string;
	created_at?: string;
	updated_at?: string;

}

// export interface InstalationsPaginatedResponse extends HttpGeneralResponse {
// 	data: InstalationsPaginated;
// }

// export interface InstalationsPaginated extends Paginator {
// 	data: Instalation[];
// }

// export interface InstalationResponse extends HttpGeneralResponse {
// 	data: Instalation;
// }

