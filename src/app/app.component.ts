import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,NavigationStart,NavigationEnd,NavigationError,RoutesRecognized } from '@angular/router';
import { CookieService  } from 'ngx-cookie-service';
import {filter} from 'rxjs/operators';

import { Globals } from './globals';
import { UtilisateurSvc } from './services/utilisateurSvc';
import { ZoneSvc } from './services/zoneSvc';
import { CategorieSvc } from './services/categorieSvc';
import { ArticleSvc } from './services/articleSvc';
import { SeanceSvc } from './services/seanceSvc';
import { Categorie } from './entities/Categorie';
import { Article } from './entities/Article';
import { EtatReponse } from './entities/EtatReponse';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	


  constructor(private g: Globals,private router: Router,private cookieService:CookieService,private utilisateurSvc:UtilisateurSvc
  ,private categorieSvc:CategorieSvc,private articleSvc:ArticleSvc,private seanceSvc:SeanceSvc) {
	//***************************************************************************************************
	this.g.setTitle('.');
	//alert('Hi AppComponent');
	/*-----------*/
	this.router.events.forEach((event) => {
		if (event instanceof NavigationEnd) {
			
			console.log(event.url);
			if (this.utilisateurSvc.isUserConnected() == false)
			{
				if (event.url != '/login') {
					console.log('STEP 1....');
					this.utilisateurSvc.redirectionToLogin();
				}                    
			}
			else {
				this.checkerConnection();
			}
		}
	});
	/*-----------*/
		 
	
		 
		 
		 
	
	
	//***************************************************************************************************
	}
	 
		actiontest(){
			console.log("test")
		} 
		 
	checkerConnection(){
		console.log('checkerConnection()...')
		this.utilisateurSvc.checkerConnection().subscribe(
		  (res:any) => {
			let etatReponse = res["EtatReponse"];
		  }
		);
	}
	
	loadInitialData(){
		console.log('loadInitialData().......');
		//----------------------------------------------------
		this.utilisateurSvc.loadInfoUtilisateur();
		//----------------------------------------------------
	  }
  
  ngOnInit() {
	  this.loadInitialData();
  }

/*  methode() {
  console.log("parent component function.");
  //this.child.showCommandesNonReglees()
  }
	 */
}