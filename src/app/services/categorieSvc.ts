import {Injectable} from '@angular/core';
import {HttpClient,	HttpErrorResponse,	HttpHeaders} from '@angular/common/http';
import { CookieService  } from 'ngx-cookie-service';
import { Globals } from '../globals';


@Injectable()
export class CategorieSvc {

	private headers = new HttpHeaders({	'Content-Type': 'application/json' });

	constructor(private http: HttpClient,private g: Globals) {

	}

	
	getCategories() {
		let options = {	headers: this.headers,withCredentials: true	};
		let data = {};
		return this.http.post(this.g.baseUrl +  '/api/categorie/getCategories', data, options);
	}
		getCategoriesForUI() {
		let options = {	headers: this.headers,withCredentials: true	};
		let data = {};
		return this.http.post(this.g.baseUrl +  '/api/categorie/getCategoriesForUI', data, options);
	}
	
	getCategoriesCommercialisees() {
		let options = {	headers: this.headers,withCredentials: true	};
		let data = {};
		return this.http.post(this.g.baseUrl +  '/api/categorie/getCategoriesCommercialisees', data, options);
	}
		getDefaultImageAsBase64() {
		let options = {	headers: this.headers,withCredentials: true	};
		let data = {};
		return this.http.post(this.g.baseUrl +  '/api/categorie/getDefaultImageAsBase64', data, options);
	}
	ajouterCategorie(categorie: any){
		let options = {	headers: this.headers,withCredentials: true	};
		let data = JSON.stringify(categorie);
		return this.http.post(this.g.baseUrl +  '/api/categorie/ajouterCategorie', data, options);
	}
	
	modifierCategorie(categorie: any){
		let options = {	headers: this.headers,withCredentials: true	};
		let data = JSON.stringify(categorie);
		return this.http.post(this.g.baseUrl +  '/api/categorie/modifierCategorie', data, options);
	}
	


}