import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { Globals } from '../../globals';
import { SeanceSvc } from '../../services/seanceSvc';
import { ReglementSvc } from '../../services/reglementSvc';
import { Seance } from '../../entities/Seance';
import { GroupeCode } from '../../entities/GroupeCode';
import { UtilisateurSvc } from '../../services/utilisateurSvc';


import Swal from 'sweetalert2';
@Component({
  selector: 'app-fermeture-seance',
  templateUrl: './fermeture-seance.component.html',
  styleUrls: ['./fermeture-seance.component.css']
})
export class FermetureSeanceComponent implements OnInit {
  public GroupeCode : GroupeCode = new GroupeCode();
  public montantDebut : number = 0;
  public montantSeance : number = 0;
  public montantTotal : number = 0;
  public calcVal:string="0"
  //  isSeanceExist : boolean = false;
  seance : Seance  = new Seance();
constructor(public g: Globals,public utilisateurSvc:UtilisateurSvc,private seanceSvc:SeanceSvc,private reglementSvc:ReglementSvc,private router: Router) {

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
    this.parstotal()
  }

  async resetCalculator(){
   this.calcVal = "0";
   this.parstotal()
  }
  parstotal(){
  this.g.seance!.MontantFin =+this.calcVal  
  }
   getSeanceActive(){
    this.seanceSvc.getSeanceActive().subscribe(
      (res:any) => {
         console.log("caisse==",this.seance)
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
          this.seance = res["seanceVM"];
          if(this.seance == null || this.seance.Identifiant==undefined){
       this.router.navigate(['caisse']);
          }else{
            console.log("ok")
			  //this.seance = new Seance();
		  }
        }else{ 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        this.g.showLoadingBlock(false);    
      }
    );
  }
  ngOnInit(): void {
    	this.getSeanceActive();
    	  this.getMontantTotalReglementForSeance();
        	
  }
 getMontantTotalReglementForSeance(){
	  this.g.showLoadingBlock(true);
    //console.log(this.g.seance)
	  this.reglementSvc.getMontantTotalReglementForSeance(this.g.seance!.Identifiant).subscribe(
		  (res:any) => {
			let etatReponse = res["EtatReponse"];
			if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
			  this.montantDebut = res["montantDebut"];
			  this.montantSeance = res["montantSeance"];
			  this.montantTotal = res["montantTotal"];
			  this.g.seance!.MontantFin = this.montantTotal;
        this.calcVal=this.montantTotal.toString()
			  
			}else{
			  Swal.fire({ text: etatReponse.Message , icon: 'error'});
			}
			this.g.showLoadingBlock(false);    
		  }
		);
  }
    cloturerSeance(){
	  this.g.showLoadingBlock(true);
	  this.seanceSvc.fermerSeance(this.g.seance).subscribe(
			  (res:any) => {
          console.log("ok")
				let etatReponse = res["EtatReponse"];
				if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
				  
				  this.router.navigate(['home']);
				}else{
				  Swal.fire({ text: etatReponse.Message , icon: 'error'});
				}
				this.g.showLoadingBlock(false);    
			  }
			);
	  
  }
}
