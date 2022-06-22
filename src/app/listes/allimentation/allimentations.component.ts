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
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

import { CommandeSvc } from '../../services/commandeSvc';
import { ReglementSvc } from '../../services/reglementSvc';
import { SeanceSvc } from '../../services/seanceSvc';
import { EtatCommandeSvc } from '../../services/EtatCommandeSvc';
//import {Subscription} from 'rxjs'
import { Rxjs } from '../../services/rxjs';
import Swal from 'sweetalert2'
import * as $AB from 'jquery';
import{format} from 'date-fns'
import { ActivatedRoute } from '@angular/router'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { async } from '@angular/core/testing';
import { ModeReglement } from 'src/app/entities/ModeReglement';
@Component({
  selector: 'app-allimentations',
  templateUrl: './allimentations.component.html',
  styleUrls: ['./allimentations.component.css']
})
export class listeallimentationsComponent implements OnInit {

  	public sub:any
	public id:number|any
 public type = "";
  public table? : boolean | false;
  public ModeReglement=new ModeReglement()
  public _modereglement:string[]=[]
  //--------------------------------------
public totalColor : string = "box bg-dark text-center";
public serveurColor : string = "box bg-dark text-center";
public tableColor : string = "box bg-dark text-center";
public typecommande:string="ALLIMENTATION"

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
public commandeoption:string="TOUS";
public countnonreglee:number=0
public countcontrole:number=0
//--------------------------------------

//--------------------------------------

public currentPageLoc : number = 1;
public totalPageLoc : number = 1;
public pageSizeLoc : number = 6;
//--------------------------------------
public serveurs:Utilisateur[]=[]
public serveur:Utilisateur= new Utilisateur();
//--------------------------------------
public commandes : Commande[]|any = [];
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
public Ncheque:string="";
public NomBanque:string="";
public NCompte:string="";
public Datecheque:string="";
public Montant:string="";
public _modereglementselect:string="ESPECE";
public Message:string=""
 //--------------------------------------
public title:string=""
public recaps : Recap[] = [];
 public loadAPI!: Promise<any>;
 public percent=0
 public nbr:number=5
 public max:number=30
 public Chart :any
 public etatCommandes:any
 public etatCommande:string|any
public datedebut:string=format(new Date(),'yyyy-MM-dd')+"T00:00:00";
public datefin:string=format(new Date(),'yyyy-MM-dd')+"T23:59:59";
  public  url1 = '../../assets/node_modules/jquery.easy-pie-chart/dist/jquery.easypiechart.min.js';
  public dtOptions: any = {};
 public  url = '../../assets/node_modules/jquery.easy-pie-chart/easy-pie-chart.init.js';
//--------------------------------------
public dtTrigger: Subject<any>= new Subject();


constructor( public route:ActivatedRoute,public EtatCommandeSvc:EtatCommandeSvc,public sharedService:Rxjs,
   public g: Globals,private commandeSvc:CommandeSvc,private reglementSvc:ReglementSvc,
   private router: Router,private seanceSvc:SeanceSvc,public UtilisateurSvc:UtilisateurSvc) {
	this.g.showLoadingBlock(true);
  this.sub = this.route.params.subscribe(params => {
      if(params['id']!=null) {
        this.id=params['id']}
        })
	
				//-----------------------------------------------------------------------------------------------
				  this.UtilisateurSvc.getServeurs( null).subscribe(
						(res:any) => {
						  let etatReponse = res["EtatReponse"];
						  if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
							this.serveurs= res["utilisateurVMs"];
             
						  }else{
							Swal.fire({ text:" erreir serveur" , icon: 'error'});
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
							Swal.fire({ text:"etat commande" , icon: 'error'});
						  }
						  this.g.showLoadingBlock(false);    
						}
					  );
				for  (const x in this.ModeReglement){
     
       this._modereglement.push(x)
      
     } 
				//-----------------------------------------------------------------------------------------------
			
