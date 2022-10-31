import {Paginator} from '../general/paginator';
import {HttpGeneralResponse} from '../http-responses/http-general-response';

/* eslint-disable @typescript-eslint/naming-convention */
export interface CollegeDegree {
	id: number;
	name: string;
	description: string;
}

export interface CollegeDegreesPaginated extends Paginator {
	data: CollegeDegree[];
}

export interface CollegeDegreePaginatedResponse extends HttpGeneralResponse {
	data: CollegeDegreesPaginated;
}

export interface CollegeDegreeResponse extends HttpGeneralResponse {
	data: CollegeDegree;
}

export interface CollegeDegreesResponse extends HttpGeneralResponse {
	data: CollegeDegree[];
}
