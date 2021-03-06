import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Routes, Router } from '@angular/router';
import { Article } from '../entities/Article';
import { Globals } from '../globals';
import { ActivatedRoute } from '@angular/router';
import {  IDropdownSettings } from 'ng-multiselect-dropdown';
import { TypeArticleCode } from '../entities/TypeArticleCode';
import Swal from 'sweetalert2'
import { ArticleSvc } from '../services/articleSvc';
import { MessageSvc } from '../services/messageSvc';
import { DetailCommande } from '../entities/DetailCommande';
import{CommandeSvc}from '../services/commandeSvc';
import{Commande}from '../entities/Commande';
import{TypeCommandeCode}from '../entities/TypeCommandeCode';
import { MessageCode } from '../entities/MessageCode';
import{format} from 'date-fns';
import { Message } from '../entities/Message';
interface mouvement {
  DateCommande?: Date;
Numero?: string;
LibelleLocalite?: string;
CodeCommande?: string;
quantitestock?: number;
 DetailCommande : DetailCommande[];
}

interface mouvementchart {
  date?: Date;
  Quantite?: number;
}

@Component({
  selector: 'app-detailarticle',
  templateUrl: './detailarticle.component.html',
  styleUrls: ['./detailarticle.component.css']
})
export class DetailarticleComponent implements OnInit {
   dropdownList:any = [];
  selectedItems = [];
  dropdownSettings:IDropdownSettings= {};
  public idarticle:number=0
public listeIdArticle:number[]=[]
public ArticleRecette:Article[]=[]
public ArticleAccessoire:Article[]=[]
TypeArticleCode=new TypeArticleCode()
public  selecttype:boolean|any=true
  public id:number=0
  sub: any;
  public mouvements:mouvement[]=[]
  public mouvement:mouvement|any
  public TypeCommandeCode:TypeCommandeCode=new TypeCommandeCode
  public detailCommande:DetailCommande=new DetailCommande()
public detailCommandes:DetailCommande[]=[]
public detailCommandesMouvement:DetailCommande[]=[]
public detailCommandesOrg:DetailCommande[]=[]
public inventaire:number=0;
public purcentinventaire:number=0;
public addRecette=false;
public addAccessoire=false;
public commande:number=0;
public purcentcommande:number=0;
public Quantite:number=0
public maxpurcent:number=0;

public typecommande:string="VENT"
public commandes : Commande[]|any = [];
public commandesMouvement : Commande[]|any = [];
public commandesExpirer : Commande[]|any = [];
public commandesControle : Commande[]|any = [];
public commandesOrg : Commande[] = [];
public quantiteexpiration:number=0;
public dateexpiration:any;
public purcentexpirer:number=0;
public datedebut:string=format(new Date(),'yyyy-MM-dd')+"T00:00:00";
public MessageCode=new MessageCode();
public datefin:string=format(new Date(),'yyyy-MM-dd')+"T23:59:59";

  public Article:Article=new Article();
  public Message:Message[]=[];
  public MessageFormul:Message=new Message();
  public Accessoire:Message[]=[];
  public Recette:Message[]=[];
  constructor(public CommandeSvc:CommandeSvc,public router:Router, private MessageSvc:MessageSvc,
    public route:ActivatedRoute,private commandeSvc:CommandeSvc,private http: HttpClient,public g:Globals,private articleSvc:ArticleSvc) {
   }

