import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';

@Injectable()
export class HTTPService {
	constructor(private _http: Http) {}
	getQuery(apicall) {
		return this._http.get(apicall).map(res =>res.json())
	}

	createXml(response_data){
		var headers = new Headers();
		headers.append("Content-Type", 'application/json');
		var body = JSON.stringify(response_data);

		return this._http.post('/export', body, {
			headers: headers
		}).map(resp => resp.json())

	}
}