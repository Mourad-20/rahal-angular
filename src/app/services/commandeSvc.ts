import {Injectable} from '@angular/core';
import {HttpClient,	HttpErrorResponse,	HttpHeaders} from '@angular/common/http';
import { CookieService  } from 'ngx-cookie-service';
import { Globals } from '../globals';
declare var Swal: any;


@Injectable()
export class CommandeSvc {

	private headers = new HttpHeaders({	'Content-Type': 'application/json' });

	constructor(private http: HttpClient,private g: Globals,private cookieService:CookieService) {

	}
	
	getRecap(idSeance:number|any){
			let paramInt = {"Valeur" : idSeance};
			let data = JSON.stringify(paramInt);
		let options = {	headers: this.headers,withCredentials: true	};
	
		return this.http.post(this.g.baseUrl +  '/api/commande/getRecap', data, options);
	}
	
	allimentationstock(commande: any) {
		let options = {	headers: this.headers,withCredentials: true	};
		let data = JSON.stringify(commande);
		return this.http.post(this.g.baseUrl +  '/api/commande/allimentationstock', data, options);
	}
	
	etablirCommande(commande: any) {
		let options = {	headers: this.headers,withCredentials: true	};
		let data = JSON.stringify(commande);
		return this.http.post(this.g.baseUrl +  '/api/commande/etablirCommande', data, options);
	}
	
	modifierCommande(commande: any) {
		let options = {	headers: this.headers,withCredentials: true	};
		let data = JSON.stringify(commande);
		return this.http.post(this.g.baseUrl +  '/api/commande/modifierCommande', data, options);
	}
	
	getCommandeById(idCommande: number) {
		let paramInt = {"Valeur" : idCommande};
		let options = {	headers: this.headers,withCredentials: true	};
		let data = JSON.stringify(paramInt);
		return this.http.post(this.g.baseUrl +  '/api/commande/getCommandeById', data, options);
	}
	
	getMouvement(datedebut: string,datefin: string) {
		let paramDate = {"_datedebut" : datedebut,"_datefin":datefin};	
		let options = {	headers: this.headers,withCredentials: true	};
		let data = JSON.stringify(paramDate);
		return this.http.post(this.g.baseUrl +  '/api/commande/getMouvement', data, options);
	}
		getDetailCommandesstockparam(idArticle: number|any) {
		let paramInt = {"Valeur" : idArticle};
		let options = {	headers: this.headers,withCredentials: true	};
		let data = JSON.stringify(paramInt);
		return this.http.post(this.g.baseUrl +  '/api/detailcommande/getDetailCommandesstockparam', data, options);
	}
	
	getCommandesNonControle() {
		let options = {	headers: this.headers,withCredentials: true	};
		let data = {};
		return this.http.post(this.g.baseUrl +  '/api/commande/getCommandesNonControle', data, options);
	}
	getCommandesNonReglees() {
		let options = {	headers: this.headers,withCredentials: true	};
		let data = {};
		return this.http.post(this.g.baseUrl +  '/api/commande/getCommandesNonReglees', data, options);
	}
	getCommandes(datedebut: string,datefin: string) {
		let paramDate = {"_datedebut" : datedebut,"_datefin":datefin};	
		let options = {	headers: this.headers,withCredentials: true	};
		let data = JSON.stringify(paramDate);
		return this.http.post(this.g.baseUrl +  '/api/commande/getCommandes', data, options);
	}

		getCommandeSeance(idSeance: number) {
		let paramInt = {"Valeur" : idSeance};	
		let options = {	headers: this.headers,withCredentials: true	};
		let data = JSON.stringify(paramInt);
		return this.http.post(this.g.baseUrl +  '/api/commande/getCommandeSeance', data, options);
	}

	getCommandesbycaisse(datedebut: string,datefin: string,listIdCaisse:number[]) {
		let paramDate = {"_datedebut" : datedebut,"_datefin":datefin,"listeIdCaisse":listIdCaisse};	
		let options = {	headers: this.headers,withCredentials: true	};
		let data = JSON.stringify(paramDate);

		return this.http.post(this.g.baseUrl +  '/api/commande/getCommandes', data, options);
	}

		getCommandesbycodes(datedebut: string,datefin: string,_code:string) {
		let paramDate = {"_datedebut" : datedebut,"_datefin":datefin,"_code":_code};	
		let options = {	headers: this.headers,withCredentials: true	};
		let data = JSON.stringify(paramDate);

		return this.http.post(this.g.baseUrl +  '/api/commande/getCommandes', data, options);
	}
	getRecapArticles(datedebut: string,datefin: string) {
		let paramDate = {"_datedebut" : datedebut,"_datefin":datefin};	
		let options = {	headers: this.headers,withCredentials: true	};
		let data = JSON.stringify(paramDate);
		return this.http.post(this.g.baseUrl +  '/api/commande/getRecapArticles', data, options);
	}

	envoyerTicketPrepation(idCommande: number) {
		let paramInt = {"Valeur" : idCommande};
		let options = {	headers: this.headers,withCredentials: true	};
		let data = JSON.stringify(paramInt);
		return this.http.post(this.g.baseUrl +  '/api/commande/envoyerTicketPrepation', data, options);
	}
	
	envoyerTicketNote(idCommande: number) {
		let paramInt = {"Valeur" : idCommande};
		let options = {	headers: this.headers,withCredentials: true	};
		let data = JSON.stringify(paramInt);
		return this.http.post(this.g.baseUrl +  '/api/commande/envoyerTicketNote', data, options);
	}
	
	
	getDetailCommandesNonReglees(idCommande: number) {
		let paramInt = {"Valeur" : idCommande};
		let options = {	headers: this.headers,withCredentials: true	};
		let data = JSON.stringify(paramInt);
		return this.http.post(this.g.baseUrl +  '/api/commande/getDetailCommandesNonReglees', data, options);
	}
	
		controlerCommande(commande: any) {
		let options = {	headers: this.headers,withCredentials: true	};
		let data = JSON.stringify(commande);
		return this.http.post(this.g.baseUrl +  '/api/commande/controlerCommande', data, options);
	}
	
	
	
	
	
}