import {Injectable} from '@angular/core';
import {HttpClient,	HttpErrorResponse,	HttpHeaders} from '@angular/common/http';
import { CookieService  } from 'ngx-cookie-service';
import { Globals } from '../globals';


@Injectable()
export class ArticleSvc {

	private headers = new HttpHeaders({	'Content-Type': 'application/json' });

	constructor(private http: HttpClient,private g: Globals) {

	}
	
	
	getArticles() {
		let options = {	headers: this.headers,withCredentials: true	};
		let data = {};
		return this.http.post(this.g.baseUrl +  '/api/article/getArticles', data, options);
	}
	
	addArticle(article: any){
		let options = {	headers: this.headers,withCredentials: true	};
		let data = JSON.stringify(article);
		return this.http.post(this.g.baseUrl +  '/api/article/AddArticle', data, options);
	}

updateArticle(article:any){
	console.log("okok")
		let options = {	headers: this.headers,withCredentials: true	};
		let data = JSON.stringify(article);
		return this.http.post(this.g.baseUrl +  '/api/article/updateArticle', data, options);
	}
	getDefaultImageAsBase64() {
		let options = {	headers: this.headers,withCredentials: true	};
		let data = {};
		return this.http.post(this.g.baseUrl +  '/api/article/getDefaultImageAsBase64', data, options);
	}
}