import {Injectable} from '@angular/core';
import {HttpClient,	HttpErrorResponse,	HttpHeaders} from '@angular/common/http';
import { CookieService  } from 'ngx-cookie-service';
import { Globals } from '../globals';


@Injectable()
export class MessageSvc {

	private headers = new HttpHeaders({	'Content-Type': 'application/json' });

	constructor(private http: HttpClient,private g: Globals) {

	}
	
	
	getMessages() {
		let options = {	headers: this.headers,withCredentials: true	};
		let data = {};
		return this.http.post(this.g.baseUrl +  '/api/message/getMessages', data, options);
	}
		ajouterMessage(message: any){
		let options = {	headers: this.headers,withCredentials: true	};
		let data = JSON.stringify(message);
		return this.http.post(this.g.baseUrl +  '/api/message/ajouterMessage', data, options);
	}
	
	modifierMessage(message: any){
		let options = {	headers: this.headers,withCredentials: true	};
		let data = JSON.stringify(message);
		return this.http.post(this.g.baseUrl +  '/api/message/modifierMessage', data, options);
	}

		getMessagebyId(IdArticle : number) {
		let paramInt = {"Valeur" : IdArticle};
		let options = {	headers: this.headers,withCredentials: true	};
		let data = JSON.stringify(paramInt);
		return this.http.post(this.g.baseUrl +  '/api/Message/getMessagesbyId', data, options);		
	}

}