  ngOnInit(): void {
 

    let x=1;
    this.g.showLoadingBlock(true);
    this.articleSvc.getArticles().subscribe(
    (res:any) => {
      let etatReponse = res["EtatReponse"];
      if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
      this.g.articlesOrg = res["articleVMs"];
      console.log(this.g.articlesOrg)
      for(let a of this.g.articlesOrg){
          a.PathImage = this.g.baseUrl + '/api/Article/showImageArticle?identifiant=' + a.Identifiant;
        }
        this.ArticleRecette= this.g.articlesOrg.filter(x=>x.LibelleTypeArticle==this.TypeArticleCode.Code_MP);
        this.ArticleAccessoire= this.g.articlesOrg.filter(x=>x.LibelleTypeArticle==this.TypeArticleCode.Code_EM);
        this.sub = this.route.params.subscribe(params => {
          //this.g.showLoadingBlock(true)
             if(params['id']!=null && params['id']!=0) {
              this.idarticle=params['id']
               this.Article=this.g.articlesOrg.filter(x=>x.Identifiant==params['id'])[0]


this.CommandeSvc.getDetailCommandesstockparam(params['id']).subscribe((res:any) => {
 let etatReponse = res["EtatReponse"];
      if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
         this.detailCommandes=res["detailCommandeVMs"]
               this.detailCommandes= this.detailCommandes.filter(x=>x.IdValiderPar!=null)

               this.detailCommandes.sort(function (a:any, b:any) {
                return new Date(a.DateExpiration).getTime() - new Date(b.DateExpiration).getTime();
              } );

var dtc:DetailCommande[]=this.detailCommandes.filter(x=>{
  return(new Date(x.DateExpiration).getTime()<=new Date(this.detailCommandes[0].DateExpiration).getTime())
}) 
this.quantiteexpiration=dtc.reduce((sum, current) => sum + current.Quantite, 0)-dtc.reduce((sum, current) => sum + current.QuantiteServi, 0)
this.dateexpiration=this.detailCommandes[0].DateExpiration


           
 this.inventaire=this.detailCommandes.reduce((sum, current) => sum + current.Quantite, 0)-this.detailCommandes.reduce((sum, current) => sum + current.QuantiteServi, 0)
this.maxpurcent=this.Article.QuantiteMin>0?this.Article.QuantiteMin*10:this.inventaire
this.maxpurcent=this.maxpurcent<this.inventaire?this.inventaire:this.maxpurcent
this.purcentinventaire= (this.inventaire*100/this.maxpurcent)|0
this.purcentinventaire = Math.min(100, Math.max(0, this.purcentinventaire));
this.purcentexpirer= (this.quantiteexpiration*100/this.maxpurcent)|0
this.purcentexpirer = Math.min(100, Math.max(0, this.purcentexpirer));
//console.log("max=",Math.max(0, this.purcentinventaire))
this.chargerCommandeControle()
this.chargerCommandes()
              }
})
this.MessageSvc.getMessagebyId(params['id']).subscribe((res:any) =>{
let etatReponse = res["EtatReponse"];
      if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
  this.Message=res["messageVMs"]
  this.Recette=this.Message.filter(x=>x.LibelleType==this.MessageCode.RECETTE) 
this.Accessoire=this.Message.filter(x=>x.LibelleType==this.MessageCode.ACCESSOIRE)
}
})


             //  this.Article.PathImage = this.g.baseUrl + '/api/Categorie/showImageCategorie?identifiant=' + params['id'];
             }
             else{
               
               this.id=0
             }})

      }else{
      Swal.fire({ text: etatReponse.Message , icon: 'error'});
      }
      this.g.showLoadingBlock(false);    
    }
    );

   
  }
