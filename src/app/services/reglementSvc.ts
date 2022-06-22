import {Injectable} from '@angular/core';
import {HttpClient,	HttpErrorResponse,	HttpHeaders} from '@angular/common/http';
import { CookieService  } from 'ngx-cookie-service';
import { Globals } from '../globals';
declare var Swal: any;


@Injectable()
export class ReglementSvc {

	private headers = new HttpHeaders({	'Content-Type': 'application/json' });

	constructor(private http: HttpClient,private g: Globals,private cookieService:CookieService) {

	}
	
	etablirReglement(reglement: any) {
		let options = {	headers: this.headers,withCredentials: true	};
		let data = JSON.stringify(reglement);
		return this.http.post(this.g.baseUrl +  '/api/reglement/etablirReglement', data, options);
	}
	
	modifierCommande(commande: any) {
		let options = {	headers: this.headers,withCredentials: true	};
		let data = JSON.stringify(commande);
		return this.http.post(this.g.baseUrl +  '/api/commande/modifierCommande', data, options);
	}
	
	getReglementById(idReglement: number) {
		let paramInt = {"Valeur" : idReglement};
		let options = {	headers: this.headers,withCredentials: true	};
		let data = JSON.stringify(paramInt);
		return this.http.post(this.g.baseUrl +  '/api/reglement/getReglementById', data, options);
	}

	getReglementsByIdCommande(idCommande: number) {
		let paramInt = {"Valeur" : idCommande};
		let options = {	headers: this.headers,withCredentials: true	};
		let data = JSON.stringify(paramInt);
		return this.http.post(this.g.baseUrl +  '/api/reglement/getReglementsByIdCommande', data, options);
	}
	
	reglerTemporairement(idCommande: number) {
		let paramInt = {"Valeur" : idCommande};
		let options = {	headers: this.headers,withCredentials: true	};
		let data = JSON.stringify(paramInt);
		return this.http.post(this.g.baseUrl +  '/api/reglement/reglerTemporairement', data, options);
	}
	
	getMontantTotalReglementForSeance(idSeance: number) {
		let paramInt = {"Valeur" : idSeance};
		let options = {	headers: this.headers,withCredentials: true	};
		let data = JSON.stringify(paramInt);
		return this.http.post(this.g.baseUrl +  '/api/reglement/getMontantTotalReglementForSeance', data, options);
	}
		getMontantTotalReglementForCaisse(IdCaisse: number) {
		let paramInt = {"Valeur" : IdCaisse};
		let options = {	headers: this.headers,withCredentials: true	};
		let data = JSON.stringify(paramInt);
		return this.http.post(this.g.baseUrl +  '/api/reglement/getMontantTotalReglementForCaisse', data, options);
	}
	
	

	
	
}