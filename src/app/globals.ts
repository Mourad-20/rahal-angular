import { Injectable,HostListener } from '@angular/core';
import { CookieService  } from 'ngx-cookie-service';
import { Utilisateur } from './entities/Utilisateur';
import { Categorie } from './entities/Categorie';
import { Article } from './entities/Article';
import { Seance } from './entities/Seance';
import * as $ from "jquery";
//import { timeStamp } from 'console';
interface FullScreenDocument extends Document {
  documentElement: FullScreenDocumentElement;
  mozFullScreenElement?: Element;
  msFullscreenElement?: Element;
  webkitFullscreenElement?: Element;
  msExitFullscreen?: () => void;
  mozCancelFullScreen?: () => void;
  webkitExitFullscreen?: () => void;
}

interface FullScreenDocumentElement extends HTMLElement {
  msRequestFullscreen?: () => void;
  mozRequestFullScreen?: () => void;
  webkitRequestFullscreen?: () => void;
}
Injectable()
export class Globals{
	
	HttpStateCode = { 'OK': '1', 'ERROR': '2', 'NOT_CONNECTED': '3', 'NOT_ALLOWED': '4' };
    EtatReponseCode = { 'SUCCESS': '10', 'DANGER': '20', 'WARNING': '30', 'INFO': '40' };
   // public baseUrl? : string  = 'http://iris01.ddns.net:6500/'; // pour deploiement local
	//public baseUrl? : string  = 'http://192.168.43.14:6500'; // pour deploiement cafe
public baseUrl? : string  = 'http://localhost:53270'; // pour VS
    //public baseUrl? : string  = 'http://169.254.233.107:6500'; // pour VM
	
    public utilisateur? : Utilisateur | null;
    public isConnected? : boolean | null;
    public seance? : Seance  | null;
    public categories : Categorie[] = [];
    public articles : Article[] = [];
    public articlesOrg : Article[] = [];
    public typeform :string="";
    public IdCaisseparam:number=0;
    public namecaisseparam:string=""
	public typecaisseparam:string=""
	public typecommande:string=""
    public typelogin:string=""
    public elem:any
    public title:string="";
    public bol:boolean=false
     private doc = <FullScreenDocument>document;
    setTitle(newTitle : string) {
        document.title = newTitle;
    }



	showLoadingBlock (value : any) {
        $("#loadingBlock").css({ "display": (value == true) ? "block" : "none" });
    }


      handleKeyDown(event: KeyboardEvent) {

	if(event.key=="Escape"){
        console.log(event.key)
     setTimeout(() => {
        this.toggle() 
     }, 2000);

       
     
        // this.leave(); 
         //  this.toggle()
     

	}

  }
   

  enter() {
      this.bol=!this.bol
    const el = this.doc.documentElement;
    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.msRequestFullscreen) el.msRequestFullscreen();
    else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  }

  leave() {
      this.bol=!this.bol
    if (this.doc.exitFullscreen) this.doc.exitFullscreen();
    else if (this.doc.msExitFullscreen) this.doc.msExitFullscreen();
    else if (this.doc.mozCancelFullScreen) this.doc.mozCancelFullScreen();
    else if (this.doc.webkitExitFullscreen) this.doc.webkitExitFullscreen();
  }

  toggle() {
      console.log(this.enabled)
    if (this.enabled) this.leave();
    else this.enter();
  }

  get enabled() {
    return !!(
      this.doc.fullscreenElement ||
      this.doc.mozFullScreenElement ||
      this.doc.webkitFullscreenElement ||
      this.doc.msFullscreenElement
    );
  }

openFullscreen() {
    this.elem =document.documentElement;
        if (this.elem.requestFullscreen) {
          this.elem.requestFullscreen();
        } else if (this.elem.mozRequestFullScreen) {
          /* Firefox */
         // this.elem.mozRequestFullScreen();
        } else if (this.elem.webkitRequestFullscreen) {
          /* Chrome, Safari and Opera */
          this.elem.webkitRequestFullscreen();
        } else if (this.elem.msRequestFullscreen) {
          /* IE/Edge */
          this.elem.msRequestFullscreen();
        }
      }
async settype(typeform:string|any)
{
 this.typeform=typeform
}
async setparamcaisse(IdCaisse:number|any,nameparamcaisse:string|any,paramcaisse:string|any){
 this.namecaisseparam=nameparamcaisse;
 this.IdCaisseparam=IdCaisse;
 this.typecaisseparam=paramcaisse;
}
}