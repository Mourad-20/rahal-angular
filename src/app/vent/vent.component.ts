import { Component,HostListener,OnInit } from '@angular/core';
import { Router,NavigationStart,NavigationEnd,NavigationError,RoutesRecognized,ActivatedRoute } from '@angular/router';
import { Globals } from '../globals';
import { Categorie } from '../entities/Categorie';
import { Article } from '../entities/Article';
import { Commande } from '../entities/Commande';
import { Utilisateur } from '../entities/Utilisateur';
import { DetailCommande } from '../entities/DetailCommande';
import { Localite } from '../entities/Localite';
import { Reglement } from '../entities/Reglement';
import { DetailReglement } from '../entities/DetailReglement';
import { Seance } from '../entities/Seance';
import { GroupeCode } from '../entities/GroupeCode';
import { EtatCommandeCode } from '../entities/EtatCommandeCode';
import { Recap } from '../entities/Recap';
import { LocaliteCode } from '../entities/LocaliteCode';
import { ChartType, ChartOptions } from 'chart.js';

import{Client} from '../entities/Client';
import{Lot} from '../entities/Lot';
import{Projet} from '../entities/Projet';

import { ClientSvc } from '../services/ClientSvc';
import{LotSvc} from '../services/lotSvc';
import{ProjetSvc} from '../services/projetSvc';

import  * as $ab from 'ng2-charts';
import { AffectationMessage } from '../entities/AffectationMessage';
import { CommandeSvc } from '../services/commandeSvc';
import { LocaliteSvc } from '../services/localiteSvc';
import { ReglementSvc } from '../services/reglementSvc';
import { UtilisateurSvc } from '../services/utilisateurSvc';
import { CategorieSvc } from '../services/categorieSvc';
import { ArticleSvc } from '../services/articleSvc';
import { SeanceSvc } from '../services/seanceSvc';
import { MessageSvc } from '../services/messageSvc';
import { AssociationMessageSvc } from '../services/associationMessageSvc';
import {Message}from '../entities/Message';
import {Subscription} from 'rxjs'
import { Rxjs } from '../services/rxjs';
import Swal from 'sweetalert2'
//import * as $ from 'jquery';

