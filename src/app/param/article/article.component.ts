import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { Globals } from '../../globals';
import { CaisseSvc } from '../../services/caisseSvc';
import { CommercialisationSvc } from '../../services/commercialisationSvc';
import { AffectationCaisseSvc } from '../../services/affectationCaisseSvc';
import { Caisse } from '../../entities/Caisse';
import { Commercialisation } from '../../entities/Commercialisation';
import { AffectationCaisse } from '../../entities/AffectationCaisse';
import { Seance } from '../../entities/Seance';
import { ActeurSeance } from '../../entities/ActeurSeance';
import { SeanceSvc } from '../../services/seanceSvc';
import { ActeurSeanceSvc } from '../../services/acteurSeanceSvc';
import { Message } from 'src/app/entities/Message';
import { MessageSvc } from 'src/app/services/messageSvc';
import { AssociationMessage } from 'src/app/entities/AssociationMessage';
import { AssociationMessageSvc } from 'src/app/services/associationMessageSvc';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleparamComponent implements OnInit {
public messages : AssociationMessage[] = [];
public associationMessageVMs:AssociationMessage[]=[];
public associationMessageOrg:AssociationMessage[]=[];
public message=new  Message() ;
public libelle:string=""
public mode:boolean=false
public messagesOrg : Message[] = [];
  constructor(public AssociationMessageSvc:AssociationMessageSvc, public MessageSvc:MessageSvc, public g: Globals,private router: Router) { }

  ngOnInit(): void {
    // this.chargerMessage();
     this.getAssociationMessages()
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
active(item:AssociationMessage){
item.EnActivite=!item.EnActivite
this.messages=this.associationMessageVMs.filter(x=>x.EnActivite==true)
let messagex:AssociationMessage|any=this.associationMessageOrg.filter(y=>y.IdMessage=item.IdMessage)
messagex.EnActivite=!messagex.EnActivite
}

 valider(){
	  this.g.showLoadingBlock(true);
	  if(this.associationMessageVMs.length > 0){
		this.AssociationMessageSvc.validerAssociationMessage(this.associationMessageVMs).subscribe(
		  (res:any) => {
			let etatReponse = res["EtatReponse"];
			if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
        this.getAssociationMessages()
				Swal.fire({ text: etatReponse.Message , icon: 'success'});
				//($('#associationMessageModal') as any).modal('hide');
			}else{ 
			  Swal.fire({ text: etatReponse.Message , icon: 'error'});
			}
			this.g.showLoadingBlock(false);    
		  }
		);
			
	  }
  }
goto(){
  this.router.navigate(['liste/messages']);
}
getAssociationMessages(){
	  this.AssociationMessageSvc.getAssociationMessages(this.g.IdCaisseparam).subscribe(
			(response:any) => {
			  let etatReponse = response["EtatReponse"];
			  if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
				this.associationMessageVMs = response["associationMessageVMs"];
        this.associationMessageOrg=response["associationMessageVMs"];
        this.messages=this.associationMessageVMs.filter(x=>x.EnActivite==true)
				console.log(this.associationMessageVMs);
			  }else{
				Swal.fire({ text: etatReponse.Message , icon: 'error'});
			  }    
			}
		  );
  }
chargermessagebyname() {
    console.log(this.libelle)
    this.associationMessageVMs = this.associationMessageOrg.filter(x => x.LibelleMessage.toLowerCase().includes(this.libelle.toLowerCase()));
    
  }
async chargerMessage(){

   //this.g.showLoadingBlock(true);  
   await this.MessageSvc.getMessages().subscribe(
       (res:any) => {
        let etatReponse = res["EtatReponse"];

        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {

          //this.messages = res["messageVMs"];
          //this.messages=res["messageVMs"];
           //this.refrechtable()

         
        }else{ 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        //this.g.showLoadingBlock(false);    
      }
    );
   return this.messages
  }
}
