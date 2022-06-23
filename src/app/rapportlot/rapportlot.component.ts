import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Routes, Router } from '@angular/router';
import { Article } from '../entities/Article';
import { Globals } from '../globals';
import { ActivatedRoute } from '@angular/router'
import Swal from 'sweetalert2'
import { Caisse } from 'src/app/entities/Caisse';
import { CaisseSvc } from 'src/app/services/caisseSvc';
import { ArticleSvc } from '../services/articleSvc';
//import{JwPaginationComponent}from '../components/pagination/jw-pagination .composant'
import { DetailCommande } from '../entities/DetailCommande';
import{CommandeSvc}from '../services/commandeSvc';
import{Commande}from '../entities/Commande';
import{TypeCommandeCode}from '../entities/TypeCommandeCode';
import { ViewChild } from '@angular/core'
import { LotSvc } from '../services/lotSvc';
import { Lot } from '../entities/Lot';
interface Rapport {
  IdStock?: number;
Libelle?: string;
Quantite?: number;
repture?: number;
expirer?: number;
}
@Component({
  selector: 'app-rapportlot',
  templateUrl: './rapportlot.component.html',
  styleUrls: ['./rapportlot.component.css']
})
export class RapportlotComponent implements OnInit {

  public items : DetailCommande[] = [];
  public detailCommandes:DetailCommande[]=[]
  public caisses : Caisse[] = [];
  public articles : Article[] = [];
  public articlesOrg : Article[] = [];

  public lot : Lot = new Lot();

  public inventaire : Article[]|any = [];
  public repture : Article[] = [];
  public dtOptions: any = {};
  public caissesOrg : Caisse[] = [];
  public idstock:number|any
  public Rapport:Rapport[]=[]
  public Rapportfilter:Rapport[]=[]
  pageSize=5
  public pageOfItems: Array<any>|any;
  
  constructor(public CaisseSvc:CaisseSvc,
    public CommandeSvc:CommandeSvc,
    public router:Router,
    public route:ActivatedRoute,
    private commandeSvc:CommandeSvc,
    private lotSvc:LotSvc,
    private http: HttpClient,
    public g:Globals,
    private articleSvc:ArticleSvc) { 
    }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('idlot')

