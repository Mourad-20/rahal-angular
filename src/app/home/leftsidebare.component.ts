import { Component,EventEmitter,Input,OnInit, Output, ViewChild } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { Globals } from '../globals';
import { UtilisateurSvc } from '../services/utilisateurSvc';
import { GroupeCode } from '../entities/GroupeCode';
import{Rxjs} from '../services/rxjs';
@Component({
  selector: 'app-leftsidebare',
  templateUrl: './leftsidebar.html',
  styleUrls: []
})
export class LeftsidebareComponent implements OnInit {
public collapse:number=0
GroupeCode:GroupeCode=new GroupeCode()
constructor(public g: Globals, public sharedService:Rxjs , public router:Router,public utilisateurSvc:UtilisateurSvc) {
	console.log('--------------------------------------');
	console.log('Home constructor()');	
}

  ngOnInit() {	  
	console.log('Home ngOnInit()');
  }
goto(link:string|any){
  this.router.navigateByUrl(link, { skipLocationChange: true }).then(() => {
    this.router.navigate([link]);
}); 

}
logout(){
  this.g.typelogin=""
  this.router.navigate(['logout']);
}
showCommandesNonReglees(){
 this.sharedService.sendClickEvent();}
initcaisse(){
  this.sharedService.initcaisseEvent();
}

 showCommandesNonControler(){
 this.sharedService.controleEvent();}


async forme(typeform:string|any){
 
await this.g.settype(typeform)
this.router.navigateByUrl('/forms', { skipLocationChange: true }).then(() => {
    this.router.navigate(['forms/'+typeform]);
}); 
//this.router.navigate(['forms/'+typeform]);	 
}

async liste(typeform:string|any){
this.router.navigate(['liste/'+typeform]);
//this.router.navigate(['forms/'+typeform]);	 
}
Collapse(id:number|any){
  this.collapse==id?
    this.collapse=0:this.collapse=id
}

}