			this.g.showLoadingBlock(false);    
		  }

		
  async refrechtable(){
   
  var datatable = $('#datatableexample').DataTable();
              //datatable reloading 
                datatable.destroy();
  setTimeout(() => {
   $('#datatableexample').DataTable( 
      this.dtOptions
   
  );
  
 }, 100); 

}
initreglement(){
  this.NCompte=""
  this.Ncheque=""
  this.NomBanque=""
  this.Montant=""
  this.Datecheque=""
}
getRowIndex(x : any,idCommande:number|any){
	//	console.log(x);
    this.idxOne = x;
    this.getCommandeById(idCommande);
    this.getreglementbyId(idCommande);
	   //console.log("Row index is: " + x.rowIndex);
	  
  }
  getreglementbyId(idCommande:number|any){
        this.reglementSvc.getReglementsByIdCommande(idCommande).subscribe(
      (res:any) => {
        //this.type="CAT"
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
          this.lstReglements = res["reglementVMs"];
         
         // this.updateTotalVal();
		 // this.updateComponentView();
        }else{ 
          Swal.fire({ text: "commandeid" , icon: 'error'});
        }
        //this.g.showLoadingBlock(false);    
      }
    );
  }
async getcommandebyparam(){
  
let list
 /*  let liste=this.commandesOrg.filter( item=>
             ((this.etatCommande!=undefined && this.etatCommande.length>0)?item.CodeEtatCommande==this.etatCommande:item)
          && ((this.serveur!=undefined && this.serveur.length>0)?item.NomServeur==this.serveur:item)
        
        )  */
return list;
  }

  ngOnInit(): void {
  this.g.title="Liste/Alimentations"
      this.dtOptions = {
 pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      lengthMenu : [5, 10, 25],
        // Declare the use of the extension in the dom parameter
      dom: 'Blfrtip',
        // Configure the buttons
        buttons: [
         // 'columnsToggle',
         // 'colvis',
          'copy',
          'print',
          'excel',
        
        ]
      };
    
  this.showCommande()
  this.GETCOUNT()
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

async showCommande(){
  this.chargerCommandes()
   this.commandeoption="TOUS";
   
}
 async chargerCommandes(){

  // this.g.showLoadingBlock(true);  
    this.commandeSvc.getCommandesbycodes(this.datedebut,this.datefin,this.typecommande).subscribe(
       (res:any) => {
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
        
          this.commandesOrg=res["commandeVMs"];
          this.commandes=res["commandeVMs"];
          console.log('res==',this.commandesOrg)
          this.refrechtable()
        }else{ 
          Swal.fire({ text: "commandeseance" , icon: 'error'});
        }
        this.g.showLoadingBlock(false);    
      }
    );
   
  }