import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CategoriesComponent } from '../listes/categories/categories.component';
@Component({
  selector: 'app-vent',
  templateUrl: './vent.component.html',
  styleUrls: ['./vent.component.css']
})
export class VentComponent implements OnInit {
public type = "";
 public percentage = 15;
  public table? : boolean | false;
  //--------------------------------------
public totalColor : string = "box bg-dark text-center";
public serveurColor : string = "box bg-dark text-center";
public tableColor : string = "box bg-dark text-center";
public showlocale:boolean=false;
public showcaisse:boolean=true;
public showserveur:boolean=false;
 //------------------------------------
public EtatCommandeCode : EtatCommandeCode = new EtatCommandeCode();
public GroupeCode : GroupeCode = new GroupeCode();
public LocaliteCode:LocaliteCode=new LocaliteCode()
public seance? : Seance  | null;
//--------------------------------------
public affectationMessageVMs : AffectationMessage[] = [];
public imageSrcCat : string =  'assets/categorie.jpg';
public imageSrcArt : string =  'assets/article.jpg';
//--------------------------------------
public totalVal : string = "0";
public calcVal : string = "0";
public searchTerm: string = "";
//--------------------------------------
public categories : Categorie[] = [];
public currentPageCat : number = 1;
public totalPageCat : number = 1;
public pageSizeCat : number = 20;
public detailCommande:DetailCommande=new DetailCommande()
public detailCommandes:DetailCommande[]=[]
public detailCommandesOrg:DetailCommande[]=[]
//--------------------------------------
public articles : Article[] = [];
public lots : Lot[] = [];
public lotsOrg : Lot[] = [];

public lot : Lot =new Lot();
public article : Article =new Article();
public currentPageArt : number = 1;
public totalPageArt : number = 1;
public pageSizeArt : number = 20;
//--------------------------------------
public clients: Client[] = [];
public clientsOrg: Client[] = [];


public localites : Localite[] = [];
public codelocalites :string[] = [];

public localitesOrg : Localite[] = [];
public currentPageLoc : number = 1;
public totalPageLoc : number = 1;
public pageSizeLoc : number = 20;
//--------------------------------------
public serveurs : Utilisateur[] = [];
public serveursOrg : Utilisateur[] = [];
public currentPageServ : number = 1;
public totalPageServ : number = 1;
public pageSizeServ : number = 20;
//--------------------------------------
public commandes : Commande[] = [];
public commandesOrg : Commande[] = [];
public currentPageCom : number = 1;
public totalPageCom : number = 1;
public pageSizeCom : number = 20;
//--------------------------------------
public commande : Commande = new Commande();
public commandeReg : Commande = new Commande();
//--------------------------------------
public idxOne : number = -1
public idnav:number=1
//--------------------------------------
public detailsCommandeARegles : DetailCommande[] = [];
public quantiteARegler : number = 0;
public idxTwo : number = -1
public dateexpiration:string=""
public quantite:number=0
public tva:number=0
public prix:number=0
public prixD:number=0
public numlot:string=''
public description:string=''
public numcommande:string=""
//--------------------------------------
public lstReglements : Reglement[] = [];
public idxThree : number = -1
public reglement : Reglement = new Reglement();
//--------------------------------------
public recaps : Recap[] = [];
//--------------------------------------
//--------------------------------------
public messages : Message[] = [];
public idxFour : number = -1
public idxFive : number = -1
//--------------------------------------
public reglementVMs : Reglement[] = [];
public detailReglementsNonRegle : DetailReglement[] = [];
public detailReglementsToRegler : DetailReglement[] = [];
public idxSix : number = -1;
public idxSeven : number = -1;
public quantiteToRegler : number = 0;
public localeactive:string="";
public commandeCount:number=0
//clickEventSubscription:Subscription;
//controleEventSubscription:Subscription;
public Message:string=""
 
public TotaleHT:number=0
public TotaleTTC:number=0
public TotaleTVA:number=0

public projets : Projet[] = [];
public projetsOrg : Projet[] = [];

public title:string="";
 public pieChartLabels: any[] = [['SciFi'], ['Drama'], 'Comedy'];
  public pieChartData: any = [30, 50, 20];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public backgroundcategorie:string=""
 public loadAPI!: Promise<any>;
 public  url = '../assets/node_modules/bootstrap-table/dist/bootstrap-table.min.js';
public colorMessage:string=""
public isReadOnly:boolean=false;
  constructor(public ClientSvc:ClientSvc,public LotSvc:LotSvc,public ProjetSvc:ProjetSvc, public route:ActivatedRoute,public rxjs:Rxjs, public g: Globals,private commandeSvc:CommandeSvc,
  private localiteSvc:LocaliteSvc,private reglementSvc:ReglementSvc,public utilisateurSvc:UtilisateurSvc,
  private router: Router,private seanceSvc:SeanceSvc,private categorieSvc:CategorieSvc,
  private articleSvc:ArticleSvc,private associationMessageSvc :AssociationMessageSvc,private messageSvc:MessageSvc) {

  this.g.showLoadingBlock(true);
  this.chargerListeLot();
  this.route.params.subscribe(params => {
    if(params['id']!=null) {
     
       this.commandeSvc.getCommandeById(params['id']).subscribe((res:any) => {
    let etatReponse = res["EtatReponse"];
    if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
      this.commande = res["commandeVM"];
      this.numcommande=this.commande.Numero
   this.isReadOnly=true
   this.updatetotale()
  }
});
    }
      })
		this.seanceSvc.getSeanceActive().subscribe(
		  (res:any) => {
			let etatReponse = res["EtatReponse"];
			if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
			  this.g.seance = res["seanceVM"];
			  if(this.g.seance != null){
				//-----------------------------------------------------------------------------------------------
				this.g.showLoadingBlock(true);
				this.categorieSvc.getCategories().subscribe(
				  (res:any) => {
					let etatReponse = res["EtatReponse"];
					if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
					  this.g.categories = res["categorieVMs"];
            /*  for(let o of this.g.categories){
						  o.PathImage = this.g.baseUrl + '/api/Categorie/showImageCategorie?identifiant=' + o.Identifiant;
					  } */
					  this.chargerListeCat();
					  //----------------------------------------------------

					  this.g.showLoadingBlock(true);
					  this.articleSvc.getArticles().subscribe(
						(res:any) => {
						  let etatReponse = res["EtatReponse"];
						  if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
							this.g.articlesOrg = res["articleVMs"];
             /*  for(let a of this.g.articlesOrg){
								  a.PathImage = this.g.baseUrl + '/api/Article/showImageArticle?identifiant=' + a.Identifiant;
							  } */
						  }
              else{
                console.log("Message01")
							Swal.fire({ text: etatReponse.Message , icon: 'error'});
						  }
						  this.g.showLoadingBlock(false);    
						}
					  );

					  //----------------------------------------------------


					}else{
            console.log("Message02")
					  Swal.fire({ text: etatReponse.Message , icon: 'error'});
					}
					this.g.showLoadingBlock(false);    
				  }
				);
				//-----------------------------------------------------------------------------------------------
			  }else{
				this.router.navigate(['ouvertureSeance']);
			  }
			}else{ 
        console.log("Message03")
			  Swal.fire({ text: etatReponse.Message , icon: 'error'});
			}
			this.g.showLoadingBlock(false);    
		  }

		);
   }
   async chargerListeLot(){

    //this.g.showLoadingBlock(true);  
    await this.LotSvc.getlots().subscribe(
        (res:any) => {
         let etatReponse = res["EtatReponse"];
 
         if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
 
           this.lots = res["lotVMs"];
           this.lotsOrg=res["lotVMs"];
            this.refrechtable()
 
          
         }else{ 
           Swal.fire({ text: etatReponse.Message , icon: 'error'});
         }
         //this.g.showLoadingBlock(false);    
       }
     );
    return this.lots
   }
  ngOnInit(): void {
    this.title="Commande"
        var $: any;
  	this.type="CAT";
    this.table=true;
    console.log("table "+this.g.articlesOrg);
     this.loadScript()
     for(const x in this.LocaliteCode){
        if(x!=this.LocaliteCode.EMPORTER){
      this.codelocalites.push(x)}
     }
    // this. getcountcommande()
  }
  
     async refrechtableste(){
   
    var datatable = $('#datatableste').DataTable();
                //datatable reloading 
                  datatable.destroy();
    setTimeout(() => {
     $('#datatableste').DataTable( {
        pagingType: 'full_numbers',
        pageLength: 10,
        processing: true,
        lengthMenu : [5, 10, 25]
    } );
   }, 200);
  
  } 
   async refrechtabledc(){
   
    var datatable = $('#datatabledc').DataTable();
                //datatable reloading 
                  datatable.destroy();
    setTimeout(() => {
     $('#datatabledc').DataTable( {
        pagingType: 'full_numbers',
        pageLength: 10,
        processing: true,
        lengthMenu : [5, 10, 25]
    } );
   }, 200);
  
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
   }, 200);
  
  } 

  initcommande(){
    
this.localeactive=""
    this.commande=new Commande();
  }
  	public async loadScript() {
     
      //console.log(this.url)
        let node = document.createElement('script');
        node.src = this.url;
        node.type = 'text/javascript';
       await setTimeout(()=>{
  
        document.getElementById("script")?.appendChild(node);
        },0)
      
    }	
