import { Component, OnInit } from '@angular/core';
import { Router,NavigationStart,NavigationEnd,NavigationError,RoutesRecognized } from '@angular/router';
import { Globals } from '../../globals';



import { Utilisateur } from '../../entities/Utilisateur';
import { DetailCommande } from '../../entities/DetailCommande';
import { Seance } from '../../entities/Seance';
import { GroupeCode } from '../../entities/GroupeCode';
import { CommandeSvc } from '../../services/commandeSvc';
import { SeanceSvc } from '../../services/seanceSvc';
import Swal from 'sweetalert2'
import * as $AB from 'jquery';
import{format} from 'date-fns'
import { ActivatedRoute } from '@angular/router'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { async } from '@angular/core/testing';
@Component({
  selector: 'app-articlerapport',
  templateUrl: './articlerapport.component.html',
  styleUrls: ['./articlerapport.component.css']
})
export class ArticlerapportComponent implements OnInit {
public detailsCommande : DetailCommande[] = [];
public datedebut:string=format(new Date(),'yyyy-MM-dd')+"T00:00:00";
public datefin:string=format(new Date(),'yyyy-MM-dd')+"T23:59:59";
  constructor(public route:ActivatedRoute, public g: Globals,private commandeSvc:CommandeSvc,private router: Router,private seanceSvc:SeanceSvc) 
 { }

  ngOnInit(): void {
  }
  async refrechtable(){
  var datatable = $('#datatableexample').DataTable();
              //datatable reloading 
    datatable.destroy();


setTimeout(()=>{  
        
     $('#datatableexample').DataTable( {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      lengthMenu : [5, 10, 25]
  } ); 
  }, 100);

}

 async chargerdetailCommandes(){

   //this.g.showLoadingBlock(true);  
   await this.commandeSvc.getRecapArticles(this.datedebut,this.datefin).subscribe(
       (res:any) => {
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
             

          this.detailsCommande = res["detailCommandeDMs"];
         
           this.refrechtable()

         
        }else{ 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        //this.g.showLoadingBlock(false);    
      }
    );
   
  }

}
