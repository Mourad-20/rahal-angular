import {Injectable} from '@angular/core';
import {HttpClient,	HttpErrorResponse,	HttpHeaders} from '@angular/common/http';
import { CookieService  } from 'ngx-cookie-service';
import { Globals } from '../globals';


@Injectable()
export class SeanceSvc {

	private headers = new HttpHeaders({	'Content-Type': 'application/json' });

	constructor(private http: HttpClient,private g: Globals) {

	}
	
	getSeances(datedebut: string,datefin: string) {
		let paramDate = {"_datedebut" : datedebut,"_datefin":datefin};	
		let options = {	headers: this.headers,withCredentials: true	};
		let data = JSON.stringify(paramDate);
		return this.http.post(this.g.baseUrl +  '/api/seance/getSeances', data, options);
	}

	getSeanceActive() {
		let options = {	headers: this.headers,withCredentials: true	};
		let data = {};
		return this.http.post(this.g.baseUrl +  '/api/seance/getSeanceActive', data, options);
	}

	ouvrirSeance(seance: any) {
		let options = {	headers: this.headers,withCredentials: true	};
		let data = JSON.stringify(seance);
		return this.http.post(this.g.baseUrl +  '/api/seance/ouvrirSeance', data, options);
	}
	
	fermerSeance(seance: any) {
		let options = {	headers: this.headers,withCredentials: true	};
		let data = JSON.stringify(seance);
		return this.http.post(this.g.baseUrl +  '/api/seance/fermerSeance', data, options);
	}

}