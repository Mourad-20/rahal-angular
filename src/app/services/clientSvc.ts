import {Injectable} from '@angular/core';
import {HttpClient,	HttpErrorResponse,	HttpHeaders} from '@angular/common/http';
import { CookieService  } from 'ngx-cookie-service';
import { Globals } from '../globals';


@Injectable()
export class ClientSvc {

	private headers = new HttpHeaders({	'Content-Type': 'application/json' });

	constructor(private http: HttpClient,private g: Globals) {

	}
	
	
	getclients() {
		let options = {	headers: this.headers,withCredentials: true	};
		let data = {};
		return this.http.post(this.g.baseUrl +  '/api/client/getclients', data, options);
	}
	
	
	
	
	
	ajouterclient(client: any){
		let options = {	headers: this.headers,withCredentials: true	};
		let data = JSON.stringify(client);
		return this.http.post(this.g.baseUrl +  '/api/client/ajouterclient', data, options);
	}
	
	modifierclient(client: any){
		let options = {	headers: this.headers,withCredentials: true	};
		let data = JSON.stringify(client);
		return this.http.post(this.g.baseUrl +  '/api/client/modifierclient', data, options);
	}

}