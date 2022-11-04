import {Paginator} from '../general/paginator';
import {HttpGeneralResponse} from '../http-responses/http-general-response';
import { Module } from './module';
import {Role} from './role';

/* eslint-disable @typescript-eslint/naming-convention */
export interface Broker {
	id: number;
	name: string;
	address: string;
	created_at?: string;
	updated_at?: string;

}

export interface BrokersPaginatedResponse extends HttpGeneralResponse {
	data: BrokersPaginated;
}

export interface BrokersPaginated extends Paginator {
	data: Broker[];
}

export interface BrokerResponse extends HttpGeneralResponse {
	data: Broker;
}

export interface BrokersResponse extends HttpGeneralResponse {
	data: Broker[];
}
