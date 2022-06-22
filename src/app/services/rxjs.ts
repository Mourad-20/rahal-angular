import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Rxjs {
  private subject = new Subject<any>();
private controle=new Subject<any>();
private initcaisse=new Subject<any>();
  sendClickEvent(){
    this.subject.next();

  }
  controleEvent(){
    this.controle.next();

  }
   initcaisseEvent(){
    this.initcaisse.next();
  }

   sendClickEventparametre(param:any){
    this.subject.next(param);
  }
  getClickEvent():Observable<any>{
     return this.subject.asObservable();
  }
   getControleEvent():Observable<any>{
     return this.controle.asObservable();
  }
     getinitcaisseEvent():Observable<any>{
     return this.initcaisse.asObservable();
  }
}