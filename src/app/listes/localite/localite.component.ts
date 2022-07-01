

import { Component, OnInit } from '@angular/core';
import { Router,NavigationStart,NavigationEnd,NavigationError,RoutesRecognized } from '@angular/router';
import { Globals } from '../../globals';
import { Article } from 'src/app/entities/Article';
import { ArticleSvc } from 'src/app/services/articleSvc';
import { LocaliteSvc } from 'src/app/services/localiteSvc';
import { Localite } from 'src/app/entities/Localite';
import { LocaliteCode } from 'src/app/entities/LocaliteCode';
import {Subscription} from 'rxjs'
import { Rxjs } from '../../services/rxjs';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-localite',
  templateUrl: './localite.component.html',
  styleUrls: ['./localite.component.css']
})
export class ListeLocaliteComponent implements OnInit {
public LocaliteCode=new LocaliteCode()
public localites : Localite[] = [];
public localitesOrg : Localite[] = [];
 constructor(public LocaliteSvc:LocaliteSvc, public sharedService:Rxjs, public g: Globals,public articleSvc:ArticleSvc,private router: Router) { }


  ngOnInit(): void {
      this.chargerArticle()
    this.g.title="Liste/Clients"
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

async update(idlocalite:any){
  await this.g.settype("localite")
 this.router.navigate(['/forms/'+idlocalite]);}


async chargerArticle(){

   //this.g.showLoadingBlock(true);  
   await this.LocaliteSvc.getLocalites().subscribe(
       (res:any) => {
        let etatReponse = res["EtatReponse"];
console.log("res",res["localiteVMs"])
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
             
this.localitesOrg=res["localiteVMs"];
          //this.localites = res["localiteVMs"];
          this.localites=this.localitesOrg.filter(x=>x.Code!=this.LocaliteCode.EMPORTER)
          
           this.refrechtable()
         
        }else{ 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        //this.g.showLoadingBlock(false);    
      }
    );
   return this.localites
  }
}










