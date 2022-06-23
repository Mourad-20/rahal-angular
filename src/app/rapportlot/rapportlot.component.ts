import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from '../globals';
import { ActivatedRoute } from '@angular/router'
import Swal from 'sweetalert2'
import { CaisseSvc } from 'src/app/services/caisseSvc';
import { DetailCommande } from '../entities/DetailCommande';
import{CommandeSvc}from '../services/commandeSvc';
import { LotSvc } from '../services/lotSvc';
import { Lot } from '../entities/Lot';
import { UtilisateurSvc } from '../services/utilisateurSvc';
import { Utilisateur } from '../entities/Utilisateur';
import { tap } from 'rxjs/operators';
import { map } from 'jquery';
import { ReglementSvc } from '../services/reglementSvc';
import { Reglement } from '../entities/Reglement';

class Rapport {
  nCommande : number = 0;
  dateValidation : string = "";
  montantDeclarer : number = 0;
  montantRestant :  number = 0;
  validerPar : string = "";
  modeRegelement : string = "";
  dateRegelement : string = "";
  montantRegelement : string = "";
}

@Component({
  selector: 'app-rapportlot',
  templateUrl: './rapportlot.component.html',
  styleUrls: ['./rapportlot.component.css']
})
export class RapportlotComponent implements OnInit {

  public rapport = new Rapport();
  public lot : Lot = new Lot();
  public dtOptions: any = {};
  
  constructor(	private utilisateurSvc:UtilisateurSvc,
    public CaisseSvc:CaisseSvc,
    public reglement: ReglementSvc,
    public CommandeSvc:CommandeSvc,
    public router:Router,
    public route:ActivatedRoute,
    private lotSvc:LotSvc,
    public g:Globals) {
    }

  ngOnInit(): void {
      
    let id = this.route.snapshot.paramMap.get('idlot')

    this.g.title=""
    this.dtOptions = {
      processing: true,
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
                               
                console.log(res['detailCommandeVMs']);
                let detail : DetailCommande = res['detailCommandeVMs'][0];
                this.rapport.nCommande = detail.IdCommande;
                this.rapport.dateValidation = detail.DateValidation;
                // this.rapport.montantDeclarer = detail.MontantDeclaration;
                this.rapport.montantRestant = detail.Montant;

                this.utilisateurSvc.getListeUtilisateurs().subscribe(
                  res => {
                    let user : Array<Utilisateur> = res['utilisateurVMs'];
                    this.rapport.validerPar = user.find(e => e.Identifiant == detail.IdValiderPar)?.Nom + ' ' + user.find(e => e.Identifiant == detail.IdValiderPar)?.Prenom;
                  }
                )

                this.reglement.getReglementsByIdCommande(detail.IdCommande).subscribe(
                  res => {
                    console.log(res);
                    let reg : Reglement = res['reglementVMs'][0];
                    
                    this.rapport.dateRegelement = reg.DateReglement;
                    this.rapport.modeRegelement = reg.LibelleModeReglement;
                    this.rapport.montantDeclarer = reg.Montant;
                    console.log(this.rapport);
                    this.g.showLoadingBlock(false);   
                  }
                )
                
              }
              
            }
          );
        } else { 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        this.g.showLoadingBlock(false);    
      }
    );
  }

}
