import { Component,HostListener,OnInit } from '@angular/core';
import { Router,NavigationStart,NavigationEnd,NavigationError,RoutesRecognized, ActivatedRoute } from '@angular/router';
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
import{TypeUniteSvc} from '../services/typeuniteSvc';
import { AssociationMessageSvc } from '../services/associationMessageSvc';
import {Message}from '../entities/Message';
import{CaisseSvc} from '../services/caisseSvc';
import {Subscription} from 'rxjs'
import { Rxjs } from '../services/rxjs';
import Swal from 'sweetalert2';
//import * as $ from 'jquery';


import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CategoriesComponent } from '../listes/categories/categories.component';
import { Caisse } from '../entities/Caisse';
@Component({
  selector: 'app-caisse',
  templateUrl: './caisse.component.html',
  styleUrls: ['./caisse.component.css']
})
export class CaisseComponent implements OnInit {
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
public Message:string=""
public quantite:number=0
public numlot:string=''
public description:string=''
public numcommande:string=""
public caisses:Caisse[]=[]
public caissesOrg:Caisse[]=[]
public Unite:number=0
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
public typeunite:any
public idxSix : number = -1;
public idxSeven : number = -1;
public quantiteToRegler : number = 0;
public localeactive:string="";
public commandeCount:number=0
public caisse:Caisse|any=new Caisse()
//clickEventSubscription:Subscription;
//controleEventSubscription:Subscription;

 
 public pieChartLabels: any[] = [['SciFi'], ['Drama'], 'Comedy'];
  public pieChartData: any = [30, 50, 20];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public id:number|any=0;
  public isReadOnly:boolean=false
  public backgroundcategorie:string=""
 public loadAPI!: Promise<any>;
 public  url = '../assets/node_modules/bootstrap-table/dist/bootstrap-table.min.js';
public colorMessage:string=""

  constructor(public route:ActivatedRoute,public TypeUniteSvc:TypeUniteSvc,public rxjs:Rxjs, public g: Globals,private commandeSvc:CommandeSvc,public CaisseSvc:CaisseSvc,
  private localiteSvc:LocaliteSvc,private reglementSvc:ReglementSvc,public utilisateurSvc:UtilisateurSvc,
  private router: Router,private seanceSvc:SeanceSvc,private categorieSvc:CategorieSvc,
  private articleSvc:ArticleSvc,private associationMessageSvc :AssociationMessageSvc,private messageSvc:MessageSvc) {
    this.g.showLoadingBlock(true);
   this.route.params.subscribe(params => {
      if(params['id']!=null) {
       debugger
       	this.commandeSvc.getCommandeById(params['id']).subscribe((res:any) => {
			let etatReponse = res["EtatReponse"];
			if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
			  this.commande = res["commandeVM"];
        this.numcommande=this.commande.Numero
     this.isReadOnly=true
    }
  });
      }
        })


    this.TypeUniteSvc.getListeTypeUnites().subscribe(
      (res:any) => {
      let etatReponse = res["EtatReponse"];
      if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
        this.typeunite = res["typeUniteVMs"];
        console.log( this.typeunite)
      }})

  this.CaisseSvc.getCaisse().subscribe(
    (res:any) => {
    let etatReponse = res["EtatReponse"];
    if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
      this.caissesOrg = res["caisseVMs"];
    }})
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
						  }else{
							Swal.fire({ text: etatReponse.Message , icon: 'error'});
						  }
						  this.g.showLoadingBlock(false);    
						}
					  );

					  //----------------------------------------------------


					}else{
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
			  Swal.fire({ text: etatReponse.Message , icon: 'error'});
			}
			this.g.showLoadingBlock(false);    
		  }

		);
   }

  ngOnInit(): void {
    this.g.title="Allimentation"
        var $: any;
  	this.type="CAT";
    this.table=true;
    console.log("table "+this.g.articlesOrg);
     this.loadScript()
     for(const x in this.LocaliteCode){
        if(x!=this.LocaliteCode.EMPORTER){
      this.codelocalites.push(x)}
     }
     this. getcountcommande()
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
 
this.article=item;
console.log(item)
this.Unite=item.IdTypeUnite;
($('#responsive-modal') as any).modal('hide');
}

