import { Component,OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { Globals } from '../globals';
import { SeanceSvc } from '../services/seanceSvc';
import { UtilisateurSvc } from '../services/utilisateurSvc';
import { Seance } from '../entities/Seance';
import { GroupeCode } from '../entities/GroupeCode';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-ouvertureseance',
  templateUrl: './ouvertureSeance.html',
  styleUrls: []
})
export class OuvertureSeanceComponent implements OnInit {
  

	public GroupeCode : GroupeCode = new GroupeCode();
  isSeanceExist : boolean = false;
  seance : Seance  = new Seance();

constructor(private g: Globals,public utilisateurSvc:UtilisateurSvc,private seanceSvc:SeanceSvc,private router: Router) {
		this.getSeanceActive();
  }

  ngOnInit() {
  	
  }

  getSeanceActive(){
    this.seanceSvc.getSeanceActive().subscribe(
      (res:any) => {
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
          this.seance = res["seanceVM"];
          if(this.seance != null){
            this.router.navigate(['home']);
          }else{
			  this.seance = new Seance();
		  }
        }else{ 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        this.g.showLoadingBlock(false);    
      }
    );
  }

  ouvrirSeance(){


  if(this.seance.MontantDebut >= 0) {
      
      this.g.showLoadingBlock(true);
      this.seanceSvc.ouvrirSeance(this.seance).subscribe(
      (res:any) => {
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
          this.getSeanceActive();
        }else{ 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        this.g.showLoadingBlock(false);    
      }
    );
    }

  }


  


}
