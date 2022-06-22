import { Component,OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { Globals } from '../globals';
import { SeanceSvc } from '../services/seanceSvc';
import { ReglementSvc } from '../services/reglementSvc';
import { Seance } from '../entities/Seance';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-clotureseance',
  templateUrl: './clotureSeance.html',
  styleUrls: []
})
export class ClotureSeanceComponent implements OnInit {

  public montantDebut : number = 0;
  public montantSeance : number = 0;
  public montantTotal : number = 0;
  

constructor(public g: Globals,private seanceSvc:SeanceSvc,private reglementSvc:ReglementSvc,private router: Router) {
		
  }

  ngOnInit() {
	  this.getMontantTotalReglementForSeance();
  }
  
  getMontantTotalReglementForSeance(){
	  this.g.showLoadingBlock(true);
	  this.reglementSvc.getMontantTotalReglementForSeance(this.g.seance!.Identifiant).subscribe(
		  (res:any) => {
			let etatReponse = res["EtatReponse"];
			if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
			  this.montantDebut = res["montantDebut"];
			  this.montantSeance = res["montantSeance"];
			  this.montantTotal = res["montantTotal"];
			  this.g.seance!.MontantFin = this.montantTotal;
			  
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