    this.g.title=""
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      lengthMenu : [5, 10, 25],
      dom: 'Blfrtip',
      buttons: [
        'copy',
        'print',
        'excel'
      ]
    };
    this.g.showLoadingBlock(true);

    this.lotSvc.getlots().subscribe(
      (res:any) => {
        let etatReponse = res["EtatReponse"];

        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {

          Object.keys(res["lotVMs"]).forEach(
            e => {
              if(res['lotVMs'][e].Identifiant == id){
                this.lot = res['lotVMs'][e]
                this.lot.Etat = "Vendu";
              }
            }
          );  

          console.log(this.lot);

          this.CommandeSvc.getDetailCommandesstockparam(this.lot.Identifiant).subscribe(
            (res:any) => {
              let etatReponse = res["EtatReponse"];
              console.log(res);
              
              if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
                this.chargerCaisse();
                this.detailCommandes=res["detailCommandeVMs"]
                this.detailCommandes= this.detailCommandes.filter(x=>x.IdValiderPar!=null)
                this.detailCommandes.sort(
                  function (a:any, b:any) {
                    return new Date(a.DateExpiration).getTime() - new Date(b.DateExpiration).getTime();
                  }
                );

                this.detailCommandes.sort(
                  function (a:any, b:any) {
                  return new Date(a.DateExpiration).getTime() - new Date(b.DateExpiration).getTime();
                  } 
                );

                for(let a of this.detailCommandes){
                  a.PathImageArticle = this.g.baseUrl + '/api/Article/showImageArticle?identifiant=' + a.Identifiant;
                }

                this.items = this.detailCommandes;

                setTimeout(() => {
                  this.caisses.forEach(
                    (y:any) => {
                      let rapport = <Rapport>{ };
                      rapport.IdStock=y.Identifiant
                      rapport.Libelle=y.Libelle
                      rapport.Quantite=this.getinventaire(y.Identifiant)
                      rapport.expirer=new Date(this.detailCommandes[0].DateExpiration).getTime()
                      this.Rapport.push( rapport)
                      this.Rapportfilter.push( rapport)
                    }
                  )
                    
                }, 1000);          
              }
            }
          );

        } else { 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        this.g.showLoadingBlock(false);    
      }
    );

    // this.chargerArticle()
  }

  setid(idstock:number|any){
    this.idstock=idstock
    this.rechargerapport(idstock)
    this.chargerArticleStock(idstock)
  }

  rechargerapport(idstock:number|any){
    this.Rapportfilter=this.Rapport.filter(x=>x);
      (idstock!=null|| idstock!=0)?this.Rapportfilter=this.Rapport.filter(x=>x.IdStock==idstock):false;
    }
    async refrechtable(id:string){
      var datatable = $(id).DataTable();
      datatable.destroy();
      setTimeout(() => {
      $(id).DataTable( 
        this.dtOptions
      );
    }, 100); 
  }


  onChangePage(pageOfItems: Array<any>) {
    this.g.showLoadingBlock(true);
    this.pageOfItems = pageOfItems;
    this.g.showLoadingBlock(false);
  }

  async chargerArticle(){
    await this.articleSvc.getArticles().subscribe(
      (res:any) => {
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
            this.articles = res["articleVMs"];
            this.articles.forEach(
              (y:Article)=>{
                if(this.detailCommandes.filter(dc=>dc.IdArticle==y.Identifiant).length!=0)
                {
                  var article=y
                  var dtcfiltre=this.detailCommandes.filter(dc=>dc.IdArticle==y.Identifiant) 
      
                  article.QuantiteDisponible=dtcfiltre.reduce((sum, current) => sum + current.Quantite, 0)-dtcfiltre.reduce((sum, current) => sum + current.QuantiteServi, 0)
                  article.QuantiteDisponible!=0?this.inventaire.push(article): this.repture.push(article)
            
                }
                else{
                  this.repture.push(y)
                }
              }
            );
            this.refrechtable('#datatableexample2')
            this.refrechtable('#datatableexample')
        } else { 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
      }
    );

    return this.articles
  }

  async chargerArticleStock(idstock:number|null){
    this.inventaire=[]
    this.articles.forEach(
      (y:Article) => {
        if(this.detailCommandes.filter(dc=>dc.IdArticle==y.Identifiant && dc.IdCaisse==idstock).length!=0 )
        {
          var article:any=y
          var dtcfiltre=this.detailCommandes.filter(dc=>dc.IdArticle==y.Identifiant  && dc.IdCaisse==idstock) 
          article.QuantiteDisponible=dtcfiltre.reduce((sum, current) => sum + current.Quantite, 0)-dtcfiltre.reduce((sum, current) => sum + current.QuantiteServi, 0)
          article["detailCommandes"]=dtcfiltre;
          article.QuantiteDisponible!=0?this.inventaire.push(article):false
        }
      }
    );
          
  }

  change(){
    this.pageSize=10
  }

  async chargerCaisse(){
    //this.g.showLoadingBlock(true);  
    await this.CaisseSvc.getCaisse().subscribe(
        (res:any) => {
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
        
          this.caisses = res["caisseVMs"];
          //this.caissesOrg=res["caisseVMs"];
        
        }else{ 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
    
      }
    );
  }

 getinventaire(idstock:number){
  var dtcfiltre=this.detailCommandes.filter(dc=>dc.IdCaisse==idstock)
  return this.groupBy(dtcfiltre)
 }

  groupBy1 = function(dtcfiltre:DetailCommande[]) {
    return dtcfiltre.reduce(
      (rv:any, x:any) =>{
        (rv[x['IdArticle']] = rv[x['IdArticle']] || []).push(x);
        return rv;
      }, {}
    );
  };

  groupBy = function(dtcfiltre:DetailCommande[]) {
    var count=0
    dtcfiltre.reduce(
      (rv:any, x:any) => {
        var name = x.IdArticle;
        if (rv ==null || !rv.hasOwnProperty(name)) {
          rv[name] = 0;
          count++
        }
        return rv;
      }, {}
    );
    return count
  };
}
