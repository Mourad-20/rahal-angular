import { Component, OnInit } from '@angular/core';
import { Router,NavigationStart,NavigationEnd,NavigationError,RoutesRecognized } from '@angular/router';
import { Globals } from '../../globals';
import { Utilisateur } from '../../entities/Utilisateur';
import { GroupeCode } from '../../entities/GroupeCode';
import { UtilisateurSvc } from '../../services/utilisateurSvc';

import {Subscription} from 'rxjs'
import { Rxjs } from '../../services/rxjs';
import Swal from 'sweetalert2'
import * as $AB from 'jquery';
import{format} from 'date-fns'

import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit {
public utilisateurs : Utilisateur[] = [];
public utilisateursOrg : Utilisateur[] = [];

  constructor(public sharedService:Rxjs, public g: Globals,public utilisateurSvc:UtilisateurSvc,private router: Router) {
    //this.chargerUtilisateurs()
      
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

async update(idutilisateur:any){
  await this.g.settype("utilisateur")
 this.router.navigate(['/forms/'+idutilisateur]);}


async chargerUtilisateurs(){

   //this.g.showLoadingBlock(true);  
   await this.utilisateurSvc.getListeUtilisateurs().subscribe(
       (res:any) => {
        let etatReponse = res["EtatReponse"];

        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
              console.log("resultat==",res["utilisateurVMs"])

          this.utilisateurs = res["utilisateurVMs"];
          this.utilisateursOrg=res["utilisateurVMs"];
           this.refrechtable()

         
        }else{ 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        //this.g.showLoadingBlock(false);    
      }
    );
   return this.utilisateurs
  }

  ngOnInit(): void {
this.g.title="Liste/Utilisateurs"

this.chargerUtilisateurs()
} 

}