showCommandeControle(){
  this.commandeoption="CONTROLE";
this.chargerCommandeControle()
}

  chargerCommandeControle(){

    //this.g.showLoadingBlock(true);  
   this.searchTerm=""
    this.commandeSvc.getCommandesNonControle().subscribe(
      (res:any) => {
        let etatReponse = res["EtatReponse"];
         console.log(etatReponse.Code)
        
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
              this.type="CONTROLE";

          this.commandesOrg = res["commandeVMs"];
          console.log(this.commandesOrg)

          this.commandes.length = 0;
          this.commandes = [];

            for (let i = 0; i < this.commandesOrg.length; i++) {
              if(this.commandesOrg[i].CodeCommande==this.typecommande){
                this.commandes.push(this.commandesOrg[i]);
              }
            
            }
            this.refrechtable()
           // this.g.typecommande="COMMANDENONCONTROLER"
//console.log(this.commandes)
        }else{ 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        //this.g.showLoadingBlock(false);    
      }
    );

    
  }

  showCommandeNonReglees(){
  this.commandeoption="N-REGLEE";
this.chargerCommandesNonReglees()
}
  chargerCommandesNonReglees(){
    //this.g.showLoadingBlock(true);  
   
    this.commandeSvc.getCommandesNonReglees().subscribe(
      (res:any) => {
        let etatReponse = res["EtatReponse"];
        
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
             

          this.commandesOrg = res["commandeVMs"];
 this.commandes.length = 0;
          this.commandes = [];

         for (let i = 0; i < this.commandesOrg.length; i++) {
            if(this.commandesOrg[i].CodeCommande==this.typecommande){
              this.commandes.push(this.commandesOrg[i]);
            }}
             this.refrechtable()
//console.log(this.commandes)
        }else{ 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        //this.g.showLoadingBlock(false);    
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
   controler(){

 this.g.showLoadingBlock(true);
      this.commandeSvc.controlerCommande(this.commande).subscribe(
      (res:any) => {
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
          this.idxOne=0
          this.commande=new Commande()
         // this.initcommande();
         this.countcontrole-=1
          let idCommande = res["idCommande"];
             let idx=0
             let y:Commande
	     for(y of this.commandes){
if(y.Identifiant===idCommande){

  break
}
else{
  idx+=1
}

     }
     console.log(idx)
this.commandes.splice(idx, 1)
          //this.getCommandeById(idCommande);
          Swal.fire({ text: etatReponse.Message , icon: 'success'});
        }else{ 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        this.g.showLoadingBlock(false);    
      }
    );
  }
  showReglements(){
	  
	  if(this.commande.CodeEtatCommande != this.EtatCommandeCode.REGLEE){
          ($('#responsive-modal') as any).modal('show');
	  }	 
  }
  async update(idcommande:any){
  
 this.router.navigate(['/caisses/'+idcommande]);}


   validatepush(reglement:Reglement){
   let res:boolean
if(reglement.Montant==0){
res= false
this.Message="Montant non valide"
}
else if(reglement.LibelleModeReglement==""){
res=false
this.Message="mode reglement non valide"
}
else if(reglement.LibelleModeReglement!="ESPECE" && reglement.Datecheque==""){
res=false
this.Message="Date reglement non valide"
}
else if(reglement.LibelleModeReglement!="ESPECE" && reglement.NCompte==""){
res=false
this.Message="Numero de Compte non valide"
}
else if(reglement.LibelleModeReglement!="ESPECE" && reglement.Ncheque==""){
res=false
this.Message="Numero de cheque/effet non valide"
}
else if(reglement.LibelleModeReglement!="ESPECE" && reglement.NomBanque==""){
res=false
this.Message="Nome de Banque non valide"
}
else if(reglement.Montant>(this.commande.Montant-this.lstReglements.reduce((sum, current) => sum + current.Montant, 0))){
  res=false
  this.Message="Montant non valide"
}
else{
  res=true
}
return res
}
getcommandebyId(){
  this.commandeSvc.getCommandeById(this.commande.Identifiant).subscribe(
    (res:any) => {
  let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
this.commande=res["commandeVM"];
if(this.commande.CodeEtatCommande=="REGLEE"){
  this.commande=new Commande()
  this.lstReglements=[]
}
else{
  this.getreglementbyId(this.commande.Identifiant)
}
        }
    }
  );
}
   effectuerReglement(){
	 
		  let reglement = new Reglement();
		  reglement.IdCommande = this.commande.Identifiant;
		  reglement.IdModeReglement = 1;
		  reglement.DetailReglements = [];
      reglement.Montant=Number(this.Montant);
		 reglement.Ncheque=this.Ncheque;
     reglement.NomBanque=this.NomBanque;
     reglement.NCompte=this.NCompte;
     reglement.Datecheque=this.Datecheque;
     reglement.LibelleModeReglement=this._modereglementselect;

	   this.g.showLoadingBlock(true);  
     if(this.validatepush(reglement)){

     
	   this.reglementSvc.etablirReglement(reglement).subscribe(
		(res:any) => {
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
this.initreglement();
this.showCommandeNonReglees()
this.GETCOUNT()
this.getcommandebyId()
		  Swal.fire({ text: etatReponse.Message , icon: 'success'});
        }else{ 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        ($('#responsive-modal') as any).modal('hide');
        this.g.showLoadingBlock(false);    
      }
    );}
    else{
      this.g.showLoadingBlock(false);    
       Swal.fire({ text: this.Message , icon: 'error'});
   this.Message=""
    }
	  
  }
  GETCOUNT(){
    //this.g.showLoadingBlock(true);  
   
    this.commandeSvc.getCommandesNonReglees().subscribe(
      (res:any) => {
        let etatReponse = res["EtatReponse"];
        
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
             

          let commandesR:Commande[] = res["commandeVMs"];
          commandesR=commandesR.filter(x=>x.CodeCommande==this.typecommande)
       
           this.countnonreglee= commandesR.length
        
  
              this.commandeSvc.getCommandesNonControle().subscribe(
      (res:any) => {
        let etatReponse = res["EtatReponse"];
        
        
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
          let commandes:Commande[] = res["commandeVMs"];
         commandes=commandes.filter(x=>x.CodeCommande==this.typecommande)
          this.countcontrole= commandes.length
         
        }else{ 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        //this.g.showLoadingBlock(false);    
      }
    );
//console.log(this.commandes)
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
          Swal.fire({ text: "commandeid" , icon: 'error'});
        }
        //this.g.showLoadingBlock(false);    
      }
    );
  }
}
