import { Component, OnInit } from '@angular/core';
import { Router,NavigationStart,NavigationEnd,NavigationError,RoutesRecognized } from '@angular/router';
import { Globals } from '../../globals';
import { Commande } from '../../entities/Commande';
import { Utilisateur } from '../../entities/Utilisateur';
import { DetailCommande } from '../../entities/DetailCommande';
import { Reglement } from '../../entities/Reglement';
import { Caisse } from 'src/app/entities/Caisse';
import { DetailReglement } from '../../entities/DetailReglement';
import { EtatCommandeCode } from '../../entities/EtatCommandeCode';
import {  IDropdownSettings } from 'ng-multiselect-dropdown';

import { CommandeSvc } from '../../services/commandeSvc';
import { ReglementSvc } from '../../services/reglementSvc';
import { UtilisateurSvc } from '../../services/utilisateurSvc';
import { EtatCommandeSvc } from '../../services/EtatCommandeSvc';
import { CaisseSvc } from 'src/app/services/caisseSvc';
import {Subscription} from 'rxjs'
import Swal from 'sweetalert2'
import{format} from 'date-fns'
import { ActivatedRoute } from '@angular/router'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-caisserapport',
  templateUrl: './caisserapport.component.html',
  styleUrls: ['./caisserapport.component.css']
})
export class CaisserapportComponent implements OnInit {
 dropdownList:any = [];
  selectedItems = [];
  dropdownSettings:IDropdownSettings= {};
   
  public etatCommandes:any
 public etatCommande:string|any
public datedebut:string=format(new Date(),'yyyy-MM-dd')+"T00:00:00";
public datefin:string=format(new Date(),'yyyy-MM-dd')+"T23:59:59";
public commandes : Commande[] = [];
public commandesOrg : Commande[] = [];
public caisses:Caisse[]=[];
public serveurs : Utilisateur[] = [];
public serveur :string|any
public listeIdCaisse:number[]=[]
public serveursOrg : Utilisateur[] = [];
public commande : Commande = new Commande();
public commandeReg : Commande = new Commande();
  constructor(public caisseSvc:CaisseSvc,public route:ActivatedRoute,public EtatCommandeSvc:EtatCommandeSvc, public g: Globals,private commandeSvc:CommandeSvc,private reglementSvc:ReglementSvc,public utilisateurSvc:UtilisateurSvc,private router: Router) {
 
 this.g.showLoadingBlock(true);

		
				//-----------------------------------------------------------------------------------------------
				this.g.showLoadingBlock(true);
				this.commandeSvc.getCommandes(this.datedebut,this.datefin).subscribe(
				  (res:any) => {
					let etatReponse = res["EtatReponse"];
					if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
					  this.commandesOrg = res["commandeVMs"];
            this.commandes = res["commandeVMs"];
            this.refrechtable();
					  //.totalPageCat = this.calculatePagesCountCat(this.pageSizeCat,this.g.categories.length);
					  //this.chargerListeCat();
					  //----------------------------------------------------

				
					  this.utilisateurSvc.getListeCaissiers().subscribe(
						(res:any) => {
						  let etatReponse = res["EtatReponse"];
						  if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
							this.serveurs= res["utilisateurVMs"];
             
						  }else{
							Swal.fire({ text:" etatReponse.Message" , icon: 'error'});
						  }
						   
						}
					  );

					  //----------------------------------------------------
	  this.EtatCommandeSvc.getAllEtatCommandes().subscribe(
						(res:any) => {
						  let etatReponse = res["EtatReponse"];
						  if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
							this.etatCommandes= res["etatCommandeVMs"];
             
						  }else{
							Swal.fire({ text: etatReponse.Message , icon: 'error'});
						  }
						 
						}
					  );

					}else{
					  Swal.fire({ text: "etatReponse.Message" , icon: 'error'});
					}
					this.g.showLoadingBlock(false);    
				  }
				);
				//-----------------------------------------------------------------------------------------------
			  
       
			
			this.g.showLoadingBlock(false);    
		  

		
  }
