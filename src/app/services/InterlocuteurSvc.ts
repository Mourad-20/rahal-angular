import {Injectable} from '@angular/core';
import {HttpClient,	HttpErrorResponse,	HttpHeaders} from '@angular/common/http';
import { CookieService  } from 'ngx-cookie-service';
import { Globals } from '../globals';


@Injectable()
export class InterlocuteurSvc {

	private headers = new HttpHeaders({	'Content-Type': 'application/json' });

	constructor(private http: HttpClient,private g: Globals) {

	}
	
	
	getInterlocuteurs() {
		let options = {	headers: this.headers,withCredentials: true	};
		let data = {};
		return this.http.post(this.g.baseUrl +  '/api/Interlocuteur/getInterlocuteurs', data, options);
	}
	
	
	
	
	ajouterInterlocuteur(Interlocuteur: any){
		let options = {	headers: this.headers,withCredentials: true	};
		let data = JSON.stringify(Interlocuteur);
		return this.http.post(this.g.baseUrl +  '/api/Interlocuteur/ajouterInterlocuteur', data, options);
	}
	
	modifierInterlocuteur(Interlocuteur: any){
		let options = {	headers: this.headers,withCredentials: true	};
		let data = JSON.stringify(Interlocuteur);
		return this.http.post(this.g.baseUrl +  '/api/Interlocuteur/modifierInterlocuteur', data, options);
	}

}