import {Injectable} from '@angular/core';
import {HttpClient,	HttpErrorResponse,	HttpHeaders} from '@angular/common/http';
import { CookieService  } from 'ngx-cookie-service';
import { Globals } from '../globals';


@Injectable()
export class AssociationMessageSvc {

	private headers = new HttpHeaders({	'Content-Type': 'application/json' });

	constructor(private http: HttpClient,private g: Globals) {

	}
	
	
	validerAssociationMessage(associationMessageVMs: any) {
		let options = {	headers: this.headers,withCredentials: true	};
		let data = JSON.stringify(associationMessageVMs);
		return this.http.post(this.g.baseUrl +  '/api/associationMessage/validerAssociationMessage', data, options);		
	}
	
	getAssociationMessages(idArticle : number) {
		let paramInt = {"Valeur" : idArticle};
		let options = {	headers: this.headers,withCredentials: true	};
		let data = JSON.stringify(paramInt);
		return this.http.post(this.g.baseUrl +  '/api/associationMessage/getAssociationMessages', data, options);		
	}
	
	
	


}