show(showparam:string){
  //console.log(showparam)
switch (showparam){
  case "localite":
    if(this.showlocale==false){
this.showcaisse=false
this.showlocale=true
this.showserveur=false
    }
    else{
      this.showcaisse=true
this.showlocale=false
this.showserveur=false
    }

    break;

}

}
setarticle(item:Article){
 

this.getdetailcommandes(item)
//($('#responsive-modal') as any).modal('hide');
//console.log(this.article)
}
//===================================================================
setdc(item:DetailCommande){
  console.log(this.article)
  this.article=this.g.articlesOrg.filter(x=>x.Identifiant==item.IdArticle)[0]
  this.detailCommande=item;
  this.numlot=item.NumerodeLot;
 this.prix=  this.article.Montant;
  this.tva= this.article.TauxTva;
  this.detailCommandes=[];
  this.refrechtabledc();
  ($('#responsive-modal') as any).modal('hide');

}
setLot(item:Lot){
this.lot=item
this.prix=item.Prix

this.detailCommandes=[];
  this.refrechtabledc();
  ($('#responsive-modal') as any).modal('hide');
}
getdetailcommandes(item:Article){
  //debugger
  console.log(item)

 this.commandeSvc.getDetailCommandesstockparam(item.Identifiant).subscribe(
      (res:any) => {
        this.detailCommandes.length=0
      //  this.refrechtabledc()
        let etatReponse = res["EtatReponse"];
      
        
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
            
           this.detailCommandes=res["detailCommandeVMs"]
         console.log(this.detailCommandes)
          this.detailCommandes= this.detailCommandes.filter(x=>x.IdValiderPar!=null && x.Quantite>x.QuantiteServi)
          if(this.commande.DetailCommandes.length>0){
            this.detailCommandes= this.detailCommandes.filter(x=>!this.commande.DetailCommandes.find(y=>y.NumerodeLot==x.NumerodeLot))
          }
        this.refrechtabledc()
           //commandes = commandes.filter(x=>x.IdCreePar==this.g.utilisateur!.Identifiant);
      //this.commandeCount=commandes.length
          }})
}

