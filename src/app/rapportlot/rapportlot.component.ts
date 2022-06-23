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

@Component({
  selector: 'app-rapportlot',
  templateUrl: './rapportlot.component.html',
  styleUrls: ['./rapportlot.component.css']
})
export class RapportlotComponent implements OnInit {

  public items : DetailCommande[] = [];
  public detailCommandes:DetailCommande[]=[];
  public lot : Lot = new Lot();
  public dtOptions: any = {};
  
  constructor(public CaisseSvc:CaisseSvc,
    public CommandeSvc:CommandeSvc,
    public router:Router,
    public route:ActivatedRoute,
    private lotSvc:LotSvc,
    public g:Globals) {}


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
                this.detailCommandes=res["detailCommandeVMs"]
                this.detailCommandes= this.detailCommandes.filter(x=>x.IdValiderPar!=null)
                this.detailCommandes.sort(
                  function (a:any, b:any) {
                    return new Date(a.DateExpiration).getTime() - new Date(b.DateExpiration).getTime();
                  }
                );

                this.detailCommandes.sort(
                  function (a:any, b:any) {
                  return new Date(a.DateExpiration).getTime() - new Date(b.DateExpiration).getTime();
                  } 
                );

                for(let a of this.detailCommandes){
                  a.PathImageArticle = this.g.baseUrl + '/api/Article/showImageArticle?identifiant=' + a.Identifiant;
                }

                this.items = this.detailCommandes;       
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
