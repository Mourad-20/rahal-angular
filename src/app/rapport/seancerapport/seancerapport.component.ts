
import { Component, OnInit } from '@angular/core';
import { Router,NavigationStart,NavigationEnd,NavigationError,RoutesRecognized } from '@angular/router';
import { Globals } from '../../globals';

import { Commande } from '../../entities/Commande';
import { DetailCommande } from '../../entities/DetailCommande';
import { Reglement } from '../../entities/Reglement';
import { DetailReglement } from '../../entities/DetailReglement';
import { Seance } from '../../entities/Seance';
import { EtatCommandeCode } from '../../entities/EtatCommandeCode';
import { Recap } from '../../entities/Recap';
import { Utilisateur } from '../../entities/Utilisateur';
import { UtilisateurSvc } from '../../services/utilisateurSvc';


import { CommandeSvc } from '../../services/commandeSvc';
import { ReglementSvc } from '../../services/reglementSvc';
import { SeanceSvc } from '../../services/seanceSvc';
import { EtatCommandeSvc } from '../../services/EtatCommandeSvc';
import {Subscription} from 'rxjs'
import { Rxjs } from '../../services/rxjs';
import Swal from 'sweetalert2'
import * as $AB from 'jquery';
import{format} from 'date-fns'
import { ActivatedRoute } from '@angular/router'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { async } from '@angular/core/testing';
@Component({
  selector: 'app-seancerapport',
  templateUrl: './seancerapport.component.html',
  styleUrls: ['./seancerapport.component.css']
})
export class SeancerapportComponent implements OnInit {

  	public sub:any
	public id:number|any
 public type = "";
  public table? : boolean | false;
  //--------------------------------------
public totalColor : string = "box bg-dark text-center";
public serveurColor : string = "box bg-dark text-center";
public tableColor : string = "box bg-dark text-center";


 //------------------------------------
public EtatCommandeCode : EtatCommandeCode = new EtatCommandeCode();
public seance? : Seance  | null;
//--------------------------------------

public imageSrcCat : string =  'assets/categorie.jpg';
public imageSrcArt : string =  'assets/article.jpg';
//--------------------------------------
public totalVal : string = "0";
public calcVal : string = "0";
public searchTerm: string = "";
//--------------------------------------

//--------------------------------------

//--------------------------------------

public currentPageLoc : number = 1;
public totalPageLoc : number = 1;
public pageSizeLoc : number = 6;
//--------------------------------------
public serveurs:Utilisateur[]=[]
public serveur:string= "";
//--------------------------------------
public commandes : Commande[] = [];
public commandesOrg : Commande[] = [];
//--------------------------------------
public commande : Commande = new Commande();
public commandeReg : Commande = new Commande();
//--------------------------------------
public detailsCommandeARegles : DetailCommande[] = [];
public quantiteARegler : number = 0;
public idxTwo : number = -1
public idxOne : number = -1

//--------------------------------------
public lstReglements : Reglement[] = [];
public idxThree : number = -1
public reglement : Reglement = new Reglement();
//--------------------------------------
public recaps : Recap[] = [];
 public loadAPI!: Promise<any>;
 public percent=0
 public nbr:number=5
 public max:number=30
 public Chart :any
 public etatCommandes:any
 public etatCommande:string|any
 public sum:number=0
//public datedebut:string=format(new Date(),'yyyy-MM-dd')+"T00:00:00";
//public datefin:string=format(new Date(),'yyyy-MM-dd')+"T23:59:59";
  public  url1 = '../../assets/node_modules/jquery.easy-pie-chart/dist/jquery.easypiechart.min.js';

