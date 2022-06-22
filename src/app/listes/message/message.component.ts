import { Component, OnInit } from '@angular/core';
import { Router,NavigationStart,NavigationEnd,NavigationError,RoutesRecognized } from '@angular/router';
import { Globals } from '../../globals';
import { Article } from 'src/app/entities/Article';
import { Categorie } from 'src/app/entities/Categorie';
import { ArticleSvc } from 'src/app/services/articleSvc';
import { CategorieSvc } from 'src/app/services/categorieSvc';
import { Message } from 'src/app/entities/Message';
import { MessageSvc } from 'src/app/services/messageSvc';
import {Subscription} from 'rxjs'
import { Rxjs } from '../../services/rxjs';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
public messages : Message[] = [];
public message=new  Message() ;
public libelle:string=""
public mode:boolean=false
public messagesOrg : Message[] = [];
  constructor(public MessageSvc:MessageSvc,public sharedService:Rxjs, public g: Globals,public articleSvc:ArticleSvc,private router: Router) { }


  ngOnInit(): void {
    this.chargerMessage();
  }

  afficherforme(){
    this.mode=!this.mode
    this.initform();

  }
  valider(){
    this.message.Libelle=this.libelle;
    this.message.EnActivite=true
       console.log("libelle",this.libelle)
    if(this.message.Identifiant==0){
   
this.ajouter()
    }
    else{
      this.modifier()
    }
  }
  ajouter(){

this.MessageSvc.ajouterMessage(this.message).subscribe(
      (res:any) => {
        let etatReponse = res["EtatReponse"];
         let httpState = res["HttpState"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
        //console.log("Succes")
          Swal.fire({ text: etatReponse.Message , icon: 'success'});
           this.initform()
        }else{ 
          
          Swal.fire({ text: httpState.Message , icon: 'error'});
        }
        this.g.showLoadingBlock(false);   
this.chargerMessage()
      }
    ); 
  }
  modifier(){

this.MessageSvc.modifierMessage(this.message).subscribe(
      (res:any) => {
        let etatReponse = res["EtatReponse"];
        let httpState = res["HttpState"];
        
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
        //console.log("Succes")
          Swal.fire({ text: etatReponse.Message , icon: 'success'});
           this.afficherforme()
        }else{ 
          console.log("Succes",etatReponse)
          Swal.fire({ text: httpState.Message , icon: 'error'});
        }
        this.g.showLoadingBlock(false);    
        this.chargerMessage()
      }
    ); 
  }
  initform(){
 this.message=new  Message() ;
 this.libelle="";

  }
     async refrechtable(){
   
  var datatable = $('#datatableexample').DataTable();
              //datatable reloading 
                datatable.destroy();
  setTimeout(() => {
   $('#datatableexample').DataTable( {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      lengthMenu : [5, 10, 25]
  } );
 }, 100);

} 

async update(idmessage:any){
  this.mode=true
 this.message=this.messages[idmessage]
 this.libelle=this.message.Libelle
 console.log(this.message)
}


async chargerMessage(){

   //this.g.showLoadingBlock(true);  
   await this.MessageSvc.getMessages().subscribe(
       (res:any) => {
        let etatReponse = res["EtatReponse"];

        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {

          this.messages = res["messageVMs"];
          this.messages=res["messageVMs"];
           this.refrechtable()

         
        }else{ 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        //this.g.showLoadingBlock(false);    
      }
    );
   return this.messages
  }
}
