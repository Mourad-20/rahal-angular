import { Component, OnInit } from '@angular/core';
import { Router,NavigationStart,NavigationEnd,NavigationError,RoutesRecognized } from '@angular/router';
import { Globals } from '../../globals';
import { Article } from 'src/app/entities/Article';
import { ArticleSvc } from 'src/app/services/articleSvc';


import {Subscription} from 'rxjs'
import { Rxjs } from '../../services/rxjs';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
public articles : Article[] = [];
public articlesOrg : Article[] = [];

  constructor(public sharedService:Rxjs, public g: Globals,public articleSvc:ArticleSvc,private router: Router) { }

  ngOnInit(): void {
this.g.title="Liste/Articles"
    this.chargerArticle()
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
async param(_article:Article|any,param:string|any){
  await this.g.setparamcaisse(_article.Identifiant,_article.Libelle,param)
  //this.g.settype("caisse")
 this.router.navigate(['/articleparam']);}
 
async update(idarticle:any){
  await this.g.settype("article")
 this.router.navigate(['/forms/'+idarticle]);}


async chargerArticle(){

   //this.g.showLoadingBlock(true);  
   await this.articleSvc.getArticles().subscribe(
       (res:any) => {
        let etatReponse = res["EtatReponse"];

        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
              console.log("resultat==",res["articleVMs"])

          this.articles = res["articleVMs"];
          this.articlesOrg=res["articleVMs"];
           this.refrechtable()

         
        }else{ 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        //this.g.showLoadingBlock(false);    
      }
    );
   return this.articles
  }
}
