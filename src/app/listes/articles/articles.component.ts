import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from '../../globals';
import { Lot } from 'src/app/entities/Lot';
import { LotSvc } from 'src/app/services/lotSvc';
import { Rxjs } from '../../services/rxjs';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  public lots : Lot[] = [];
  public lotsOrg : Lot[] = [];

  constructor(public sharedService:Rxjs, public g: Globals,public lotSvc:LotSvc,private router: Router) { }

  ngOnInit(): void {
    this.g.title="Liste/Lots"
    this.chargerLot()
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

/* async param(_lot:Lot|any,param:string|any){
  await this.g.setparamcaisse(_lot.Identifiant,_lot.Libelle,param)
  //this.g.settype("caisse")
 this.router.navigate(['/lotparam']);} */
 
  async update(idlot:any){
    await this.g.settype("lot")
    this.router.navigate(['/forms/'+idlot]);
  }

  async rapportLot(idlot : number) {
    await this.g.settype("lot")
    this.router.navigate(['/rapportlot/'+idlot]);
  }

  async chargerLot(){
    //this.g.showLoadingBlock(true);  
    await this.lotSvc.getlots().subscribe(
      (res:any) => {
        let etatReponse = res["EtatReponse"];

        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {

          this.lots = res["lotVMs"];
          this.lotsOrg = res["lotVMs"];
          console.log(this.lots);
          
          this.lots.forEach(e => {
            if(e.Numero.includes('t')) {
              e.Etat = "en cours";
            } else {
              e.Etat = "complete";
            }
          })
          this.refrechtable()

        } else { 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        //this.g.showLoadingBlock(false);    
      }
    );
    return this.lots
  }
}