onItemSelect(item: any) {
    console.log(item.item_id)
    if(this.selecttype){
 this.listeIdArticle=[]
  this.listeIdArticle.length=0
    }
    this.listeIdArticle.push(item.item_id)
  }
  onSelectAll(items: any) {
    items.forEach((x: number|any)=>
      this.listeIdArticle.push(x.item_id)
      )
  }
    onUnSelectAll() {
    this.listeIdArticle=[];
}
  onItemDeSelect(item: any) {
    const index: number = this.listeIdArticle.indexOf(item.item_id);
if (index !== -1) {
    this.listeIdArticle.splice(index, 1);
}
    console.log(this.listeIdArticle);
}
  async chargerCommandes(){
    var datedebut:string=format(this.addMonths(new Date(), -3),'yyyy-MM-dd')+"T00:00:00";
    console.log(datedebut)
    // this.g.showLoadingBlock(true);  
      this.commandeSvc.getMouvement(datedebut,this.datefin).subscribe(
         (res:any) => {
          let etatReponse = res["EtatReponse"];
          if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
           this.commandesMouvement.length = 0;
          this.commandesMouvement = [];
            var commandesOrg=res["commandeVMs"];
console.log("commandesOrg==",commandesOrg)
            this.commandesMouvement= commandesOrg.filter((x:any)=>
(x.CodeCommande==this.TypeCommandeCode.VENT || x.CodeCommande==this.TypeCommandeCode.ALLIMENTATION) && x.DetailCommandes.find((y:any)=>y.IdArticle==this.Article.Identifiant )
          )

           this.detailCommandesMouvement.length=0

            for (let i = 0; i < this.commandesMouvement.length; i++) {
          
                var x=this.commandesMouvement[i].DetailCommandes.filter((z:any)=>z.IdArticle==this.Article.Identifiant)

               if(x!=null){
                //this.mouvement = {};
                let mouvement = <mouvement>{ };
                console.log( "xx==",  mouvement)
                mouvement.Numero=this.commandesMouvement[i].Numero
              mouvement.DateCommande=this.commandesMouvement[i].DateCommande
               mouvement.LibelleLocalite=this.commandesMouvement[i].LibelleLocalite
                mouvement.CodeCommande=this.commandesMouvement[i].CodeCommande
               mouvement.quantitestock=0
               mouvement.DetailCommande=[]
                x.forEach((y:any)=>{
                let mouvement1 = <mouvement>{ };
                mouvement1=mouvement
                var detailCommandesMouvement:DetailCommande[]= []
                detailCommandesMouvement.push(y);
                mouvement1.DetailCommande=detailCommandesMouvement;
                this.mouvements.push( mouvement1)

                                 })
                
               }
               
            } 
           // console.log('res==',this.commandesOrg)
          //  this.refrechtable()
          }else{ 
            Swal.fire({ text: "commandeseance" , icon: 'error'});
          }
          this.g.showLoadingBlock(false);    
        }
      );
     
    }
