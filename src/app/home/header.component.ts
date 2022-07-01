import { Component,OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { Globals } from '../globals';
import { UtilisateurSvc } from '../services/utilisateurSvc';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: []
})
export class HeaderComponent implements OnInit {
  


constructor(public g: Globals,private router: Router,public utilisateurSvc:UtilisateurSvc) {
		
  }
fullscreen(){
  this.g.toggle()
}
  ngOnInit() {
  	//alert("je suis header");
  }
  
  logout(){
    this.g.typelogin=""
	  this.router.navigate(['logout']);
  }
  
  goHome(){
	  this.router.navigate(['home']);	  
  }
  



}
