import { Component, OnInit, NgModule, Input, Output } from '@angular/core';
import { NgModel , NgForm } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { CookieService  } from 'ngx-cookie-service';
import { Utilisateur } from '../entities/Utilisateur';
import { Categorie } from '../entities/Categorie';
import { Article } from '../entities/Article';
import { Globals } from '../globals';
import { UtilisateurSvc } from '../services/utilisateurSvc';
import { CategorieSvc } from '../services/categorieSvc';
import { ArticleSvc } from '../services/articleSvc';
import Swal from 'sweetalert2';
import * as $AB from 'jquery';




declare const myTest: any;

@Component({
  selector: 'app-loginMobile',
  templateUrl: './loginMobile.html',
  styleUrls: []
})


export class LoginMobileComponent implements OnInit {
  

  public loginValue : string = "";
  public passwordValue : string = "";


  constructor(private g: Globals,private categorieSvc:CategorieSvc,private utilisateurSvc:UtilisateurSvc,private articleSvc:ArticleSvc,private router: Router,private cookieService:CookieService) {    
	//alert('HI LOGIN');
	this.utilisateurSvc.seDeconnecter();
	setTimeout(() => { this.cookieService.deleteAll(); }, 500);
  }


	ngOnInit() {	
		this.loginValue = "serveur";
		this.passwordValue = "123456";		
		
  }
  
  afficher(x : any){
  	this.passwordValue = this.passwordValue + x;
  }

  reset(){
  	this.passwordValue = "";
  }


  authentification(){
    this.g.showLoadingBlock(true);
    this.utilisateurSvc.authentifier(this.loginValue,this.passwordValue).subscribe(
      (res:any) => {
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
          this.g.utilisateur = res["utilisateurVM"];
		  this.g.isConnected = true;
		  this.router.navigate(['home']);
        }else{
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        this.g.showLoadingBlock(false);    
      }
    );
  }
  
  

  

}