setmodal(type:string){
 
  
     this.listeIdArticle .length=0
type=="Recette"?(this.addRecette=true,this.addAccessoire=false,this.selecttype=false):(this.addRecette=false,this.addAccessoire=true,this.selecttype=true);
this.showmodal()
}
showmodal(){
  this.chargerarticle()
}
chargerarticle(){
  
if(this.addRecette){

      this.dropdownList=[]; 				
      this.ArticleRecette.forEach(x=>{
     this.dropdownList.push({ item_id: x.Identifiant, item_text: x.Libelle })
               });
}
else{
  
     this.dropdownList=[]; 
							
               this.ArticleAccessoire.forEach(x=>{
             this.dropdownList.push({ item_id: x.Identifiant, item_text: x.Libelle })
               });
}

       this.listeIdArticle = [
     
    ];
      this.selectedItems = [
     
    ];
         this.dropdownSettings = {
      singleSelection:this.selecttype,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    setTimeout(() => {
      ($('#Recette-modal') as any).modal('show');
       this.onUnSelectAll()
    }, 500);
    


}

 addMonths(date:Date, months:number) {
      date.setMonth(date.getMonth() + months);
      return date;
    }
  async chargerCommandeControle(){
    //this.g.showLoadingBlock(true);  
    this.CommandeSvc.getCommandesNonControle().subscribe(
      (res:any) => {
        let etatReponse = res["EtatReponse"];
        // console.log(etatReponse.Code)       
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
             // this.type="CONTROLE";
          this.commandesOrg = res["commandeVMs"];
          this.commandesControle.length = 0;
          this.commandesControle = [];
          let detailcommandecontrole:DetailCommande[]=[];
          
          this.commandesOrg= this.commandesOrg.filter(x=>
            (x.CodeCommande==this.TypeCommandeCode.VENT || x.CodeCommande==this.TypeCommandeCode.ALLIMENTATION) && x.DetailCommandes.find(y=>y.IdArticle==this.Article.Identifiant)
          )

          detailcommandecontrole.length=0
            for (let i = 0; i < this.commandesOrg.length; i++) {
              if(this.commandesOrg[i].CodeCommande==this.typecommande){
                this.commandesControle.push(this.commandesOrg[i]);
               var x=this.commandesOrg[i].DetailCommandes.filter(x=>x.IdArticle==this.Article.Identifiant)
               if(x!=null){
                 x.forEach(y=>{
                  detailcommandecontrole.push(y)
                 })
                 
               }
               
              }
            
            }
            this.commande=detailcommandecontrole.reduce((sum, current) => sum + current.Quantite, 0)-this.detailCommandes.reduce((sum, current) => sum + current.QuantiteServi, 0)

              // this.commande=detailcommandecontrole[1].Quantite

              this.purcentcommande= (this.commande*100/this.maxpurcent)|0
              this.purcentcommande = Math.min(100, Math.max(0, this.purcentcommande));
            
          
         //   this.refrechtable()
           // this.g.typecommande="COMMANDENONCONTROLER"
//console.log(this.commandes)
        }else{ 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        //this.g.showLoadingBlock(false);    
      }
    );

    
  }
  valider(){
  
      if(this.listeIdArticle.length!=0){
        for(let id of this.listeIdArticle){
          console.log(id+"  "+this.listeIdArticle)
 let _Message =new Message()
      _Message.IdArticleSrc= id
      _Message.IdTypeMessage=this.addRecette?1:2
      _Message.IdArticle=this.idarticle
      _Message.Quantite=this.Quantite
       this.addMessage(_Message)
        }

         var datatable = $('#datatableexample2').DataTable();
              //datatable reloading 
                datatable.destroy();

       ($('#Recette-modal') as any).modal('hide');
      }
     

      else{
         Swal.fire({ text: "liste article Vide" , icon: 'error'});
      }
     
     
   
  }
  remove(index:number){

  }
  addMessage(_message:Message){
this.MessageSvc.ajouterMessage(_message).subscribe(
      (res:any) => {
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
_message.Identifiant=res["idMessage"];
_message.LibelleArticle=this.g.articlesOrg.filter(x=>x.Identifiant==_message.IdArticleSrc)[0].Libelle
this.addRecette?this.Recette.push(_message):this.Accessoire.push(_message)
        }
      else{ 
          Swal.fire({ text: "erreur back" , icon: 'error'});
        }
      });
  }
  async chargerCommandeexpirer(){

    //this.g.showLoadingBlock(true);  
 
    this.CommandeSvc.getCommandesNonControle().subscribe(
      (res:any) => {
        let etatReponse = res["EtatReponse"];
        // console.log(etatReponse.Code)
        
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
             // this.type="CONTROLE";

          this.commandesOrg = res["commandeVMs"];
         

          this.commandesExpirer.length = 0;
          this.commandesExpirer = [];
          let detailcommandecontrole:DetailCommande[]=[];
          
          this.commandesOrg=this.commandesOrg.filter(x=>
            (x.CodeCommande==this.TypeCommandeCode.VENT || x.CodeCommande==this.TypeCommandeCode.ALLIMENTATION) &&  x.DetailCommandes.find(y=>y.IdArticle==this.Article.Identifiant)
          )
          detailcommandecontrole.length=0
            for (let i = 0; i < this.commandesOrg.length; i++) {
              if(this.commandesOrg[i].CodeCommande==this.typecommande){
                this.commandesExpirer.push(this.commandesOrg[i]);
               var x=this.commandesOrg[i].DetailCommandes.filter(x=>x.IdArticle==this.Article.Identifiant)
               if(x!=null){
                   x.forEach(y=>{
                  detailcommandecontrole.push(y)
                 })
                 
               }
               
              }
            
            }
          
            this.commande=detailcommandecontrole.reduce((sum, current) => sum + current.Quantite, 0)-this.detailCommandes.reduce((sum, current) => sum + current.QuantiteServi, 0)

              // this.commande=detailcommandecontrole[1].Quantite

              this.purcentcommande= (this.commande*100/this.maxpurcent)|0
              this.purcentcommande = Math.min(100, Math.max(0, this.purcentcommande));
            debugger
            console.log("this.commandesOrg==",this.commandesOrg)
         //   this.refrechtable()
           // this.g.typecommande="COMMANDENONCONTROLER"
//console.log(this.commandes)
        }else{ 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        //this.g.showLoadingBlock(false);    
      }
    );

    
  }

}
