import { Component, OnInit } from '@angular/core';
import { Router,NavigationStart,NavigationEnd,NavigationError,RoutesRecognized } from '@angular/router';
import { Globals } from '../../globals';
import { Article } from 'src/app/entities/Article';
import { Categorie } from 'src/app/entities/Categorie';
import { ArticleSvc } from 'src/app/services/articleSvc';
import { CategorieSvc } from 'src/app/services/categorieSvc';
import { Projet } from 'src/app/entities/Projet';
import { ProjetSvc } from 'src/app/services/projetSvc';
import {Subscription} from 'rxjs'
import { Rxjs } from '../../services/rxjs';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
public projets : Projet[] = [];
public projetsOrg : Projet[] = [];
  constructor(public ProjetSvc:ProjetSvc,public CategorieSvc:CategorieSvc,public sharedService:Rxjs, public g: Globals,public articleSvc:ArticleSvc,private router: Router) { }

  ngOnInit(): void {
this.g.title="Liste/Projet"
    this.chargerProjet()
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

async update(idprojet:any){
  await this.g.settype("projet")
 this.router.navigate(['/forms/'+idprojet]);}


async chargerCategorie(){

   //this.g.showLoadingBlock(true);  
   await this.CategorieSvc.getCategories().subscribe(
       (res:any) => {
        let etatReponse = res["EtatReponse"];

        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
              console.log("resultat==",res["categorieVMs"])

          //this.categories = res["categorieVMs"];
          //this.categoriesOrg=res["categorieVMs"];
           this.refrechtable()

         
        }else{ 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        //this.g.showLoadingBlock(false);    
      }
    );
  // return this.categories
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
}