setcaisse(item:Caisse){
 
  this.caisse=item;
  ($('#stock-modal') as any).modal('hide');
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

  chargerstock(event :any) {
     console.log(this.caissesOrg)
   if(event){
    let id:number= event.target.value   
if(id!=0){
 //this.caisses = this.caissesOrg.filter(x=>x.Identifiant==id)
}
else{
  this.caisses = this.caissesOrg;
}
   }
   else{
    this.caisses = this.caissesOrg;
   }
   
  
    this.refrechtable()
    //this.totalPageArt = this.calculatePagesCountArt(this.pageSizeArt,this.g.articles.length);
    //this.chargerListeArt();
  }
showarticle(){
   ($('#responsive-modal') as any).modal('show');
   this.chargerArticle(null)
   
}
 showstock(){
  ($('#stock-modal') as any).modal('show');
  this.chargerstock(null)
  
} 

   chargerArticlebyname() {
     console.log('this.searchTerm')
    this.type="ARTICLE";
    this.articles = this.g.articlesOrg.filter(x => x.Libelle.toLowerCase().includes(this.searchTerm.toLowerCase()));
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

  

  selectArticle(){
	//this.scrollToBottom();
//console.log(idArticle)
	if(this.commande.CodeEtatCommande != this.EtatCommandeCode.REGLEE){
		if(this.calcVal == '0'){
      this.calcVal = '1';
    }
      let detailCommande = new DetailCommande();
      detailCommande.IdArticle = this.article.Identifiant;
      detailCommande.LibelleArticle = this.article.Libelle;
      detailCommande.IdTypeUnite=this.article.IdTypeUnite;
      detailCommande.Quantite = Number(this.quantite);
      detailCommande.Montant = this.article.Montant;
      detailCommande.TauxTVA=this.article.TauxTva;
      detailCommande.LibelleTypeUnite=this.article.LibelleTypeUnite
      detailCommande.DateExpiration=this.dateexpiration
      detailCommande.Description=this.description
      detailCommande.NumerodeLot=this.numlot
      detailCommande.IdCaisse=this.caisse.Identifiant
if(this.validatepush(detailCommande)){
  this.commande.DetailCommandes.push(detailCommande);
      this.calcVal = '0';
    this.initdetailcommande()
}
    
	}

  }
   validatepush(detailCommande:DetailCommande){
   let res:boolean
if(detailCommande.IdArticle==0){
res= false
this.Message="selectioner article"
}
else if(detailCommande.Quantite==0 ){
res=false
this.Message="erreur de quanite saisie"
}
else if(detailCommande.DateExpiration=="" ){
res=false
this.Message="erreur date expiration"
}
else if(detailCommande.IdTypeUnite==0 ){
  res=false
  this.Message="erreur Unite"
  }
  else if(detailCommande.IdCaisse==0 ){
    res=false
    this.Message="erreur Stock"
    }
else{
  res=true
}
return res
}
  initdetailcommande(){
    this.quantite=0
    this.description=''
    this.numlot=''
    this.dateexpiration=""
    this.article=new Article()
    this.caisse=new Caisse()
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
     if( result.isConfirmed && this.commande.DetailCommandes.length > 0 && this.commande.DetailCommandes[index].QuantiteServi==0 &&  this.commande.CodeEtatCommande != this.EtatCommandeCode.REGLEE){
      this.commande.DetailCommandes.splice(index, 1);
      if(this.idxOne == this.commande.DetailCommandes.length){
        this.idxOne--;
      }
    }
    this.updateTotalVal();
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
     // this.commande.CodeCommande="VENT"
     // this.commande.Numero=this.numcommande
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
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        this.g.showLoadingBlock(false);    
      }
    );
  }

  ajouterCommande(){
    //alert('ajouterCommande');
      
      this.g.showLoadingBlock(true);
      this.commandeSvc.allimentationstock(this.commande).subscribe(
      (res:any) => {
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
          //let idCommande = res["idCommande"];
          this.commande=new Commande()
          
         // this.getCommandeById(idCommande);
         // this.getcountcommande()
          Swal.fire({ text: etatReponse.Message , icon: 'success'});
        }else{ 
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
  chargerListLocalite(code:string){
console.log("ok")
if(this.type=='CONTROLE'|| this.type=='COM'){
  console.log("liste commande")
   this.localiteSvc.getLocalites().subscribe(
      (res:any) => {
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
          this.localitesOrg = res["localiteVMs"];
          console.log( this.localitesOrg)
this.localitesOrg=this.localitesOrg.filter(x => x.Code === code)
          //this.totalPageLoc = this.calculatePagesCountLoc(this.pageSizeLoc,this.localitesOrg.length);
    

          this.localites.length = 0;
          this.localites = [];

         


            for (let i = 0; i < this.localitesOrg.length; i++) {
              this.localites.push(this.localitesOrg[i]);
            }

        }else{ 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        this.g.showLoadingBlock(false);    
      }
    );
}
else{
  console.log("liste commande dispo")
    this.localiteSvc.getLocalitesDisponible().subscribe(
      (res:any) => {
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
          this.localitesOrg = res["localiteVMs"];
         // console.log( this.localitesOrg[0])
this.localitesOrg=this.localitesOrg.filter(x => x.Code === code)
          //this.totalPageLoc = this.calculatePagesCountLoc(this.pageSizeLoc,this.localitesOrg.length);
    

          this.localites.length = 0;
          this.localites = [];

          /*if (this.currentPageLoc < 1)
              {
                  this.currentPageLoc = 1;
              }
              else if (this.currentPageLoc > this.totalPageLoc)
              {
                this.currentPageLoc = this.totalPageLoc;
            }

            let startIndex = this.currentPageLoc * this.pageSizeLoc - this.pageSizeLoc;
            let endIndex = startIndex + this.pageSizeLoc;

            if(endIndex > this.localitesOrg.length) {
              endIndex = this.localitesOrg.length;
            }*/


            for (let i = 0; i < this.localitesOrg.length; i++) {
              this.localites.push(this.localitesOrg[i]);
            }

        }else{ 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        this.g.showLoadingBlock(false);    
      }
    );

}
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
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        this.g.showLoadingBlock(false);    
      }
    );
  }

  showListeLocalite(code:string){
     if(this.commande.CodeEtatCommande != this.EtatCommandeCode.REGLEE){
		  this.localeactive=code
   // this.idnav=3
    this.chargerListLocalite(code);
	  }
   
  }

nextLocalite(){
    this.currentPageLoc++;
    this.chargerListLocalite("");
  }
  previousLocalite(){
    this.currentPageLoc--;
    this.chargerListLocalite("");
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
    if(this.type=='CONTROLE'|| this.type=='COM'){
this.commandes=this.commandesOrg.filter(x=>x.IdLocalite==idLocalite)
    }
    else{

   
    this.tableColor="box bg-megna text-center";
    let localite = this.localites.filter(x => x.Identifiant === idLocalite)[0];
    this.commande.LibelleLocalite = localite.Libelle;
    this.commande.IdLocalite = localite.Identifiant;
       this.idnav=1; }
    //($('#localiteModal') as any).modal('hide');
    this.tableColor="box bg-megna text-center";
    this.localites=[]
    this.localeactive=""
    this.show('localite')
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
        }else{ 
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
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        //this.g.showLoadingBlock(false);    
      }
    );

    
  }
}

