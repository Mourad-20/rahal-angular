import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms'; 
import { BrowserModule } from '@angular/platform-browser';
import { CookieService  } from 'ngx-cookie-service';
import { Router,NavigationStart,NavigationEnd,NavigationError,RoutesRecognized } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { RequestInterceptor } from './interceptors/requestInterceptor';
import {DataTablesModule} from 'angular-datatables';
import { JwPaginationModule } from 'jw-angular-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Globals } from './globals';
import { ZoneSvc } from './services/zoneSvc';
import { LoginComponent } from './authentification/login.component';
import { LoginMobileComponent } from './authentification/loginMobile.component';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/header.component';
import { LeftsidebareComponent } from './home/leftsidebare.component';
import { CaisseComponent } from './caisse/caisse.component';
import{OuvertureSeanceComponent} from './seances/ouvertureSeance.component'
import { CaisseMobileComponent } from './home/caisseMobile.component';
import { ClotureSeanceComponent } from './home/clotureSeance.component';
import { TestComponent } from './home/test.component';
import { PercentComponent } from './rapport/percent.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


import { ClientSvc } from './services/ClientSvc';
import { LotSvc } from './services/lotSvc';
import { ProjetSvc } from './services/projetSvc';

import { UtilisateurSvc } from './services/utilisateurSvc';
import { CategorieSvc } from './services/categorieSvc';
import { ArticleSvc } from './services/articleSvc';
import { CommandeSvc } from './services/commandeSvc';
import { LocaliteSvc } from './services/localiteSvc';
import { SeanceSvc } from './services/seanceSvc';
import { ReglementSvc } from './services/reglementSvc';
import { CaisseSvc } from './services/caisseSvc';
import { EtatCommandeSvc } from './services/EtatCommandeSvc';
import { CommercialisationSvc } from './services/commercialisationSvc';
import { AffectationCaisseSvc } from './services/affectationCaisseSvc';
import { ActeurSeanceSvc } from './services/acteurSeanceSvc';
import { TypeUniteSvc } from './services/typeuniteSvc';
import { Objettoupdate } from './forms/objettoupdate';
import Swal from 'sweetalert2';
import { ColorPickerModule } from 'ngx-color-picker';
import { RapportComponent } from './rapport/rapport.component';
import { FormsComponent } from './forms/forms.component';
import { GroupeSvc } from './services/groupeSvc';
import { JsonFormComponent } from './components/json-form/json-form.component';
import { UtilisateursComponent } from './listes/utilisateurs/utilisateurs.component';
import { ArticlesComponent } from './listes/articles/articles.component';
import { CategoriesComponent } from './listes/categories/categories.component';
import { CaissesComponent } from './listes/caisses/caisses.component';
import { CaisseparamComponent } from './param/caisse/caisse.component';
import { LocaliteComponent } from './components/localite/localite.component';
import { FermetureSeanceComponent } from './seances/fermeture-seance/fermeture-seance.component';
import { SeancesComponent } from './listes/seances/seances.component';
import { ListeLocaliteComponent } from './listes/localite/localite.component';
import { MessageSvc } from './services/messageSvc';
import { AssociationMessageSvc } from './services/associationMessageSvc';
import { ArticlerapportComponent } from './rapport/articlerapport/articlerapport.component';
import { CaisserapportComponent } from './rapport/caisserapport/caisserapport.component';
import { MessageComponent } from './listes/message/message.component';
import { ArticleparamComponent } from './param/article/article.component';
import { HomerapportComponent } from './rapport/homerapport/homerapport.component';
import { SeancerapportComponent } from './rapport/seancerapport/seancerapport.component';
import { DaterapportComponent } from './rapport/daterapport/daterapport.component';
import { VentComponent } from './vent/vent.component';
import { DevisComponent } from './devis/devis.component';
import { DtransfertComponent } from './dtransfert/dtransfert.component';
import { listedevisComponent } from './listes/devis/devis.component';
import{AchatComponent}from './achat/achat.component';
import{BonCommandeComponent}from './boncommande/boncommande.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { listeCommandesComponent } from './listes/commandes/commandes.component';
import { listeallimentationsComponent } from './listes/allimentation/allimentations.component';
import { DataTableDirective } from 'angular-datatables';
import { DetailarticleComponent } from './detailarticle/detailarticle.component';
import { DetailstockComponent } from './detailstock/detailstock.component';
import { AchatsComponent } from './listes/achats/achats.component';
import { BondecommandesComponent } from './listes/bondecommandes/bondecommandes.component';
import { BctransfertComponent } from './bctransfert/bctransfert.component';
@NgModule({
  declarations: [
  PercentComponent,
  AppComponent,
  LoginComponent,
  HomeComponent,
  HeaderComponent,
  LeftsidebareComponent,
  CaisseComponent,
  OuvertureSeanceComponent,
  TestComponent,
	LoginMobileComponent,
	CaisseMobileComponent,
	ClotureSeanceComponent,
  RapportComponent,
  FormsComponent,
  JsonFormComponent,
  UtilisateursComponent,
  ArticlesComponent,
  CategoriesComponent,
  CaissesComponent,
  CaisseparamComponent,
  LocaliteComponent,
  FermetureSeanceComponent,
  SeancesComponent,
  ArticlerapportComponent,
  CaisserapportComponent,
  ListeLocaliteComponent,
  MessageComponent,
  ArticleparamComponent,
  HomerapportComponent,
  SeancerapportComponent,
  DaterapportComponent,
  VentComponent,
  DevisComponent,
  listeCommandesComponent,
  listedevisComponent,
  DtransfertComponent,
  listeallimentationsComponent,
  AchatComponent,
  BonCommandeComponent,
  DetailarticleComponent,
  DetailstockComponent,
  AchatsComponent,
  BondecommandesComponent,
  BctransfertComponent

  ],
  imports: [
    JwPaginationModule,
    ColorPickerModule,
    NgMultiSelectDropDownModule.forRoot(),
    DataTablesModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgChartsModule,
    NgxEchartsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }, 
    Globals,
    CookieService,
    UtilisateurSvc,
    CategorieSvc,
    ArticleSvc,
    CommandeSvc,
    LocaliteSvc,
    TypeUniteSvc,
    SeanceSvc,
    ReglementSvc,
    CaisseSvc,
    EtatCommandeSvc,
    GroupeSvc,
    Objettoupdate,
    CommercialisationSvc,
    AffectationCaisseSvc,
    ActeurSeanceSvc,
    ZoneSvc,
    MessageSvc,
    AssociationMessageSvc,
    ProjetSvc,
    ClientSvc,
    LotSvc,
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
	constructor(private g: Globals,private router: Router,private utilisateurSvc:UtilisateurSvc) {
	  //alert('AppModule');
	}
}
