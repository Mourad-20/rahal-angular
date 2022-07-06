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
public article : Article =new Article();
public currentPageArt : number = 1;
public totalPageArt : number = 1;
public pageSizeArt : number = 20;
//--------------------------------------
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
  constructor(public route:ActivatedRoute,public rxjs:Rxjs, public g: Globals,private commandeSvc:CommandeSvc,
  private localiteSvc:LocaliteSvc,private reglementSvc:ReglementSvc,public utilisateurSvc:UtilisateurSvc,
  private router: Router,private seanceSvc:SeanceSvc,private categorieSvc:CategorieSvc,
  private articleSvc:ArticleSvc,private associationMessageSvc :AssociationMessageSvc,private messageSvc:MessageSvc) {

  this.g.showLoadingBlock(true);
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
					  this.totalPageCat = this.calculatePagesCountCat(this.pageSizeCat,this.g.categories.length);
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
  getcountcommande(){
       this.commandeSvc.getCommandesNonReglees().subscribe(
      (res:any) => {
        let etatReponse = res["EtatReponse"];
         console.log("code",etatReponse.Code)
        
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
           let commandes:Commande[]=res["commandeVMs"]
           commandes = commandes.filter(x=>x.IdCreePar==this.g.utilisateur!.Identifiant);
      this.commandeCount=commandes.length
          }})
 
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
      case "serveur":
      if(this.showserveur==false){
        this.showListeServeur()
  this.showcaisse=false
  this.showserveur=true
  this.showlocale=false
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
          this.detailCommandes= this.detailCommandes.filter(x=>x.IdValiderPar!=null && x.QuantiteServi==0)
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

  resetCalculator(){
    
    this.calcVal = "0";
  }

  calculatePagesCountCat(elementPerPage : number, totalCount : number) {
    return totalCount < elementPerPage ? 1 : Math.ceil(totalCount / elementPerPage);
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

  showarticle(){
    this.searchTerm="";
    ($('#responsive-modal') as any).modal('show');
    this.chargerArticle(null)
    
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

  chargerlocalbyname(){
    this.localites=this.localitesOrg.filter(x=>x.Libelle.toLowerCase().includes(this.searchTerm.toLowerCase()))
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
 //====================================================================================================
nextbutton(){
switch (this.type) {
    case 'CAT':
        this.nextCategorie()
        break;
    case 'ARTICLE':
        this.nextArticle()
        break;
    case 'COM':
        this.nextCommande()
        break;
}
}
previousbutton(){
  switch (this.type) {
    case 'CAT':
        this.previousCategorie()
        break;
    case 'ARTICLE':
        this.previousArticle()
        break;
    case 'COM':
        this.previousCommande()
        break;
}
}
  //====================================================================================================

  nextCategorie(){
    this.currentPageCat++;
    this.chargerListeCat();
  }

  previousCategorie(){
    this.currentPageCat--;
    this.chargerListeCat();
  }
  //====================================================================================================
nextArticle(){
    this.currentPageArt++;
    this.chargerListeArt();
  }

  previousArticle(){
    this.currentPageArt--;
    this.chargerListeArt();
  }
  //====================================================================================================
 nextCommande(){
    this.currentPageCom++;
    this.chargerCommandesNonReglees();
  }
  previousCommande(){
    this.currentPageCom--;
    this.chargerCommandesNonReglees();
  }
  //====================================================================================================

  //====================================================================================================

  
 validatepush(detailCommande:DetailCommande){
    let res:boolean
    if(detailCommande.IdArticle==0){
    res= false
    this.Message="selectioner projet"
    }

    else{
      res=true
    }
    return res
  }

  selectArticle(){
    //this.scrollToBottom();
  console.log("ok12")
    if(this.commande.DetailCommandes.length == 0) {
      if(this.commande.CodeEtatCommande != this.EtatCommandeCode.REGLEE){
        if(this.calcVal == '0'){
          this.calcVal = '1';
        }
  
        /* if(this.commande.DetailCommandes.filter(x => x.IdArticle === idArticle).length > 0) {
          //alert('Existe déja');
          let detailCommande = this.commande.DetailCommandes.filter(x => x.IdArticle === idArticle)[0];
          detailCommande.Quantite = detailCommande.Quantite + Number(this.calcVal);
        }else{ */
  
        // let article = this.g.articlesOrg.filter(x => x.Identifiant === idArticle)[0];
          console.log("dc=",this.detailCommande)
        
          let detailCommande2 = new DetailCommande();
          detailCommande2=JSON.parse(JSON.stringify(this.detailCommande))
          //detailCommande2.IdArticle = this.article.Identifiant;
          //detailCommande2.LibelleArticle = this.article.Libelle;
          detailCommande2.Quantite = Number(this.quantite);
          detailCommande2.Montant = this.article.Montant;
          //detailCommande2.LibelleTypeUnite=this.detailCommande.LibelleTypeUnite
        // detailCommande2.IdTypeUnite=this.detailCommande.IdTypeUnite
          //detailCommande2.IdCaisse=this.detailCommande.IdCaisse
          detailCommande2.Montant=this.prix
          detailCommande2.TauxTVA=this.tva
        
          detailCommande2.Description=this.description
          //detailCommande2.NumerodeLot=this.numlot
        
      if(this.validatepush(detailCommande2)){
        console.log("dc2=",detailCommande2)
        this.commande.DetailCommandes.push(detailCommande2);
        this.TotaleHT+= detailCommande2.Montant*detailCommande2.Quantite
        this.TotaleTVA+= detailCommande2.Montant*detailCommande2.Quantite*detailCommande2.TauxTVA/100
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
  }

  initdetailcommande(){
    this.quantite=0
    this.description=''
    this.numlot=''
   
    this.prix=0
    this.tva=0
    this.article=new Article()
  }
  
  getRowIndex(x : any){
	//	console.log(x);
		this.idxOne = x;
	   //console.log("Row index is: " + x.rowIndex);
	  
  }

   getnavIndex(x : any){
		this.idnav = x;
	   //console.log("Row index is: " + x.rowIndex);
	  
  }

  scrollToBottom () {		
		setTimeout(function(){
			var mydiv = $("#montab");
			mydiv.scrollTop(mydiv.prop("scrollHeight"));
		}, 50);
	}
	
  goUp(){
    if(this.idxOne > 0){
      this.idxOne--;
    }
  }

  goDown(){
    if(this.idxOne < this.commande.DetailCommandes.length - 1){
      this.idxOne++;
    }
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
  this.getcountcommande()

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

  calculatePagesCountLoc(elementPerPage : number, totalCount : number) {
    return totalCount < elementPerPage ? 1 : Math.ceil(totalCount / elementPerPage);
  }

  calculatePagesCountServ(elementPerPage : number, totalCount : number) {
    return totalCount < elementPerPage ? 1 : Math.ceil(totalCount / elementPerPage);
  }
   actionMessage(x : any){

    if(this.Messageisexiste(x)){
          // console.log("ok==",x)
     
  this.removeMessage(x)
    }
    else{
       //console.log("no==",x)
      this. addMessage(x)
     
    }
  }

  Messageisexiste(y:any){

    	if(this.commande.DetailCommandes[this.idxOne].AffectationMessages.filter(x => x.IdMessage === this.affectationMessageVMs[y].IdMessage).length == 0){
          return false
         
      }
  return true
  }

  styleObject(x:any){
  if(this.Messageisexiste(x)){
    return {'background-color': "#98ac25b9"}
  }
  return {'background-color': "#ac3525b9"}
  }

  chargerListLocalite(){

  console.log("liste commande dispo")
    this.localiteSvc.getLocalites().subscribe(
      (res:any) => {
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
          this.localitesOrg = res["localiteVMs"];
         // console.log( this.localitesOrg[0])
this.localitesOrg=this.localitesOrg.filter(x => x.Code === "CLIENT")
          //this.totalPageLoc = this.calculatePagesCountLoc(this.pageSizeLoc,this.localitesOrg.length);
    

          this.localites.length = 0;
          this.localites = [];

            for (let i = 0; i < this.localitesOrg.length; i++) {
              this.localites.push(this.localitesOrg[i]);
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

  chargerListServeur(){


   /*  this.g.showLoadingBlock(true);   */
    this.utilisateurSvc.getServeurs(null).subscribe(
      (res:any) => {
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
          this.serveursOrg = res["utilisateurVMs"];
		  if(this.serveursOrg == null){
			  this.serveursOrg = [];
		  }

          //this.totalPageServ = this.calculatePagesCountServ(this.pageSizeServ,this.serveursOrg.length);
    

          this.serveurs.length = 0;
          this.serveurs = [];

          /*if (this.currentPageServ < 1)
              {
                  this.currentPageServ = 1;
              }
              else if (this.currentPageServ > this.totalPageServ)
              {
                this.currentPageServ = this.totalPageServ;
            }

            let startIndex = this.currentPageServ * this.pageSizeServ - this.pageSizeServ;
            let endIndex = startIndex + this.pageSizeServ;

            if(endIndex > this.serveursOrg.length) {
              endIndex = this.serveursOrg.length;
            }*/


            for (let i = 0; i < this.serveursOrg.length; i++) {
              this.serveurs.push(this.serveursOrg[i]);
            }

        }else{ 
          console.log("Message7")
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        this.g.showLoadingBlock(false);    
      }
    );
  }

  showListeLocalite(){
    this.searchTerm="";
    this.chargerListLocalite();
($('#societe-modal') as any).modal('show')
   
  }

  nextLocalite(){
    this.currentPageLoc++;
    this.chargerListLocalite();
  }

  previousLocalite(){
    this.currentPageLoc--;
    this.chargerListLocalite();
  }

  showListeServeur(){
    
   // this.idnav=2
    this.chargerListServeur();
    //($('#serveurModal') as any).modal('show');
  }

  nextServeur(){
    this.currentPageServ++;
    this.chargerListServeur();
  }

  previousServeur(){
    this.currentPageServ--;
    this.chargerListServeur();
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

  selectServeur(idServeur : any){
    //alert('selectS idArticle : ' + idLocalite);
    this.serveurColor="box bg-primary text-center";
    let serveur = this.serveurs.filter(x => x.Identifiant === idServeur)[0];
    this.commande.NomServeur = serveur.Nom;
    this.commande.IdServeur = serveur.Identifiant;
    this.idnav=1;
    //($('#serveurModal') as any).modal('hide');
    this.show('serveur')
  }

  showCommandesNonReglees(){
    this.chargerCommandesNonReglees();
    //($('#commandesNonRegleesModal') as any).modal('show');
  }

  calculatePagesCountCom(elementPerPage : number, totalCount : number) {
    return totalCount < elementPerPage ? 1 : Math.ceil(totalCount / elementPerPage);
  }

  chargerCommandesNonReglees(){


    //this.g.showLoadingBlock(true);  
   
    this.commandeSvc.getCommandesNonReglees().subscribe(
      (res:any) => {
        let etatReponse = res["EtatReponse"];
         console.log(etatReponse.Code)
        
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
              this.type="COM";

          this.commandesOrg = res["commandeVMs"];

          this.totalPageCom = this.calculatePagesCountCom(this.pageSizeCom,this.commandesOrg.length);
    

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
            this.g.typecommande="COMMANDENONREGLEE"
//console.log(this.commandes)
        }else{ console.log("Message8")
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        //this.g.showLoadingBlock(false);    
      }
    );

    
  }

  selectCommande(idCommande : any){
    this.getCommandeById(idCommande);
    //($('#commandesNonRegleesModal') as any).modal('hide');
  }

  showReglements(){
	   this.idxSix = -1;
	  this.quantiteToRegler = 0;
	  this.detailReglementsNonRegle = [];
	  this.detailReglementsToRegler = []; 
	  if(this.commande.CodeEtatCommande != this.EtatCommandeCode.REGLEE){
		  if(this.commande.DetailCommandes.length > 0){
			  
			  
			  
			  
			  this.commandeSvc.getDetailCommandesNonReglees(this.commande.Identifiant).subscribe(
          
				(res:any) => {
         
				let etatReponse = res["EtatReponse"];
        
				if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
				  
				  let detailCommandesNonReglees = res["detailCommandeVMs"];
				   
				  
				  if(detailCommandesNonReglees.length > 0){
					for(let dc of detailCommandesNonReglees){
						let detailReglement = new DetailReglement();
						detailReglement.IdDetailCommande = dc.Identifiant;
						detailReglement.LibelleArticle = dc.LibelleArticle;
						detailReglement.Quantite = dc.Quantite;
						detailReglement.Montant = dc.Montant;
						this.detailReglementsNonRegle.push(detailReglement);	
            //console.log("etatReponse",this.detailReglementsNonRegle)			
					}
				}
          ($('#responsive-modal') as any).modal('show');
				  
				}else{ 
          console.log("Message9")
				  Swal.fire({ text: etatReponse.Message , icon: 'error'});
				}
				this.g.showLoadingBlock(false);    
			  }
			);
			  
			  
			  
			  
				
		  }
	  }	 
  }
  
  getReglementsByIdCommande(idCommande : number){
	  this.g.showLoadingBlock(true);  
      this.reglementSvc.getReglementsByIdCommande(this.commande.Identifiant).subscribe(
        (res:any) => {
          let etatReponse = res["EtatReponse"];
          if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
            this.lstReglements = res["reglementVMs"];
			this.idxThree = this.lstReglements.length - 1;
			this.reglement = this.lstReglements[this.idxThree];
           // console.log(this.lstReglements);
          }else{ 
            console.log("Message10")
            Swal.fire({ text: etatReponse.Message , icon: 'error'});
          }
          this.g.showLoadingBlock(false);    
        }
      );
  }
  
  goUpReglement(){
	  if(this.idxThree > 0){
		  this.idxThree--;
		  this.reglement = this.lstReglements[this.idxThree];
		}
  }
  
  goDownReglement(){
	  if(this.idxThree < this.lstReglements.length - 1){
		  this.idxThree++;
		  this.reglement = this.lstReglements[this.idxThree];;
		}
  }
  
  reglerTemporairement(){
	  if(this.commande.Identifiant > 0 && this.commande.CodeEtatCommande != this.EtatCommandeCode.REGLEE){
	  this.g.showLoadingBlock(true); 
		  this.reglementSvc.reglerTemporairement(this.commande.Identifiant).subscribe(
        (res:any) => {
          let etatReponse = res["EtatReponse"];
          if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
			  this.getCommandeById(this.commande.Identifiant);
			  Swal.fire({ text: etatReponse.Message , icon: 'success'});
          }else{ 
            console.log("Message11")
            Swal.fire({ text: etatReponse.Message , icon: 'error'});
          }
          this.g.showLoadingBlock(false);    
        }
      );
	  }	  
  }
  
  async imprimerPreparation(){
   // this.valider()
	  if(this.commande.Identifiant > 0){
	  this.g.showLoadingBlock(true); 
		  this.commandeSvc.envoyerTicketPrepation(this.commande.Identifiant).subscribe(
        (res:any) => {
          let etatReponse = res["EtatReponse"];
          console.log("etatReponse",etatReponse)
          if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
            this.initcaisse()
			  //Swal.fire({ text: etatReponse.Message , icon: 'success'});
          }else{ 
            console.log("Message12")
            Swal.fire({ text: etatReponse.Message , icon: 'error'});
          }
          this.g.showLoadingBlock(false);    
        }
      );
	  }
  }
  
  imprimerNote(){
	  if(this.commande.Identifiant > 0){
	  this.g.showLoadingBlock(true); 
		  this.commandeSvc.envoyerTicketNote(this.commande.Identifiant).subscribe(
        (res:any) => {
          let etatReponse = res["EtatReponse"];
          if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
			  //Swal.fire({ text: etatReponse.Message , icon: 'success'});
          }else{ 
            console.log("Message13")
            Swal.fire({ text: etatReponse.Message , icon: 'error'});
          }
          this.g.showLoadingBlock(false);    
        }
      );
	  }
  }
  
  showRecap(){
    this.chargerRecap();
    ($('#recapModal') as any).modal('show');
  }
  
  chargerRecap(){
	  
	  this.g.showLoadingBlock(true); 
		  this.commandeSvc.getRecap(undefined).subscribe(
        (res:any) => {
          let etatReponse = res["EtatReponse"];
          if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
			  this.recaps = res['recapVMs'];
          }else{ 
            console.log("Message14")
            Swal.fire({ text: etatReponse.Message , icon: 'error'});
          }
          this.g.showLoadingBlock(false);    
        }
      );
  }
  
  cloturerSeance(){
	  this.router.navigate(['clotureSeance']);
  }
  
   getRowIdxSix(x : any){
		this.idxSix = x;
		let detailReglementSrc = this.detailReglementsNonRegle[this.idxSix];
		this.quantiteToRegler = detailReglementSrc.Quantite;		
  }
  
  getRowIdxSeven(x : any){
	  this.idxSeven = x;
		let detailReglementSrc = this.detailReglementsToRegler[this.idxSeven];
		this.quantiteToRegler = detailReglementSrc.Quantite;	
  }
  
  tagToReglement(){
	if(this.idxSix >= 0 && this.detailReglementsNonRegle.length > 0){
		let detailReglementSrc = this.detailReglementsNonRegle[this.idxSix]; 
		let detailReglement = new DetailReglement();
		detailReglement.IdDetailCommande = detailReglementSrc.IdDetailCommande;
		detailReglement.LibelleArticle = detailReglementSrc.LibelleArticle;
		detailReglement.Quantite = detailReglementSrc.Quantite;
		detailReglement.Montant = detailReglementSrc.Montant;
		this.detailReglementsToRegler.push(detailReglement);
		this.detailReglementsNonRegle.splice(this.idxSix, 1);
		if(this.idxSix > 0){
			this.idxSix = this.idxSix - 1;
		}
		this.idxSeven = this.detailReglementsToRegler.length - 1;
		
	}
  }
  
  untagToReglement(){
	  if(this.idxSeven >= 0 && this.detailReglementsToRegler.length > 0){
		let detailReglementSrc = this.detailReglementsToRegler[this.idxSeven]; 
		let detailReglement = new DetailReglement();
		detailReglement.IdDetailCommande = detailReglementSrc.IdDetailCommande;
		detailReglement.LibelleArticle = detailReglementSrc.LibelleArticle;
		detailReglement.Quantite = detailReglementSrc.Quantite;
		detailReglement.Montant = detailReglementSrc.Montant;
		this.detailReglementsNonRegle.push(detailReglement);
		this.detailReglementsToRegler.splice(this.idxSeven, 1);
		if(this.idxSeven > 0){
			this.idxSeven = this.idxSeven - 1;
		}
		this.idxSix = this.detailReglementsNonRegle.length - 1;
	}
  }
  
  tagAllToReglement(){
	if(this.detailReglementsNonRegle.length > 0){
		let i = 0;
		for(let dr of this.detailReglementsNonRegle){
			let detailReglement = new DetailReglement();
			detailReglement.IdDetailCommande = dr.IdDetailCommande;
			detailReglement.LibelleArticle = dr.LibelleArticle;
			detailReglement.Quantite = dr.Quantite;
			detailReglement.Montant = dr.Montant;
			this.detailReglementsToRegler.push(detailReglement);
		}
		this.detailReglementsNonRegle = [];	
		this.idxSeven = this.detailReglementsToRegler.length - 1;
	}
  }
  
  untagAllToReglement(){
	  if(this.detailReglementsToRegler.length > 0){
		let i = 0;
		for(let dr of this.detailReglementsToRegler){
			let detailReglement = new DetailReglement();
			detailReglement.IdDetailCommande = dr.IdDetailCommande;
			detailReglement.LibelleArticle = dr.LibelleArticle;
			detailReglement.Quantite = dr.Quantite;
			detailReglement.Montant = dr.Montant;
			this.detailReglementsNonRegle.push(detailReglement);
		}
		this.detailReglementsToRegler = [];	
		this.idxSix = this.detailReglementsNonRegle.length - 1;	
	}
  }
  
  
  effectuerReglement(){
	  if(this.detailReglementsToRegler.length > 0){
		  let reglement = new Reglement();
		  reglement.IdCommande = this.commande.Identifiant;
		  reglement.IdModeReglement = 1;
		  reglement.DetailReglements = [];
		  for(let dr of this.detailReglementsToRegler){
				let detailReglement = new DetailReglement();
				detailReglement.IdDetailCommande = dr.IdDetailCommande;
				detailReglement.LibelleArticle = dr.LibelleArticle;
				detailReglement.Quantite = dr.Quantite;
				detailReglement.Montant = dr.Montant;
				reglement.DetailReglements.push(detailReglement);				
			}

	   this.g.showLoadingBlock(true);  
	   this.reglementSvc.etablirReglement(reglement).subscribe(
		(res:any) => {
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
           this.initcommande();
           let idx=0
             let y:Commande
	     for(y of this.commandes){
if(y.Identifiant===this.commande.Identifiant){

  break
}
else{
  idx+=1
}

     }
     console.log(idx)
this.commandes.splice(idx, 1)
		  Swal.fire({ text: etatReponse.Message , icon: 'success'});
        }else{ 
          console.log("Message15")
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        ($('#responsive-modal') as any).modal('hide');
        this.g.showLoadingBlock(false);    
      }
    );
	   
	
	  }
  }

  showListeMessage(){
      console.log("ccccccc")
      this.type="MESSAGE";
		this.affectationMessageVMs = [];
		this.chargerMessagesLibre();
	
	}
	
	chargerMessagesLibre(){
		
		let detailCommande = this.commande.DetailCommandes[this.idxOne];
		this.associationMessageSvc.getAssociationMessages(detailCommande.IdArticle).subscribe(
        (res:any) => {
          let etatReponse = res["EtatReponse"];
          if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
			  let associationMessageVMs = res['associationMessageVMs'];
			  console.log(associationMessageVMs);
			  for(let am of associationMessageVMs){
				  
				  if(am.EnActivite === 1){
					  if(detailCommande.AffectationMessages.filter(x => x.IdMessage === am.IdMessage).length == 0){
						let affectationMessage = new AffectationMessage();
						affectationMessage.IdDetailCommande = detailCommande.Identifiant;
						affectationMessage.IdMessage = am.IdMessage;
						affectationMessage.LibelleMessage = am.LibelleMessage;
						this.affectationMessageVMs.push(affectationMessage);
					   }
				  
					
				  }
			   }
          }else{ 
            console.log("Message16")
            Swal.fire({ text: etatReponse.Message , icon: 'error'});
          }
          this.g.showLoadingBlock(false);    
        }
      );
  }
  
  
  addMessage(x : any){
		this.idxFour = x;
		let detailCommande = this.commande.DetailCommandes[this.idxOne];		
		let affectationMessageTemp = this.affectationMessageVMs[this.idxFour];
		if(detailCommande.AffectationMessages.filter(x => x.IdMessage === affectationMessageTemp.IdMessage).length == 0){
			let affectationMessage = new AffectationMessage();
			affectationMessage.Identifiant = affectationMessageTemp.Identifiant;
			affectationMessage.IdDetailCommande = detailCommande.Identifiant;
			affectationMessage.IdMessage = affectationMessageTemp.IdMessage;
			affectationMessage.LibelleMessage = affectationMessageTemp.LibelleMessage;			
			detailCommande.AffectationMessages.push(affectationMessage);
			//this.affectationMessageVMs.splice(x, 1);
		}
  }

  removeMessage(x : any){
	  
	  this.idxFive = x;
    let y:any
	  let detailCommande = this.commande.DetailCommandes[this.idxOne];	  
	  let affectationMessageTemp =  this.affectationMessageVMs[x];
	   let idx=0
	     for(y of detailCommande.AffectationMessages){
          console.log(affectationMessageTemp)
if(y.IdMessage===affectationMessageTemp.IdMessage){


  break
}
else{
  idx+=1
}
     }
     	  detailCommande.AffectationMessages.splice(idx, 1);

	  let affectationMessage = new AffectationMessage();
	  affectationMessage.Identifiant = affectationMessageTemp.Identifiant;			
	  affectationMessage.IdMessage = affectationMessageTemp.IdMessage;
	  affectationMessage.LibelleMessage = affectationMessageTemp.LibelleMessage;
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

          this.totalPageCom = this.calculatePagesCountCom(this.pageSizeCom,this.commandesOrg.length);
    

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

