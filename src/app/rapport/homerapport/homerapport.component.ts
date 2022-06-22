import { Component, OnInit } from '@angular/core';
import { Router,NavigationStart,NavigationEnd,NavigationError,RoutesRecognized } from '@angular/router';
import { Globals } from '../../globals';



import { Utilisateur } from '../../entities/Utilisateur';
import { DetailCommande } from '../../entities/DetailCommande';
import { Seance } from '../../entities/Seance';
import { GroupeCode } from '../../entities/GroupeCode';
import { Caisse } from 'src/app/entities/Caisse';
import { Recap } from 'src/app/entities/Recap';
import { CommandeSvc } from '../../services/commandeSvc';
import { SeanceSvc } from '../../services/seanceSvc';
import { ReglementSvc } from 'src/app/services/reglementSvc';
import { CaisseSvc } from 'src/app/services/caisseSvc';
import Swal from 'sweetalert2'
import { Commande } from 'src/app/entities/Commande';
import * as $AB from 'jquery';
import{format} from 'date-fns'
import { ActivatedRoute } from '@angular/router'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { async } from '@angular/core/testing';
import { UtilisateurSvc } from 'src/app/services/utilisateurSvc';
@Component({
  selector: 'app-homerapport',
  templateUrl: './homerapport.component.html',
  styleUrls: ['./homerapport.component.css']
})
export class HomerapportComponent implements OnInit {
  public recaps : Recap[] = [];
 public loadAPI!: Promise<any>;
 public percent=0
 public nbr:number=6
 public max:number=30
 public Chart :any
 public etatCommandes:any
 public etatCommande:string|any
public serveurs:Utilisateur[]=[]
public serveur:Utilisateur= new Utilisateur();
public caisses : Caisse[] = [];
public caissesOrg : Caisse[] = [];
public total:any=[]
public commandes : Commande[] = [];
public commandesOrg : Commande[] = [];
public datedebut:string=format(new Date(),'yyyy-MM-dd')+"T00:00:00";
public datefin:string=format(new Date(),'yyyy-MM-dd')+"T23:59:59";
  public  url1 = '../assets/node_modules/jquery.easy-pie-chart/dist/jquery.easypiechart.min.js';

 public  url = '../assets/node_modules/jquery.easy-pie-chart/easy-pie-chart.init.js';
public detailsCommande : DetailCommande[] = [];

    constructor(public UtilisateurSvc:UtilisateurSvc,public CaisseSvc:CaisseSvc,public ReglementSvc:ReglementSvc,public route:ActivatedRoute, public g: Globals,private commandeSvc:CommandeSvc,private router: Router,private seanceSvc:SeanceSvc) 
 {
   	//-----------------------------------------------------------------------------------------------
				  this.UtilisateurSvc.getListeCaissiers().subscribe(
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
  }

  ngOnInit(): void {
    this.chargerCaisse()
    this.chargerdetailCommandes()
    this.chargercommandes()
          this.loadAPI = new Promise(async (resolve) => {
          await this.showRecap()
          await this.loadScript()
            
          // await this.getrecap()
           
        });
  }
  chargercommandes(){
    	this.commandeSvc.getCommandes(this.datedebut,this.datefin).subscribe(
				  (res:any) => {
					let etatReponse = res["EtatReponse"];
					if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
					  this.commandesOrg = res["commandeVMs"];
            this.commandes = res["commandeVMs"];
            //this.refrechtable();
					  //.totalPageCat = this.calculatePagesCountCat(this.pageSizeCat,this.g.categories.length);
					  //this.chargerListeCat();
					  //----------------------------------------------------

			

					  //----------------------------------------------------

					}else{
					  Swal.fire({ text: "etatReponse.Message" , icon: 'error'});
					}
					this.g.showLoadingBlock(false);    
				  }
				);
  }
async chargerdetailCommandes(){

   //this.g.showLoadingBlock(true);  
   await this.commandeSvc.getRecapArticles(this.datedebut,this.datefin).subscribe(
       (res:any) => {
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
             

          this.detailsCommande = res["detailCommandeDMs"];
         
           //this.refrechtable()

         
        }else{ 
          Swal.fire({ text: "recaparticle" , icon: 'error'});
        }
        //this.g.showLoadingBlock(false);    
      }
    );
   
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
   // await this.refrechtable()
  }
  async chargerRecap(){
	  
	  this.g.showLoadingBlock(true); 
		 await  this.commandeSvc.getRecap(null).subscribe(
        (res:any) => {
          let etatReponse = res["EtatReponse"];
          if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
            for (let i = 0; i <1; i++) {
  res['recapVMs'].forEach((item:any)=> {
    this.recaps.push(item);
});
}

			  //this.recaps = res['recapVMs'];
       // this.commandes=res['commandeVMs']
       // this.commandesOrg=res['commandeVMs']
         
       // console.log("recap==",res['recapVMs'])
          }else{ 
           
            Swal.fire({ text: "recap" , icon: 'error'});
          }
          this.g.showLoadingBlock(false);    
        }
      );
  }

 getTotal(_Caisse:Caisse){
 
	let itemt:any=[_Caisse]
 this.ReglementSvc.getMontantTotalReglementForCaisse(_Caisse.Identifiant).subscribe(
		  (res:any) => {
			let etatReponse = res["EtatReponse"];
			if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
			 itemt.push(res["montantTotal"])
			this.total.push(itemt) ;
			}
			//this.g.showLoadingBlock(false);    
		  }
		)
			 //this.total.push(itemt) ;
 
}
async chargerCaisse(){
   //this.g.showLoadingBlock(true);  
   await this.CaisseSvc.getCaisse().subscribe(
       (res:any) => {
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
        
          this.caisses = res["caisseVMs"];
          this.caissesOrg=res["caisseVMs"];
          this.caisses.forEach((item)=>{
           this.getTotal(item)
     
    
          })
         //  this.refrechtable()
//this.getTotal(1)
        }else{ 
          Swal.fire({ text: "caisse" , icon: 'error'});
        }
        //this.g.showLoadingBlock(false);    
      }
    );
   return this.total
  }
}
