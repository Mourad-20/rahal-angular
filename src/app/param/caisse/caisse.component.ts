import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { Globals } from '../../globals';
import { CaisseSvc } from '../../services/caisseSvc';
import { CommercialisationSvc } from '../../services/commercialisationSvc';
import { AffectationCaisseSvc } from '../../services/affectationCaisseSvc';
import { Caisse } from '../../entities/Caisse';
import { Commercialisation } from '../../entities/Commercialisation';
import { AffectationCaisse } from '../../entities/AffectationCaisse';
import { Seance } from '../../entities/Seance';
import { ActeurSeance } from '../../entities/ActeurSeance';
import { SeanceSvc } from '../../services/seanceSvc';
import { ActeurSeanceSvc } from '../../services/acteurSeanceSvc';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-caisse',
  templateUrl: './caisse.component.html',
  styleUrls: ['./caisse.component.css']
})
export class CaisseparamComponent implements OnInit {

public idxOne : number = -1;
public caisseVMs : Caisse[] = [];
public caisse : Caisse = new Caisse();
public commercialisationVMs : Commercialisation[] = [];
public affectationCaisseVMs : AffectationCaisse[] = [];
public acteurSeanceVMs : ActeurSeance[] = [];
  public checked:boolean=true;
constructor(public g: Globals,private caisseSvc:CaisseSvc,private commercialisationSvc:CommercialisationSvc,
private affectationCaisseSvc:AffectationCaisseSvc,
private seanceSvc:SeanceSvc,private acteurSeanceSvc:ActeurSeanceSvc,
private router: Router) {
	
}

  ngOnInit(): void {
	  if(this.g.typecaisseparam=="commercialisation"){
  this.getCommercialisations();
	  }
	  else if(this.g.typecaisseparam=="affectation"){
this.getAffectationCaisses()
	  }
	   else if(this.g.typecaisseparam=="presence"){
this.getInfoSeance();
	  this.getActeurSeances();	  }
  
  }
validerCommercialisation(){
	  this.g.showLoadingBlock(true);
	  if(this.commercialisationVMs.length > 0){
console.log(this.commercialisationVMs)
		 this.commercialisationSvc.validerCommercialisation(this.commercialisationVMs).subscribe(
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
  }
  getInfoSeance(){
	  this.seanceSvc.getSeanceActive().subscribe(
		  (res:any) => {
			let etatReponse = res["EtatReponse"];
			if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
			  this.g.seance = res["seanceVM"];
			  //console.log(this.g.seance);
			}else{ 
			  Swal.fire({ text: etatReponse.Message , icon: 'error'});
			}
			this.g.showLoadingBlock(false);    
		  }
		);
  }
   getActeurSeances(){
	  this.acteurSeanceSvc.getActeurSeances().subscribe(
		(res:any) => {
		  let etatReponse = res["EtatReponse"];
		  if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
			this.acteurSeanceVMs = res["acteurSeanceVMs"];
		  }else{
			Swal.fire({ text: etatReponse.Message , icon: 'error'});
		  }
		  this.g.showLoadingBlock(false);    
		}
	  );
  }
  validerPresence(){
	  this.g.showLoadingBlock(true);
      this.acteurSeanceSvc.validerPresence(this.acteurSeanceVMs).subscribe(
      (res:any) => {
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
			this.getActeurSeances();
			this.router.navigate(['home']);
          Swal.fire({ text: etatReponse.Message , icon: 'success'});
        }else{ 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        this.g.showLoadingBlock(false);    
      }
    );
  }
  
  getCommercialisations(IdCaisse: number=this.g.IdCaisseparam){
	  this.commercialisationSvc.getCommercialisations(IdCaisse).subscribe(
			(response:any) => {
			  let etatReponse = response["EtatReponse"];
			  if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
				this.commercialisationVMs = response["commercialisationVMs"];
			  }else{
				Swal.fire({ text: etatReponse.Message , icon: 'error'});
			  }    
			}
		  );
  }
  check(i:number|any){
	  if(this.g.typecaisseparam=="commercialisation"){
 this.commercialisationVMs[i].Coche=!this.commercialisationVMs[i].Coche	  }
	  else if(this.g.typecaisseparam=="affectation"){
	  this.affectationCaisseVMs[i].Coche=! this.affectationCaisseVMs[i].Coche	  }
	 	  else if(this.g.typecaisseparam=="presence"){
	  this.acteurSeanceVMs[i].Presence=! this.acteurSeanceVMs[i].Presence	  }

  }

  	getAffectationCaisses(IdCaisse: number=this.g.IdCaisseparam){
	  //alert('Le personnel de type CAISSIER doit etre libre d autre caisse');
	  this.affectationCaisseSvc.getAffectationCaisses(IdCaisse).subscribe(
			(response:any) => {
			  let etatReponse = response["EtatReponse"];
			  if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
				this.affectationCaisseVMs = response["affectationCaisseVMs"];
			  }else{
				Swal.fire({ text: etatReponse.Message , icon: 'error'});
			  }    
			}
		  );
  }
  
  validerAffectationCaisse(){
	  this.g.showLoadingBlock(true);
	  if(this.affectationCaisseVMs.length > 0){
		this.affectationCaisseSvc.validerAffectationCaisse(this.affectationCaisseVMs).subscribe(
		  (res:any) => {
			let etatReponse = res["EtatReponse"];
			if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
				Swal.fire({ text: etatReponse.Message , icon: 'success'});
				($('#affectationCaisseModal') as any).modal('hide');
			}else{ 
			  Swal.fire({ text: etatReponse.Message , icon: 'error'});
			}
			this.g.showLoadingBlock(false);    
		  }
		);
			
	  }
  }
  valider(){
	  if(this.g.typecaisseparam=="commercialisation"){
  this.validerCommercialisation();
	  }
	  else if(this.g.typecaisseparam=="affectation"){
this.validerAffectationCaisse()
	  } 
	  	   else if(this.g.typecaisseparam=="presence"){
this.getInfoSeance();
	  this.validerPresence();	  }
  }
}
