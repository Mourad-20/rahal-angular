import { Globals } from '../globals';
import { Injectable } from '@angular/core';
import { Utilisateur } from '../entities/Utilisateur';
import { Article } from '../entities/Article';
import { Categorie } from '../entities/Categorie';
import { ArticleSvc } from '../services/articleSvc';
import { LocaliteSvc } from '../services/localiteSvc';
import { LocaliteCode } from '../entities/LocaliteCode';
import Swal from 'sweetalert2';
import { JsonFormData } from '../components/json-form/json-form.component';
import { ActivatedRoute } from '@angular/router';
import { UtilisateurSvc } from '../services/utilisateurSvc';
import { GroupeSvc } from '../services/groupeSvc';
import { Observable, Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { CategorieSvc } from '../services/categorieSvc';
import { Caisse } from '../entities/Caisse';
import { Localite } from '../entities/Localite';
import { CaisseSvc } from '../services/caisseSvc';
import{GroupeCode}from '../entities/GroupeCode'; 
import { HttpClient } from '@angular/common/http';
import { ZoneSvc } from '../services/zoneSvc';
import { TypeUniteSvc } from '../services/typeuniteSvc';
import{TauxTva}from '../entities/TauxTva';
import {TypeArticleCode}from '../entities/TypeArticleCode';
@Injectable()
export class Objettoupdate{
    public sub:any
    public id:number|any=null
    public LocaliteCode:LocaliteCode=new LocaliteCode()
    public utilisateur:Utilisateur|any
    public GroupeCode : GroupeCode = new GroupeCode();
    public TauxTva:TauxTva=new TauxTva();
    public serveursOrg:Utilisateur[]=[]
    public TypeArticle:TypeArticleCode=new TypeArticleCode();
public groupe :any= {
        "name": "Groupe",
      "label": "Groupe:",
      "value": "",
      "type": "select",
      "option":[],
      "validators": {"required": true,
        }
    };
  constructor(public TypeUniteSvc:TypeUniteSvc,public LocaliteSvc:LocaliteSvc,private http: HttpClient,public zoneSvc:ZoneSvc ,public CaisseSvc:CaisseSvc,public CategorieSvc:CategorieSvc,public ArticleSvc:ArticleSvc,public GroupeSvc:GroupeSvc,public route:ActivatedRoute,private g: Globals,public utilisateurSvc:UtilisateurSvc) {
  this.sub = this.route.params.subscribe(params => {
      if(params['id']!=null) {
        this.id=params['id']}
        })
  
      }

  _objettoupdate(): Observable<string>{


     var subject = new Subject<string>();
switch (this.g.typeform) {
    case 'utilisateur':
      
       this.utilisateurSvc.getListeUtilisateurs().subscribe(
       (res:any) => {
        let etatReponse = res["EtatReponse"];

        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
             // console.log("resultat==",res["utilisateurVMs"])

          let utilisateurs:Utilisateur[] = res["utilisateurVMs"];
        let objet:Utilisateur=utilisateurs.filter(x => x.Identifiant==this.id)[0]
      

            subject.next (JSON.stringify(objet)) 
          
        }else{ 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        //this.g.showLoadingBlock(false);    
      }
    );
        break;

         case 'localite':
      
       this.LocaliteSvc.getLocalites().subscribe(
       (res:any) => {
        let etatReponse = res["EtatReponse"];

        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
             // console.log("resultat==",res["utilisateurVMs"])

          let localites:Localite[] = res["localiteVMs"];
        let objet:Localite=localites.filter(x => x.Identifiant==this.id)[0]
      

            subject.next (JSON.stringify(objet)) 
          
        }else{ 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        this.g.showLoadingBlock(false);    
      }
    );
        break;

       case 'article':
       this.ArticleSvc.getArticles().subscribe(
       
       (res:any) => {
        let etatReponse = res["EtatReponse"];

        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
             // console.log("resultat==",res["utilisateurVMs"])

        let articles:Article[] = res["articleVMs"];
        let objet:Article=articles.filter(x => x.Identifiant==this.id)[0]
        subject.next (JSON.stringify(objet)) 
          
        }else{ 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        this.g.showLoadingBlock(false);    
      }
    );
        break;
       case 'categorie':
       this.CategorieSvc.getCategories().subscribe(
       (res:any) => {
        let etatReponse = res["EtatReponse"];

        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
             // console.log("resultat==",res["utilisateurVMs"])

        let categories:Categorie [] = res["categorieVMs"];
        let objet:Categorie=categories.filter(x => x.Identifiant==this.id)[0]
        subject.next (JSON.stringify(objet)) 
          
        }else{ 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        this.g.showLoadingBlock(false);    
      }
    );
        break;

                    case 'caisse':
       this.CaisseSvc.getCaisse().subscribe(
       (res:any) => {
        let etatReponse = res["EtatReponse"];

        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {

        let Caisses:Caisse [] = res["caisseVMs"];
        let objet:Caisse=Caisses.filter(x => x.Identifiant==this.id)[0]

        subject.next (JSON.stringify(objet)) 
          
        }else{ 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        this.g.showLoadingBlock(false);    
      }
    );
        break;
      }
 

    return subject.asObservable();
}


rechargerutilisateurformdata(formData: JsonFormData|any):Observable<string>{

  var form = new Subject<string>();

   this.getGroupe().subscribe((res)=>{
     let groupe=JSON.parse(res);
     formData.controls.push(groupe)
       formData.controls.sort(function (a:any, b:any) {
      return a.id - b.id;
    } );
    
    if(this.id!=null && this.id!=0){
      let index=0
      formData.controls.forEach((element:any) => {
        if(element.name=="Password"){
          formData.controls.splice(index,1)
        }
        index++;
      });
    }
         this._objettoupdate().subscribe(
      (res:Utilisateur|any)=>{
try{   
 let objet = JSON.parse(res)
  this.setobjetfrom(formData,objet)
}
catch{


}
    form.next(JSON.stringify(formData.controls)) 
    })
   })
return form.asObservable();

}


rechargerlocaliteformdata(formData: JsonFormData|any):Observable<string>{
  var form = new Subject<string>();
    this.getCommerce().subscribe((res)=>{
     let commerce=JSON.parse(res);
     formData.controls.push(commerce)
       formData.controls.sort(function (a:any, b:any) {
      return a.id - b.id;
    } );
    

         this._objettoupdate().subscribe(
      (res:Localite|any)=>{
try{   
 let objet = JSON.parse(res)
  this.setobjetfrom(formData,objet)
}
catch{


}
     form.next(JSON.stringify(formData.controls)) 
    })
   })
  
 

 return form.asObservable();
 }
rechargerarticleformdata(formData: JsonFormData|any):Observable<string>{
  var form = new Subject<string>();
     this.getTypeUnite().subscribe((res)=>{
     let UniteType=JSON.parse(res);
     formData.controls.push(UniteType)
   
      formData.controls.sort(function (a:any, b:any) {
  return a.id - b.id;
});
 this._objettoupdate().subscribe(
       (res:Article|any)=>{
try{  
  let objet=JSON.parse(res)
     this.setobjetfrom(formData,objet)
}
catch{}
      form.next(JSON.stringify(formData.controls)) })
  }) 
return form.asObservable();
}

rechargercaisseformdata(formData: JsonFormData|any):Observable<string>{
 var form = new Subject<string>();
    
        this._objettoupdate().subscribe(
      (res:Caisse|any)=>{
try{    let objet=JSON.parse(res)
  formData.controls.forEach((control:any) => {
switch (control.name) {
    case 'Libelle':
        control.value=objet!=undefined? objet.Libelle:""
        break;
        
}
})}
catch{}
  
    form.next(JSON.stringify(formData.controls)) 
  })
return form.asObservable();

}
 chargerListServeur(){


   /*  this.g.showLoadingBlock(true);   */
    this.utilisateurSvc.getServeurs(null).subscribe(
      (res:any) => {
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
          this.serveursOrg = res["utilisateurVMs"];
		


        }else{ 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        this.g.showLoadingBlock(false);    
      }
    );
  }
rechargercategorieformdata(formData: JsonFormData|any):Observable<string>{
  
  var form = new Subject<string>();
       formData.controls.sort(function (a:any, b:any) {
  return a.id - b.id;
});
        this._objettoupdate().subscribe(
      async (res:Categorie|any)=>{ 
     try{
        let objet=JSON.parse(res)
     this.setobjetfrom(formData,objet)
}
     catch{}
    form.next(JSON.stringify(formData.controls)) 
  })
return form.asObservable();

}




setobjetfrom(forms: FormGroup|any,objet:Article|Categorie|Utilisateur|Caisse|Localite|any){
 console.log(objet)
  //let Objet:Article|Categorie|Utilisateur|Caisse|Localite|any

   for(const [key, value] of   Object.entries(objet)){
    let castKey = key as (keyof typeof objet);
   //debugger
    forms.controls.forEach((element:any) => {
      if( element.name==castKey){
      
         if(typeof objet[castKey]=="object"){
 
 element.value=(objet!=undefined && value!=null?objet[castKey][0]:"")
   }
   else{
      element.value=(objet!=undefined  && value!=null ?value:"")
   }

       // console.log(element.name);

      }
     
    });
  
   }
 

   return forms
   
}

getobjetfromsubmit(forms: FormGroup|any,objet:Article|Categorie|Utilisateur|Caisse|Localite|any){ 
  let Objet:Article|Categorie|Utilisateur|Caisse|Localite|any

  for(const [key, value] of  Object.entries(objet)){ 
    objet.Identifiant=this.id
    let castKey = key as (keyof typeof Objet);
   if(typeof objet[castKey]=="object"){
(objet as any)[castKey].push(forms.value[castKey]);
   }
   else{
     (objet as any)[castKey]=forms.value[castKey];
   }
}
   return objet  
}

async getarticle(forms: FormGroup|any){
  let article1:Article=new Article()
 let article:Article= this.getobjetfromsubmit(forms,article1)
  //  article.ImageAsString=forms.controls.ImageAsString.value

 return article
}
async getlocalite(forms: FormGroup|any){
  let localite1:Localite= new Localite();
  let localite:Localite= this.getobjetfromsubmit(forms,localite1)
     return localite

}
async getcategorie(forms: FormGroup|any){

   let cat1:Categorie= new Categorie();
  let categorie:Categorie= this.getobjetfromsubmit(forms,cat1)
     categorie.ImageAsString=forms.controls.ImageAsString.value

  return categorie
}

async getcaisse(forms: FormGroup|any){
  let caisse1:Caisse=new Caisse();
let caisse:Caisse=this.getobjetfromsubmit(forms,caisse1)

    return caisse
}
async getutilisateur(forms: FormGroup|any){
    let util:Utilisateur=new Utilisateur()
 let utilisateur:Utilisateur= this.getobjetfromsubmit(forms,util)
    return utilisateur
}

//============================================================================
//============================================================================
 getTypeUnite():Observable<string>{

  var typeunitestring = new Subject<string>();
  let typeunite:any= {
    "id": 6,
        "name": "LibelleTypeUnite",
      "label": "Unite:",
      "value": "",
      "type": "select",
      "option":[],
      "validators": {"required": true,
        }
    }
  typeunitestring.next(JSON.stringify(typeunite))
 this.TypeUniteSvc.getListeTypeUnites().subscribe(
		   (res:any) => {
			let etatReponse = res["EtatReponse"];
			if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
			   let resultat=res["typeUniteVMs"];
         resultat.forEach( (element: any) => {
            typeunite.option.push({"text":element.Libelle,"value":element.Code,"selected":false})
         });
      }
      typeunitestring.next(JSON.stringify(typeunite))
      }
     
      ) 
     
        //return this.groupe;
        return typeunitestring.asObservable();
}
 getGroupe():Observable<string>{

  var groupestring = new Subject<string>();
  let groupe:any= {
     "id": "2",
        "name": "CodesGroupes",
      "label": "Groupe:",
      "value": "",
      "type": "select",
      "option":[],
      "validators": {"required": true,
        }
    }
  groupestring.next(JSON.stringify(groupe))
 this.GroupeSvc.getListeGroupes().subscribe(
		   (res:any) => {
			let etatReponse = res["EtatReponse"];
			if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
			   let resultat=res["groupeVMs"];
         resultat.forEach( (element: any) => {
            groupe.option.push({"text":element.Code,"value":element.Code,"selected":false})
         });
      }
      groupestring.next(JSON.stringify(groupe))
      }
     
      ) 
     
        //return this.groupe;
        return groupestring.asObservable();
}
 getCommerce():Observable<string>{

  var commercestring = new Subject<string>();
  let commerce:any= {
     "id": "2",
        "name": "IdUtilisateur",
      "label": "Commerciale:",
      "value": "",
      "type": "select",
      "option":[],
      "validators": {"required": true,
        }
    }
  commercestring.next(JSON.stringify(commerce))
 this.utilisateurSvc.getListeCaissiers().subscribe(
		   (res:any) => {
			let etatReponse = res["EtatReponse"];
			if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
			   let resultat=res["utilisateurVMs"];
         resultat.forEach( (element: any) => {
           let name:string=element.Nom+" "+element.Prenom;
            commerce.option.push({"text":name,"value":element.Identifiant,"selected":false})
         });
      }
       commercestring.next(JSON.stringify(commerce))
      }
     
      ) 
     
        //return this.groupe;
        return commercestring.asObservable();
}
 getLocaliteCode2():Observable<string>{

  var codestring = new Subject<string>();
   let code:any= {
        "name": "Code",
      "label": "Code:",
      "value": "",
      "type": "select",
      "option":[],
      "validators": {"required": true
        }
    } 
 /*  for(const x in this.LocaliteCode){
      code.option.push({"text":x,"value":x,"selected":false})
     } */

  codestring.next(JSON.stringify(code))
     
        //return this.groupe;
        return codestring.asObservable();
}
  getLocaliteCode(){
 
   let code:any= {
      "id": "2",
        "name": "Code",
      "label": "Code:",
      "value": "",
      "type": "select",
      "option":[],
      "validators": {"required": true
        }
    } 
    for  (const x in this.LocaliteCode){
      if(x!=this.LocaliteCode.EMPORTER){
        code.option.push({"text":x,"value":x,"selected":false})}
      
     } 
 
     // 
        //return this.groupe;
      // let codestring = new Subject<string>();
        // codestring.next(JSON.stringify(code))
        return code;
}
 getListeZones():Observable<string>{

  var zonestring = new Subject<string>();
  let zone:any= {
        "id": 5,
        "name": "IdZone",
      "label": "Zone Impriment:",
      "value": "",
      "type": "select",
      "option":[],
      "validators": {"required": true,
        }
    }
  this.zoneSvc.getZonesForUI().subscribe(
		  (res:any) => {
			let etatReponse = res["EtatReponse"];
			if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
			   let resultat = res["zoneVMs"];
         resultat.forEach( (element: any) => {
            zone.option.push({"text":element.Libelle,"value":element.Identifiant,"selected":false})
         });
			}
			  zonestring.next(JSON.stringify(zone))
		  }
		);


        //return this.groupe;
        return zonestring.asObservable();
}
getTVAs(){
  let TVA:any= {
    "id": 5,
    "name": "TauxTva",
  "label": "Taux Tva:",
  "value": "",
  "type": "select",
  "option":[],
  "validators": {"required": true,
    }
}
for(const taux in this.TauxTva){
  TVA.option.push({"text":taux,"value":taux,"selected":false})}

          return TVA;
  }
  getTypesArticle(){
    let TypeArticle:any= {
      "id": 5,
      "name": "LibelleTypeArticle",
    "label": "Type Article:",
    "value": "",
    "type": "select",
    "option":[],
    "validators": {"required": true,
      }
  }
  for (const [key, value] of Object.entries(this.TypeArticle)) {


    TypeArticle.option.push({"text":value,"value":key,"selected":false})}
  
            return TypeArticle;
    }

 getCategorie():Observable<string>{

  var groupestring = new Subject<string>();
  let categorie:any= {
    "id": 2,
        "name": "IdCategorie",
      "label": "Categorie:",
      "value": "",
      "type": "select",
      "option":[],
      "validators": {"required": true
        }
    }
  

        this.CategorieSvc.getCategories().subscribe(
		   (res:any) => {
			let etatReponse = res["EtatReponse"];
			if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
			   let resultat=res["categorieVMs"];
         resultat.forEach( (element: any) => {
            categorie.option.push({"text":element.Libelle,"value":element.Identifiant,"selected":false})
         });
      }
      groupestring.next(JSON.stringify(categorie))
      }
     
      )
     
        //return this.groupe;
        return groupestring.asObservable();
}
//============================================================================
//============================================================================
}

function sleep(arg0: number) {
   return new Promise( resolve => setTimeout(resolve, arg0) );
 
}