async refrechtable(){
  var datatable = $('#datatableexample').DataTable();
              //datatable reloading 
    datatable.destroy();
  this.getcommandebyparam().then(

     res=>this.commandes=res
  )

setTimeout(()=>{  
        
     $('#datatableexample').DataTable( {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      lengthMenu : [5, 10, 25]
  } ); 
  }, 100);
}
async getcommandebyparam(){
  

  let liste=this.commandesOrg.filter( item=>
             ((this.etatCommande!=undefined && this.etatCommande.length>0)?item.CodeEtatCommande==this.etatCommande:item)
          && ((this.serveur!=undefined && this.serveur.length>0)?item.NomServeur==this.serveur:item)
        
        ) 
return liste;
  }

  onItemSelect(item: any) {
    console.log(item.item_id)
    this.listeIdCaisse.push(item.item_id)
  }
  onSelectAll(items: any) {
    items.forEach((x: number|any)=>
      this.listeIdCaisse.push(x.item_id)
      )
    console.log(this.listeIdCaisse);
  }
    onUnSelectAll() {
    this.listeIdCaisse=[];
}
  onItemDeSelect(item: any) {
    const index: number = this.listeIdCaisse.indexOf(item.item_id);
if (index !== -1) {
    this.listeIdCaisse.splice(index, 1);
}
    console.log(this.listeIdCaisse);
}



  ngOnInit(): void {
      this.caisseSvc.getCaisse().subscribe(
						(res:any) => {
						  let etatReponse = res["EtatReponse"];
						  if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
                this.dropdownList=[]; 
							this.caisses= res["caisseVMs"];
               this.caisses.forEach(x=>{
                 
                                
     this.dropdownList.push({ item_id: x.Identifiant, item_text: x.Libelle })
                  console.log(this.serveurs)
               }
                
                );
              
						  }else{
							Swal.fire({ text: etatReponse.Message , icon: 'error'});
						  }
						   
						}
					  );
  
   // console.log("ccc==",this.serveurs)
    this.selectedItems = [
     
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
datedif(item:DetailCommande){
    console.log(item)
let datcreation:any=new Date(item.DateCreation)
let datevalidation:any=new Date(item.DateValidation)
var tmp =(item.DateCreation && item.DateValidation) ?datevalidation - datcreation:null;
var diff = null
 if(tmp!=null){
    tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
   let sec = tmp % 60;                    // Extraction du nombre de secondes
 
    tmp = Math.floor((tmp-sec)/60);    // Nombre de minutes (partie entière)
    diff= tmp % 60;   
 }
                    // Extraction du nombre de minutes
    return diff;
  }
    async chargerCommandes(){
console.log("xxx",this.listeIdCaisse)
   //this.g.showLoadingBlock(true);  
   await this.commandeSvc.getCommandesbycaisse(this.datedebut,this.datefin,this.listeIdCaisse).subscribe(
       (res:any) => {
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {

          this.commandes = res["commandeVMs"];
          this.commandesOrg=res["commandeVMs"];
           this.refrechtable()

         
        }else{ 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        //this.g.showLoadingBlock(false);    
      }
    );
   
  }
modale(idCommande : any){
this.getCommandeById(idCommande);
  ($('#grid-modal') as any).modal('show');
}
 
getCommandeById(identifiant:number){
    //this.g.showLoadingBlock(true);  
    this.commandeSvc.getCommandeById(identifiant).subscribe(
      (res:any) => {
        //this.type="CAT"
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
          this.commande = res["commandeVM"];
          if(this.commande == null){
            this.commande = new Commande();
          }
         // this.updateTotalVal();
		 // this.updateComponentView();
        }else{ 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        //this.g.showLoadingBlock(false);    
      }
    );
  }
}
