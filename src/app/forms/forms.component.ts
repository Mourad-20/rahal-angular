import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Routes, Router } from '@angular/router';

import { Globals } from '../globals';
import { JsonFormData } from '../components/json-form/json-form.component';
import { GroupeSvc } from '../services/groupeSvc';
import { UtilisateurSvc } from '../services/utilisateurSvc';
import { Utilisateur } from '../entities/Utilisateur';
import {Login} from '../entities/Login';
import { Rxjs } from '../services/rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
import Swal from 'sweetalert2';
import { Observable, Subject, Subscription } from 'rxjs';
import { Objettoupdate } from './objettoupdate';
import { ArticleSvc } from '../services/articleSvc';
import { CategorieSvc } from '../services/categorieSvc';
import { CaisseSvc } from '../services/caisseSvc';
import { LocaliteSvc } from '../services/localiteSvc';

import { ClientSvc } from '../services/ClientSvc';
import { LotSvc } from '../services/lotSvc';
import { ProjetSvc } from '../services/projetSvc';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
public formData: JsonFormData |any;
public resultat:any
public utilisateur : Utilisateur|any
private obj: Array<string>=[];
public utilisateurOrg : Utilisateur[] = [];
public form:string="utilisateur"
public url:string=""
public title:string=""
public id:number=0
public login:Login|any
public logins:Login[]=[]
public  $: any;

    
  sub: any;

  constructor(public ProjetSvc:ProjetSvc,public ClientSvc:ClientSvc,public LotSvc:LotSvc,public router:Router,
    public LocaliteSvc:LocaliteSvc,public CaisseSvc:CaisseSvc,
    public CategorieSvc:CategorieSvc,public articleSvc:ArticleSvc,public objettoupdat:Objettoupdate, 
    public route:ActivatedRoute,public GroupeSvc:GroupeSvc,private http: HttpClient,private g:Globals,
    public utilisateurSvc:UtilisateurSvc,public rxjs:Rxjs) { 
    
  if(this.g.typeform=="utilisateur"){ 
    this.url='/assets/utilisateur-form.json'
 this.title="Forms->Utilisateur"

}
  if(this.g.typeform=="article"){ 
    this.url='/assets/article-form.json'
 this.title="Forms->Article"

}
  if(this.g.typeform=="localite"){ 
    this.url='/assets/localite-form.json'
 this.title="Forms->localite"

}

  if(this.g.typeform=="categorie"){ 
    this.url='/assets/categorie-form.json'
 this.title="Forms->Categorie"

}
 if(this.g.typeform=="caisse"){ 
    this.url='/assets/caisse-form.json'
 this.title="Forms->Stock"

}
//========================================================
 if(this.g.typeform=="client"){ 
    this.url='/assets/client-form.json'
 this.title="Forms->Client"

} if(this.g.typeform=="lot"){ 
    this.url='/assets/lot-form.json'
 this.title="Forms->Lot"

} if(this.g.typeform=="projet"){ 
    this.url='/assets/projet-form.json'
 this.title="Forms->Projet"

}
  }

 

 async  ngOnInit() {
this.sub = this.route.params.subscribe(params => {
   //this.g.showLoadingBlock(true)
      if(params['id']!=null ) {
        
        this.objettoupdat.id= Number(params['id'])>=0?params['id']:0 }
      else{
        
        this.objettoupdat.id=0
      }})
console.log(this.g.typeform)
 setTimeout(() => {
    this.http
      .get(this.url)
      .subscribe((formData: JsonFormData|any) => {

if(this.g.typeform=="lot"){
  
           this.objettoupdat.getProjet().subscribe((res)=>{
            
     formData.controls.push(JSON.parse(res))
     
   

    this.objettoupdat.rechargerlotformdata(formData).subscribe((form:any)=>{
            formData.controls=JSON.parse(form)
                this.formData = formData
                 this.g.showLoadingBlock(false);
    }) 
         
          })
}
if(this.g.typeform=="projet"){
  
       this.objettoupdat.rechargerprojetformdata(formData).subscribe((form:any)=>{ 
             //console.log("test01===",JSON.parse(form))
            formData.controls=JSON.parse(form)
              this.formData = formData
       this.g.showLoadingBlock(false);
  //console.log("formData",formData.controls)
          })
   
       
  /*  setTimeout(()=>{
     this.formData = formData
       this.g.showLoadingBlock(false);
    },1000)  */
}
if(this.g.typeform=="client"){
    
        this.objettoupdat.rechargerclientformdata(formData).subscribe((form:any)=>{
             //console.log("test01===",form)
            formData.controls=JSON.parse(form) 
                this.formData = formData
     this.g.showLoadingBlock(false);
          })
      

}



if(this.g.typeform=="utilisateur"){
       
          this.objettoupdat.rechargerutilisateurformdata(formData).subscribe((form:any)=>{
             //console.log("test01===",form)
            formData.controls=JSON.parse(form) 
                this.formData = formData
     this.g.showLoadingBlock(false);
          })

}

if(this.g.typeform=="article"){
  
           this.objettoupdat.getCategorie().subscribe((res)=>{
            
     formData.controls.push(JSON.parse(res))
     formData.controls.push(this.objettoupdat.getTVAs())
     formData.controls.push(this.objettoupdat.getTypesArticle())

     
    

    this.objettoupdat.rechargerarticleformdata(formData).subscribe((form:any)=>{
            formData.controls=JSON.parse(form)
                this.formData = formData
                 this.g.showLoadingBlock(false);
    }) 
         
          })
}

if(this.g.typeform=="categorie"){
  
       this.objettoupdat.rechargercategorieformdata(formData).subscribe((form:any)=>{ 
             //console.log("test01===",JSON.parse(form))
            formData.controls=JSON.parse(form)
              this.formData = formData
       this.g.showLoadingBlock(false);
  //console.log("formData",formData.controls)
          })
   
       
  /*  setTimeout(()=>{
     this.formData = formData
       this.g.showLoadingBlock(false);
    },1000)  */
}
if(this.g.typeform=="caisse"){
  //debugger
          this.objettoupdat.rechargercaisseformdata(formData).subscribe((form:any)=>{
            formData.controls=JSON.parse(form)
     this.formData = formData
       this.g.showLoadingBlock(false);
      
          })
}
if(this.g.typeform=="localite"){
    
       
    formData.controls.push(this.objettoupdat.getLocaliteCode())


          this.objettoupdat.rechargerlocaliteformdata(formData).subscribe((form:any)=>{
             //console.log("test01===",form)
            formData.controls=JSON.parse(form) 
                this.formData = formData
     this.g.showLoadingBlock(false);
          })
      

}
      });
 }, 1000);
 
  }

  submit(forms: FormGroup|any){
    console.log("submit===",forms)
console.log("id==",typeof this.objettoupdat.id)
   		if(this.objettoupdat.id === NaN || this.objettoupdat.id === 0){
         if(this.g.typeform=="utilisateur"){
this.ajouterUtilisateur(forms);
         }
		   if(this.g.typeform=="article"){
this.ajouterArticle(forms);
         }
         if(this.g.typeform=="categorie"){
this.ajouterCategorie(forms);
         } 
          if(this.g.typeform=="caisse"){
this.ajouterCaisse(forms);
         } 
            if(this.g.typeform=="localite"){
this.ajouterLocalite(forms);
         } 

         	   if(this.g.typeform=="client"){
this.ajouterClient(forms);
         }
         	   if(this.g.typeform=="lot"){
this.ajouterLot(forms);
         }
         	   if(this.g.typeform=="projet"){
this.ajouterProjet(forms);
         }
		} 
    
    
    else{
       if(this.g.typeform=="utilisateur"){
this.modifierUtilisateur(forms);
         }
		   if(this.g.typeform=="article"){
this.modifierArticle(forms);
         }
		  if(this.g.typeform=="categorie"){
        this.modifierCategorie(forms)
      }
      if(this.g.typeform=="caisse"){
        this.modifierCaisse(forms)
      }
         if(this.g.typeform=="localite"){
        this.modifierLocalite(forms)
      }
      	   if(this.g.typeform=="client"){
this.modifierClient(forms);
         }
         	   if(this.g.typeform=="lot"){
this.modifierLot(forms);
         }
         	   if(this.g.typeform=="projet"){
this.modifierProjet(forms);
         }


      let url=this.g.typeform+"s"
      this.router.navigate(['liste/'+url]);
		} 
forms.reset();
  }

  ajouterUtilisateur(forms:FormGroup|any){
this.objettoupdat.getutilisateur(forms).then((result)=>{
    this.g.showLoadingBlock(true);
    console.log("result==",result)
      this.utilisateurSvc.ajouterUtilisateur(result).subscribe(
      (res:any) => {
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
        //console.log("Succes")
          Swal.fire({ text: etatReponse.Message , icon: 'success'});
        }else{ 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        this.g.showLoadingBlock(false);    
      }
    ); 

})
  }

    ajouterArticle(forms:FormGroup|any){
      console.log("forms",forms)
this.objettoupdat.getarticle(forms).then((result)=>{
    this.g.showLoadingBlock(true);
      this.articleSvc.addArticle(result).subscribe(
      (res:any) => {
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
        //console.log("Succes")
          Swal.fire({ text: etatReponse.Message , icon: 'success'});
        }else{ 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        this.g.showLoadingBlock(false);    
      }
    ); 

})
  }
     ajouterLot(forms:FormGroup|any){
     
this.objettoupdat.getlot(forms).then((result)=>{
    this.g.showLoadingBlock(true);
      this.LotSvc.Addlot(result).subscribe(
      (res:any) => {
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
        //console.log("Succes")
          Swal.fire({ text: etatReponse.Message , icon: 'success'});
        }else{ 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        this.g.showLoadingBlock(false);    
      }
    ); 

})
  }
    ajouterLocalite(forms:FormGroup|any){
this.objettoupdat.getlocalite(forms).then((result)=>{
    this.g.showLoadingBlock(true);
      this.LocaliteSvc.ajouterLocalite(result).subscribe(
      (res:any) => {
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
        //console.log("Succes")
          Swal.fire({ text: etatReponse.Message , icon: 'success'});
        }else{ 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        this.g.showLoadingBlock(false);    
      }
    ); 

})
  }
     ajouterClient(forms:FormGroup|any){
this.objettoupdat.getClient(forms).then((result)=>{
    this.g.showLoadingBlock(true);
      this.ClientSvc.ajouterclient(result).subscribe(
      (res:any) => {
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
        //console.log("Succes")
          Swal.fire({ text: etatReponse.Message , icon: 'success'});
        }else{ 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        this.g.showLoadingBlock(false);    
      }
    ); 

})
  }  
    ajouterCategorie(forms:FormGroup|any){
this.objettoupdat.getcategorie(forms).then((result)=>{
    this.g.showLoadingBlock(true);
      this.CategorieSvc.ajouterCategorie(result).subscribe(
      (res:any) => {
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
        //console.log("Succes")
          Swal.fire({ text: etatReponse.Message , icon: 'success'});
        }else{ 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        this.g.showLoadingBlock(false);    
      }
    ); 

})
  }
  ajouterProjet(forms:FormGroup|any){
this.objettoupdat.getprojet(forms).then((result)=>{
    this.g.showLoadingBlock(true);
      this.ProjetSvc.ajouterprojet(result).subscribe(
      (res:any) => {
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
        //console.log("Succes")
          Swal.fire({ text: etatReponse.Message , icon: 'success'});
        }else{ 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        this.g.showLoadingBlock(false);    
      }
    ); 

})
  }
      ajouterCaisse(forms:FormGroup|any){
this.objettoupdat.getcaisse(forms).then((result)=>{
    this.g.showLoadingBlock(true);
      this.CaisseSvc.addCaisse(result).subscribe(
      (res:any) => {
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
        //console.log("Succes")
          Swal.fire({ text: etatReponse.Message , icon: 'success'});
        }else{ 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        this.g.showLoadingBlock(false);    
      }
    ); 

})
  }

    modifierUtilisateur(forms:FormGroup|any){
    
this.objettoupdat.getutilisateur(forms).then((result)=>{
  console.log("resltat",result)
    this.g.showLoadingBlock(true);
      this.utilisateurSvc.modifierUtilisateur(result).subscribe(
      (res:any) => {
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
        //console.log("Succes")
          Swal.fire({ text: etatReponse.Message , icon: 'success'});
        }else{ 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        this.g.showLoadingBlock(false);    
      }
    ); 

})
  }

     modifierArticle(forms:FormGroup|any){
  console.log("modifier")
  this.objettoupdat.getarticle(forms).then((result)=>{
  console.log("resltatxx==",result)
    this.g.showLoadingBlock(true);
      this.articleSvc.updateArticle(result).subscribe(
      (res:any) => {
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
        //console.log("Succes")
          Swal.fire({ text: etatReponse.Message , icon: 'success'});
        }else{ 
          Swal.fire({ text: "update article" , icon: 'error'});
        }
        this.g.showLoadingBlock(false);    
      }
    ); 

})
  }
     modifierLot(forms:FormGroup|any){
  this.objettoupdat.getlot(forms).then((result)=>{
    this.g.showLoadingBlock(true);
      this.LotSvc.updatelot(result).subscribe(
      (res:any) => {
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
        //console.log("Succes")
          Swal.fire({ text: etatReponse.Message , icon: 'success'});
        }else{ 
          Swal.fire({ text: "update article" , icon: 'error'});
        }
        this.g.showLoadingBlock(false);    
      }
    ); 

})
  }
     modifierLocalite(forms:FormGroup|any){
this.objettoupdat.getlocalite(forms).then((result)=>{
  console.log("resltat==",result)
    this.g.showLoadingBlock(true);
      this.LocaliteSvc.modifierLocalite(result).subscribe(
      (res:any) => {
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
        //console.log("Succes")
          Swal.fire({ text: etatReponse.Message , icon: 'success'});
        }else{ 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        this.g.showLoadingBlock(false);    
      }
    ); 

})
  }
      modifierClient(forms:FormGroup|any){
this.objettoupdat.getClient(forms).then((result)=>{
    this.g.showLoadingBlock(true);
      this.ClientSvc.modifierclient(result).subscribe(
      (res:any) => {
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
        //console.log("Succes")
          Swal.fire({ text: etatReponse.Message , icon: 'success'});
        }else{ 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        this.g.showLoadingBlock(false);    
      }
    ); 

})
  }
     modifierCategorie(forms:FormGroup|any){
      //console.log('forms',forms)
this.objettoupdat.getcategorie(forms).then((result)=>{
  //console.log("resltat",result)
    this.g.showLoadingBlock(true);
      this.CategorieSvc.modifierCategorie(result).subscribe(
      (res:any) => {
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
        //console.log("Succes")
          Swal.fire({ text: etatReponse.Message , icon: 'success'});
        }else{ 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        this.g.showLoadingBlock(false);    
      }
    ); 

})
  }
      modifierProjet(forms:FormGroup|any){
      //console.log('forms',forms)
this.objettoupdat.getprojet(forms).then((result)=>{
  //console.log("resltat",result)
    this.g.showLoadingBlock(true);
      this.ProjetSvc.modifierprojet(result).subscribe(
      (res:any) => {
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
        //console.log("Succes")
          Swal.fire({ text: etatReponse.Message , icon: 'success'});
        }else{ 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        this.g.showLoadingBlock(false);    
      }
    ); 

})
  }
  modifierCaisse(forms:FormGroup|any){
      //console.log('forms',forms)
this.objettoupdat.getcaisse(forms).then((result)=>{
  //console.log("resltat",result)
    this.g.showLoadingBlock(true);
      this.CaisseSvc.updateCaisse(result).subscribe(
      (res:any) => {
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
        //console.log("Succes")
          Swal.fire({ text: etatReponse.Message , icon: 'success'});
        }else{ 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        this.g.showLoadingBlock(false);    
      }
    ); 

})
  }
}
