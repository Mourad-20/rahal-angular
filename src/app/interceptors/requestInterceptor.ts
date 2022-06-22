import { Injectable } from '@angular/core';
import { HttpInterceptor,HttpRequest,HttpResponse, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, Observer } from 'rxjs'


import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CookieService  } from 'ngx-cookie-service';
import { Globals } from '../globals';
import { UtilisateurSvc } from '../services/utilisateurSvc';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
	
	constructor(private g: Globals, private router: Router,private cookieService:CookieService,private utilisateurSvc:UtilisateurSvc) {

	}
	
	getToken(event: HttpEvent<any>){
		let token = null;
		if (event instanceof HttpResponse) {
			token = event.headers.get('authorization');
			if(token != null && token.includes('Bearer')){
				token = token.substring('Bearer '.length);
			}else{
				token = null;
			}			
		}
		//console.log('TOKEN RECIEPT:' + token);
		return token;		
	}
	
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        

        if(this.cookieService.get('mytoken').length > 0){
			let MY_TOKEN = JSON.parse(this.cookieService.get('mytoken'));
			if (MY_TOKEN != null && MY_TOKEN.length > 0 ) {
				request = request.clone({ headers: request.headers.set('authorization', 'Bearer ' + MY_TOKEN) });
				//console.log('TOKEN SENT:' + MY_TOKEN);
			}
		}


        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {	
            	//alert('hello interceptor');			
                if (event instanceof HttpResponse) {

	            	let token = this.getToken(event);
					if(token != null && token.length > 0)
					{
						this.cookieService.set('mytoken',JSON.stringify(token));
					}


					if(event.body != null && event.body.HttpState != null){
						let httpState = event.body.HttpState;
						//console.log(httpState);
						if(httpState.Code == this.g.HttpStateCode["NOT_CONNECTED"])
						{
							console.log('REDIRECTION VERS LOGIN...');
							this.utilisateurSvc.seDeconnecter();
							setTimeout(() => { this.cookieService.deleteAll(); }, 500);
							this.utilisateurSvc.redirectionToLogin();
							this.g.showLoadingBlock(false);
							return event;
						}
					}

                }								
                return event;
            }));
    }
	
}