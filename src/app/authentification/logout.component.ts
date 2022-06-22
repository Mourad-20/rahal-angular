import { Component, OnInit, NgModule, Input, Output } from '@angular/core';
import { NgModel , NgForm } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { CookieService  } from 'ngx-cookie-service';
import { Globals } from '../globals';
import { UtilisateurSvc } from '../services/utilisateurSvc';
import Swal from 'sweetalert2';
import * as $AB from 'jquery';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.html',
  styleUrls: []
})
export class LogoutComponent implements OnInit {  
  
  constructor(private g: Globals,private router: Router,private cookieService:CookieService,private utilisateurSvc:UtilisateurSvc) {
    
	this.utilisateurSvc.seDeconnecter();
	setTimeout(() => { this.cookieService.deleteAll(); }, 500);	
	this.utilisateurSvc.redirectionToLogin();
	}


	ngOnInit() {
		
		
  }
  
}