updatetotale(){
  this.TotaleHT=0
  this.TotaleTVA=0
  this.commande.DetailCommandes.forEach((x:any)=>{
    this.TotaleHT+= x.Montant*x.Quantite
    this.TotaleTVA+= x.Montant*x.Quantite*x.TauxTVA/100
  })
  

}
afficherOnCalculator(x : any){
    if(this.calcVal == "0" && x != "."){
      this.calcVal = "";
    }
    if(x == '.'){
      if(this.calcVal.includes(".") == true) {
        return;
      }
    }
    this.calcVal = this.calcVal + x;
  }
  async chargerProjet(){

    //this.g.showLoadingBlock(true);  
    await this.ProjetSvc.getprojets().subscribe(
        (res:any) => {
         let etatReponse = res["EtatReponse"];
 
         if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
 
           this.projets = res["projetVMs"];
           this.projetsOrg=res["projetVMs"];
            this.refrechtable()
 
          
         }else{ 
           Swal.fire({ text: etatReponse.Message , icon: 'error'});
         }
         //this.g.showLoadingBlock(false);    
       }
     );
    return this.projets
   }
  chargerListeCat(){
      this.categories.length = 0;
      console.log(this.categories)
    if (this.currentPageCat < 1)
        {
            this.currentPageCat = 1;
        }
        else if (this.currentPageCat > this.totalPageCat)
        {
          this.currentPageCat = this.totalPageCat;
      }

      let startIndex = this.currentPageCat * this.pageSizeCat - this.pageSizeCat;
      let endIndex = startIndex + this.pageSizeCat;

      if(endIndex > this.g.categories.length) {
        endIndex = this.g.categories.length;
      }


      for (let i = startIndex; i < endIndex; i++) {
        this.categories.push(this.g.categories[i]);
      }


  }

    chargerArticle(event :any) {
     
     
    this.type="ARTICLE";
   if(event){
    let id:number= event.target.value   
if(id!=0){
 this.articles = this.g.articlesOrg.filter(x=>x.IdCategorie==id)
}
else{
  this.articles = this.g.articlesOrg;
}
   }
   else{
    this.articles = this.g.articlesOrg;
   }
    this.refrechtable()
    //this.totalPageArt = this.calculatePagesCountArt(this.pageSizeArt,this.g.articles.length);
    //this.chargerListeArt();
  }
