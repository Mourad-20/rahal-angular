import {Injectable} from '@angular/core';
import {HttpClient,	HttpErrorResponse,	HttpHeaders} from '@angular/common/http';
import { CookieService  } from 'ngx-cookie-service';
import { Globals } from '../globals';


@Injectable()
export class AffectationCaisseSvc {

	private headers = new HttpHeaders({	'Content-Type': 'application/json' });

	constructor(private http: HttpClient,private g: Globals) {

	}
	
	
	validerAffectationCaisse(affectationCaisseVMs: any) {
		let options = {	headers: this.headers,withCredentials: true	};
		let data = JSON.stringify(affectationCaisseVMs);
		return this.http.post(this.g.baseUrl +  '/api/affectationCaisse/validerAffectationCaisse', data, options);		
	}
	
	getAffectationCaisses(IdCaisse : number) {
		let paramInt = {"Valeur" : IdCaisse};
		let options = {	headers: this.headers,withCredentials: true	};
		let data = JSON.stringify(paramInt);
		return this.http.post(this.g.baseUrl +  '/api/affectationCaisse/getaffectationCaisses', data, options);		
	}
	
	
	


}