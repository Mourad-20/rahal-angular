import {Injectable} from '@angular/core';
import {HttpClient,	HttpErrorResponse,	HttpHeaders} from '@angular/common/http';
import { CookieService  } from 'ngx-cookie-service';
import { Globals } from '../globals';


@Injectable()
export class LotSvc {

	private headers = new HttpHeaders({	'Content-Type': 'application/json' });

	constructor(private http: HttpClient,private g: Globals) {}
	
	getlots() {
		let options = {	headers: this.headers,withCredentials: true	};
		let data = {};
		return this.http.post(this.g.baseUrl +  '/api/lot/getlots', data, options);
	}
	
	Addlot(lot: any){
		let options = {	headers: this.headers,withCredentials: true	};
		let data = JSON.stringify(lot);
		return this.http.post(this.g.baseUrl +  '/api/lot/Addlot', data, options);
	}

	updatelot(lot:any){
		console.log("okok")
		let options = {	headers: this.headers,withCredentials: true	};
		let data = JSON.stringify(lot);
		return this.http.post(this.g.baseUrl +  '/api/lot/updatelot', data, options);
	}

	getDefaultImageAsBase64() {
		let options = {	headers: this.headers,withCredentials: true	};
		let data = {};
		return this.http.post(this.g.baseUrl +  '/api/article/getDefaultImageAsBase64', data, options);
	}
}