chergerLot(event :any){
  if(event){
    let id:number= event.target.value   
if(id!=0){
 this.lots = this.lotsOrg.filter(x=>x.IdProjet==id)
}
else{
  this.lots = this.lotsOrg
}
   }
   else{
    this.lots = this.lotsOrg
   }
    this.refrechtable()
}
showarticle(){
  this.searchTerm="";
   ($('#responsive-modal') as any).modal('show');
   this.chargerArticle(null)
   this.chargerProjet()
   
}
showcomercial(){
  this.searchTerm="";
   ($('#responsive-modal') as any).modal('show');
   this.chargerArticle(null)
   
}

   chargerArticlebyname() {
     console.log('this.searchTerm')
    this.type="ARTICLE";
    this.articles = this.g.articlesOrg.filter(x => x.Libelle.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }
  chargerLotbyNumero() {
   
  
   this,this.lots= this.lotsOrg.filter(x => x.Numero.toLowerCase().includes(this.searchTerm.toLowerCase()));
   this.refrechtable()
 }
  
chargerlocalbyname(){
  this.localites=this.localitesOrg.filter(x=>x.Libelle.toLowerCase().includes(this.searchTerm.toLowerCase()))
}

chargerclientbyname(){
  this.clients=this.clientsOrg.filter(x=>x.Nom.toLowerCase().includes(this.searchTerm.toLowerCase()))
}
calculatePagesCountArt(elementPerPage : number, totalCount : number) {
    return totalCount < elementPerPage ? 1 : Math.ceil(totalCount / elementPerPage);
  }

  chargerListeArt(){
	  this.articles = [];
      this.articles.length = 0;
		if (this.currentPageArt < 1)
        {
            this.currentPageArt = 1;
        }
        else if (this.currentPageArt > this.totalPageArt)
        {
          this.currentPageArt = this.totalPageArt;
      }

      let startIndex = this.currentPageArt * this.pageSizeArt - this.pageSizeArt;
      let endIndex = startIndex + this.pageSizeArt;

      if(endIndex > this.g.articles.length) {
        endIndex = this.g.articles.length;
      }


      for (let i = startIndex; i < endIndex; i++) {
        this.articles.push(this.g.articles[i]);
      }


  }


 validatepush(detailCommande:DetailCommande){
   let res:boolean
if(detailCommande.IdArticle==0){
res= false
this.Message="selectioner Lot"
}
else if(detailCommande.Montant==0 || detailCommande.MontantDeclaration==0){
  res= false
  this.Message="erreur Prix Client ou Prix Declaration "
}
else{
  res=true
}
return res
}
  selectArticle(){
   
	//this.scrollToBottom();
	if(this.commande.DetailCommandes.length==0 || this.commande.CodeEtatCommande != this.EtatCommandeCode.REGLEE){
		if(this.calcVal == '0'){
      this.calcVal = '1';
    }

   
      console.log("dc=",this.detailCommande)
     
      let detailCommande2 = new DetailCommande();
      detailCommande2=JSON.parse(JSON.stringify(this.detailCommande))
      detailCommande2.IdArticle=this.lot.Identifiant
      detailCommande2.LibelleArticle=this.lot.LibelleProjet
      detailCommande2.NumerodeLot=this.lot.Numero
      detailCommande2.Quantite = Number(this.lot.Metre);
      detailCommande2.Montant = this.prix;
      detailCommande2.MontantDeclaration=this.prixD;
    
      detailCommande2.Description=this.description
    
     
if(this.validatepush(detailCommande2)){
  
  this.commande.DetailCommandes.push(detailCommande2);
   this.TotaleHT+= detailCommande2.Montant*detailCommande2.Quantite
  this.TotaleTVA+= detailCommande2.MontantDeclaration*detailCommande2.Quantite
      this.calcVal = '0';
    this.initdetailcommande()
}
else{
  console.log("Message1")
   Swal.fire({ text: this.Message , icon: 'error'});
   this.Message=""
}

    
     //  console.log("article",detailCommande)
    //}    
   // this.commande.DetailCommandes = this.commande.DetailCommandes;

    //this.idxOne = this.commande.DetailCommandes.length - 1;
  
	//console.log(this.commande.DetailCommandes.length);
    //this.updateTotalVal();
  
	//this.scrollToBottom();
	}

    

  }
  initdetailcommande(){
    this.quantite=0
    this.description=''
    this.numlot=''
   
    this.prix=0
    this.prixD=0
    this.tva=0
    this.lot=new Lot()
    this.TotaleHT=0
    this.TotaleTVA=0
  }


 
	

chargercat(){
  this.type="CAT";
}
  remove(index:number) {
         Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes!'
}).then((result) => {
     if( result.isConfirmed &&  this.commande.DetailCommandes.length > 0 && this.commande.DetailCommandes[index].QuantiteServi==0 
      &&  this.commande.CodeEtatCommande != this.EtatCommandeCode.REGLEE){
      this.commande.DetailCommandes.splice(index, 1);
      if(this.idxOne == this.commande.DetailCommandes.length){
        this.idxOne--;
      }
    }
    this.updatetotale()
})

  }

  updateTotalVal(){
    let mnt = 0;    
    for(let o of this.commande.DetailCommandes){
      mnt = mnt + (o.Quantite * o.Montant);
    }
    this.totalVal = "" + mnt;
    this.totalColor= (mnt == 0 )? "box bg-dark text-center" : "box bg-success text-center";
  }

  async valider(){
	  if(this.commande.CodeEtatCommande != this.EtatCommandeCode.REGLEE){
		  
		if(this.commande.Identifiant == null || this.commande.Identifiant === 0){
     // this.commande.Numero=this.numcommande
     this.commande.CodeCommande="VENT"
		  this.ajouterCommande();
		}else{
		  this.modifierCommande();
		}

	}
 

  }

  getGroupeTemporaire(){
   this.g.showLoadingBlock(true);
      this.utilisateurSvc.getGroupeTemporaire().subscribe(
      (res:any) => {
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
          Swal.fire({ text: etatReponse.Message , icon: 'success'});
        }else{ 
          console.log("Message2")
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        this.g.showLoadingBlock(false);    
      }
    );
  }

  ajouterCommande(){
    //alert('ajouterCommande');
      
      this.g.showLoadingBlock(true);
      this.commandeSvc.etablirCommande(this.commande).subscribe(
      (res:any) => {
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
          //let idCommande = res["idCommande"];
          this.commande=new Commande()
          
         // this.getCommandeById(idCommande);
         // this.getcountcommande()
          Swal.fire({ text: etatReponse.Message , icon: 'success'});
        }else{ 
          console.log("Message3")
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        this.g.showLoadingBlock(false);    
      }
    );
    
  }

  modifierCommande(){
    //alert('modifierCommande');

      this.g.showLoadingBlock(true);
      this.commandeSvc.modifierCommande(this.commande).subscribe(
      (res:any) => {
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
          let idCommande = res["idCommande"];
          this.getCommandeById(idCommande);
          //Swal.fire({ text: etatReponse.Message , icon: 'success'});
        }else{ 
          console.log("Message4")
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        this.g.showLoadingBlock(false);    
      }
    );
    
  }

  getCommandeById(identifiant:number){
    //this.g.showLoadingBlock(true);  
    this.commandeSvc.getCommandeById(identifiant).subscribe(
      (res:any) => {
        //this.type="CAT"
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
          this.commande = res["commandeVM"];
          console.log(this.commande)
          if(this.commande == null){
            this.commande = new Commande();
          }
          this.updateTotalVal();
		  this.updateComponentView();
        }else{ 
          console.log("Message5")
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        //this.g.showLoadingBlock(false);    
      }
    );
  }
  
  updateComponentView(){
	 // console.log(this.commande);
  }

  nouvCommande(){
    this.initcaisse()
  }



  chargerListLocalite(){

    this.ClientSvc.getclients().subscribe(
      (res:any) => {
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
          this.clientsOrg = res["clientVMs"];
       

          this.clients.length = 0;
          this.clients = [];

            for (let i = 0; i < this.clientsOrg.length; i++) {
              this.clients.push(this.clientsOrg[i]);
            }

        }else{ 
          console.log("Message6")
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        this.g.showLoadingBlock(false);    
        this.refrechtableste()
      }
    );


    /* this.g.showLoadingBlock(true);   */
   

    
  }

 

  showListeLocalite(){
    this.searchTerm="";
    this.chargerListLocalite();
($('#societe-modal') as any).modal('show')
   
  }





  
  selectLocalite(idLocalite : any){
    //alert('selectLocalite idArticle : ' + idLocalite);
    this.tableColor="box bg-megna text-center";
    let localite = this.localites.filter(x => x.Identifiant === idLocalite)[0];
    this.commande.LibelleLocalite = localite.Libelle;
    this.commande.IdLocalite = localite.Identifiant;
    ($('#societe-modal') as any).modal('hide');
    this.localites=[]   
  }
  selectClient(idClient : any){
    //alert('selectLocalite idArticle : ' + idLocalite);
    this.tableColor="box bg-megna text-center";
    let client = this.clients.filter(x => x.Identifiant === idClient)[0];
    this.commande.LibelleLocalite = client.Nom;
    this.commande.IdLocalite = client.Identifiant;
    ($('#societe-modal') as any).modal('hide');
    this.localites=[]   
  }

  initcaisse(){
    this.type="CAT"
    this.commandes=[]
    this.commandes.length=0
    this.getCommandeById(0);
    this.currentPageCat=0
  }
  controler(){

 this.g.showLoadingBlock(true);
      this.commandeSvc.controlerCommande(this.commande).subscribe(
      (res:any) => {
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
          this.initcommande();
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
          console.log("Message17")
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        this.g.showLoadingBlock(false);    
      }
    );
  }
  getstyle(item:Categorie){
 return    {'background-color': item.Background}
  }
    chargerCommandesNonControler(){

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

          if (this.currentPageCom < 1)
              {
                  this.currentPageCom = 1;
              }
              else if (this.currentPageCom > this.totalPageCom)
              {
                this.currentPageCom = this.totalPageCom;
            }

            let startIndex = this.currentPageCom * this.pageSizeCom - this.pageSizeCom;
            let endIndex = startIndex + this.pageSizeCom;

            if(endIndex > this.commandesOrg.length) {
              endIndex = this.commandesOrg.length;
            }


            for (let i = startIndex; i < endIndex; i++) {
              this.commandes.push(this.commandesOrg[i]);
            }
            this.g.typecommande="COMMANDENONCONTROLER"
//console.log(this.commandes)
        }else{ 
          console.log("Message18")
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        //this.g.showLoadingBlock(false);    
      }
    );

    
  }
}

