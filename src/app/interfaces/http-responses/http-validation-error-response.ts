import {HttpGeneralResponse} from './http-general-response';

export interface HttpValidationErrorResponse extends HttpGeneralResponse {
	errors: {
		[key: string]: Array<string>;
	};
}