 public  url = '../../assets/node_modules/jquery.easy-pie-chart/easy-pie-chart.init.js';
//--------------------------------------

constructor(public route:ActivatedRoute,public EtatCommandeSvc:EtatCommandeSvc,public sharedService:Rxjs,
   public g: Globals,private commandeSvc:CommandeSvc,private reglementSvc:ReglementSvc,
   private router: Router,private seanceSvc:SeanceSvc,public UtilisateurSvc:UtilisateurSvc) {
	this.g.showLoadingBlock(true);
  this.sub = this.route.params.subscribe(params => {
      if(params['id']!=null) {
        this.id=params['id']}
        })
	
				//-----------------------------------------------------------------------------------------------
				  this.UtilisateurSvc.getServeurs(this.id).subscribe(
						(res:any) => {
						  let etatReponse = res["EtatReponse"];
						  if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
							this.serveurs= res["utilisateurVMs"];
             
						  }else{
							Swal.fire({ text:" etatReponse.Message" , icon: 'error'});
						  }
						   
						}
					  );
					  //---------------------------------------------------
					  this.g.showLoadingBlock(true);
					  //----------------------------------------------------
	  this.EtatCommandeSvc.getAllEtatCommandes().subscribe(
						(res:any) => {
						  let etatReponse = res["EtatReponse"];
						  if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
							this.etatCommandes= res["etatCommandeVMs"];
             
						  }else{
							Swal.fire({ text: etatReponse.Message , icon: 'error'});
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
  this.getsum()
  }, 100);

}

async getcommandebyparam(){
  
console.log(this.serveur,"///////",this.commandesOrg)
   let liste=this.commandesOrg.filter( item=>
             ((this.etatCommande!=undefined && this.etatCommande.length>0)?item.CodeEtatCommande==this.etatCommande:item)
          && ((this.serveur!="")?item.NomServeur==this.serveur:item)
        
        )  
return liste;

  }

  ngOnInit(): void {
          this.loadAPI = new Promise(async (resolve) => {
           await this.showRecap()
            await this.loadScript()
           
             await this.getrecap()
           
           
        });
  }

async NBR(){
  console.log(this.nbr)
  this.nbr=this.nbr==this.recaps.length? 5:this.recaps.length
   await this.loadScript()
           
  await this.getrecap()
}
 getrecap(){
/*   setTimeout(() => {
          this.recaps.forEach((item)=>{
 this.Chart  = $('.'+item.IdUtilisateur).data('easyPieChart');

if(item.poucentage>50){
this.Chart.options.barColor="green"
     }
     else{
       this.Chart.options.barColor="red"
     }
     this.Chart.update(item.poucentage);
     
    })
  }, 2000); */

}
getsum(){
if(this.commandes.length>0){  this.sum=this.commandes.map(a => a.Montant).reduce(function(a, b)
{
  return a + b;
});}
else{
  this.sum=0
}
}
  	public async loadScript() {
        console.log('preparing to load...')
      let node1 = document.createElement('script');
        node1.src = this.url1;
        node1.type = 'text/javascript';
      
        let node = document.createElement('script');
        node.src = this.url;
        node.type = 'text/javascript';
       await setTimeout(()=>{
   document.getElementsByTagName('body')[0].appendChild(node1);
        document.getElementsByTagName('body')[0].appendChild(node);
        },1000)
      
    }	

 async showRecap(){
    await this.chargerRecap();
    await this.refrechtable()
  }
  async chargerRecap(){
	  
	  this.g.showLoadingBlock(true); 
		 await  this.commandeSvc.getRecap(this.id).subscribe(
        (res:any) => {
          let etatReponse = res["EtatReponse"];
          if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
            console.log(res['commandeVMs'])
            for (let i = 0; i <1; i++) {
  res['recapVMs'].forEach((item:any)=> {
    this.recaps.push(item);
});
}

			  //this.recaps = res['recapVMs'];
        this.commandes=res['commandeVMs']
        this.commandesOrg=res['commandeVMs']
         
       // console.log("recap==",res['recapVMs'])
          }else{ 
           
            Swal.fire({ text: etatReponse.Message , icon: 'error'});
          }
          this.g.showLoadingBlock(false);    
        }
      );
  }
 
  datedif(item:DetailCommande){
    console.log(item)
let datcreation:any=new Date(item.DateCreation)
let datevalidation:any=new Date(item.DateValidation)
var tmp = datevalidation - datcreation;
var diff = 0
 
    tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
   let sec = tmp % 60;                    // Extraction du nombre de secondes
 
    tmp = Math.floor((tmp-sec)/60);    // Nombre de minutes (partie entière)
    diff= tmp % 60;                    // Extraction du nombre de minutes
    return diff;
  }
  async chargerCommandes(){

   //this.g.showLoadingBlock(true);  
   await this.commandeSvc.getCommandeSeance(this.id).subscribe(
       (res:any) => {
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
              this.type="COM";

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
