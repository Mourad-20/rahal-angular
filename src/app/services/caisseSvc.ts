import {Injectable} from '@angular/core';
import {HttpClient,	HttpErrorResponse,	HttpHeaders} from '@angular/common/http';
import { CookieService  } from 'ngx-cookie-service';
import { Globals } from '../globals';


@Injectable()
export class CaisseSvc {

	private headers = new HttpHeaders({	'Content-Type': 'application/json' });

	constructor(private http: HttpClient,private g: Globals) {

	}	
	
	getCaisse() {
		let options = {	headers: this.headers,withCredentials: true	};
		let data = {};
		return this.http.post(this.g.baseUrl +  '/api/caisse/getCaisses', data, options);
	}
	addCaisse(caisse: any){
		let options = {	headers: this.headers,withCredentials: true	};
		let data = JSON.stringify(caisse);
		return this.http.post(this.g.baseUrl +  '/api/caisse/AddCaisse', data, options);
	}

updateCaisse(caisse:any){
		let options = {	headers: this.headers,withCredentials: true	};
		let data = JSON.stringify(caisse);
		return this.http.post(this.g.baseUrl +  '/api/caisse/updateCaisse', data, options);
	}

}