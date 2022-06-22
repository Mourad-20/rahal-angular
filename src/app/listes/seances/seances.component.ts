import { Component, OnInit } from '@angular/core';
import { Router,NavigationStart,NavigationEnd,NavigationError,RoutesRecognized } from '@angular/router';
import { Globals } from '../../globals';
import { Seance } from '../../entities/Seance';
import { SeanceSvc } from '../../services/seanceSvc';
import { ReglementSvc } from 'src/app/services/reglementSvc';
import{format} from 'date-fns'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-seances',
  templateUrl: './seances.component.html',
  styleUrls: ['./seances.component.css']
})
export class SeancesComponent implements OnInit {
public seance? : Seance  | null;
public seances? : Seance[]=[];
public seancesOrg : Seance[] = [];
public datedebut:string=format(new Date(),'yyyy-MM-dd')+"T00:00:00";
public datefin:string=format(new Date(),'yyyy-MM-dd')+"T23:59:59";
  constructor( public g: Globals,private router: Router,private seanceSvc:SeanceSvc,public ReglementSvc:ReglementSvc ) 
 { }

  ngOnInit(): void {
        this.chargerSeances()
  }
async refrechtable(){
  var datatable = $('#datatableexample').DataTable();
              //datatable reloading 
    datatable.destroy();
  this.getseancebyparam().then(

     res=>this.seances=res
  )

setTimeout(()=>{  
        
     $('#datatableexample').DataTable( {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      lengthMenu : [5, 10, 25]
  } ); 
  }, 100);

}
async getseancebyparam(){
  

  let liste=this.seancesOrg/* .filter( item=>
             ((this.etatCommande!=undefined && this.etatCommande.length>0)?item.CodeEtatCommande==this.etatCommande:item)
          && ((this.serveur!=undefined && this.serveur.length>0)?item.NomServeur==this.serveur:item)
        
        )  */
return liste;
  }
    public getTotal(_IdCaisse:number):any{
 let total:any=0
  this.ReglementSvc.getMontantTotalReglementForCaisse(_IdCaisse).subscribe(
		   (res:any) => {
			let etatReponse = res["EtatReponse"];
			if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
			 total=res["montantTotal"]
			
			}
			//this.g.showLoadingBlock(false);    
		  }
		)
	
 return total;
}
  async getrapport(idseance:number){
 this.router.navigate(['/rapport/'+idseance]);}

    async chargerSeances(){

   //this.g.showLoadingBlock(true);  
   await this.seanceSvc.getSeances(this.datedebut,this.datefin).subscribe(
       (res:any) => {
        let etatReponse = res["EtatReponse"];
        if(etatReponse.Code == this.g.EtatReponseCode.SUCCESS) {
              

          this.seances = res["seanceVMs"];
          this.seancesOrg=res["seanceVMs"];
           this.refrechtable()

         
        }else{ 
          Swal.fire({ text: etatReponse.Message , icon: 'error'});
        }
        //this.g.showLoadingBlock(false);    
      }
    );
   
  }
}
