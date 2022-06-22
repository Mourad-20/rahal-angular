import {Injectable} from '@angular/core';
import {HttpClient,	HttpErrorResponse,	HttpHeaders} from '@angular/common/http';
import { CookieService  } from 'ngx-cookie-service';
import { Globals } from '../globals';


@Injectable()
export class LocaliteSvc {

	private headers = new HttpHeaders({	'Content-Type': 'application/json' });

	constructor(private http: HttpClient,private g: Globals) {

	}
	
	
	getLocalites() {
		let options = {	headers: this.headers,withCredentials: true	};
		let data = {};
		return this.http.post(this.g.baseUrl +  '/api/localite/getLocalites', data, options);
	}
	
	getLocalitesDisponible() {
		let options = {	headers: this.headers,withCredentials: true	};
		let data = {};
		return this.http.post(this.g.baseUrl +  '/api/localite/getLocalitesDisponible', data, options);
	}
	
	
	
	ajouterLocalite(localite: any){
		let options = {	headers: this.headers,withCredentials: true	};
		let data = JSON.stringify(localite);
		return this.http.post(this.g.baseUrl +  '/api/localite/ajouterLocalite', data, options);
	}
	
	modifierLocalite(localite: any){
		let options = {	headers: this.headers,withCredentials: true	};
		let data = JSON.stringify(localite);
		return this.http.post(this.g.baseUrl +  '/api/localite/modifierLocalite', data, options);
	}

}