import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { listeCommandesComponent } from './listes/commandes/commandes.component';
import { listedevisComponent } from './listes/devis/devis.component';

import { AchatsComponent } from './listes/achats/achats.component';
import { LoginComponent } from './authentification/login.component';
import { LoginMobileComponent } from './authentification/loginMobile.component';
import { LogoutComponent } from './authentification/logout.component';
import { HomeComponent } from './home/home.component';
import { CaisseComponent } from './caisse/caisse.component';
//import { CaisseComponent } from './home/caisse.component';
import { DetailarticleComponent } from './detailarticle/detailarticle.component';
import { DetailstockComponent } from './detailstock/detailstock.component';
import{BonCommandeComponent}from './boncommande/boncommande.component';
import { OuvertureSeanceComponent } from './seances/ouvertureSeance.component';
import { CaisseMobileComponent } from './home/caisseMobile.component';
import { ClotureSeanceComponent } from './home/clotureSeance.component';
import { RapportComponent } from './rapport/rapport.component';
import { ArticlerapportComponent } from './rapport/articlerapport/articlerapport.component';
import { FormsComponent } from './forms/forms.component';
import { UtilisateursComponent } from './listes/utilisateurs/utilisateurs.component';
import { ArticlesComponent } from './listes/articles/articles.component';
import { ListeLocaliteComponent } from './listes/localite/localite.component';
import { TestComponent } from './home/test.component';
import { CategoriesComponent } from './listes/categories/categories.component';
import { CaissesComponent } from './listes/caisses/caisses.component';
import { CaisseparamComponent } from './param/caisse/caisse.component';
import { ArticleparamComponent } from './param/article/article.component';
import { FermetureSeanceComponent } from './seances/fermeture-seance/fermeture-seance.component';
import { SeancesComponent } from './listes/seances/seances.component';
import { CaisserapportComponent } from './rapport/caisserapport/caisserapport.component';
import { MessageComponent } from './listes/message/message.component';
import { HomerapportComponent } from './rapport/homerapport/homerapport.component';
import { SeancerapportComponent } from './rapport/seancerapport/seancerapport.component';
import { DaterapportComponent } from './rapport/daterapport/daterapport.component';
import { VentComponent } from './vent/vent.component';
import{DevisComponent} from './devis/devis.component';
import { DtransfertComponent } from './dtransfert/dtransfert.component';
import{AchatComponent}from './achat/achat.component';
import { listeallimentationsComponent } from './listes/allimentation/allimentations.component';
import { BondecommandesComponent } from './listes/bondecommandes/bondecommandes.component';
import { BctransfertComponent } from './bctransfert/bctransfert.component';
const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'loginMobile', component: LoginMobileComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'home', component: HomeComponent },
  { path: 'caisse', component: CaisseComponent },
  { path: 'caisses/:id', component: CaisseComponent },
  { path: 'vente', component: VentComponent },
  { path: 'ventes/:id', component: VentComponent },
  { path: 'devis', component: DevisComponent },
  { path: 'bondecommande', component: BonCommandeComponent },
{ path: 'bondecommandes/:id', component: BonCommandeComponent },
  
  { path: 'devis/:id', component: DevisComponent },
  { path: 'devistocommande/:id', component: DtransfertComponent },
  { path: 'bontoachat/:id', component: BctransfertComponent },
  
  { path: 'achat', component: AchatComponent },
  { path: 'achats/:id', component: AchatComponent },
{ path: 'article/:id', component: DetailarticleComponent },
{ path: 'detail/stocks', component: DetailstockComponent },

    
  
  { path: 'ouvertureSeance', component: OuvertureSeanceComponent },
  { path: 'caisseMobile', component: CaisseMobileComponent },
 /// { path: 'clotureSeance', component: ClotureSeanceComponent },
  { path: 'test', component: TestComponent },
  { path: 'rapports', component: HomerapportComponent },
  { path: 'forms', component: FormsComponent },
  { path: 'forms/:id', component: FormsComponent },
  { path: 'liste/utilisateurs', component: UtilisateursComponent },
  { path: 'liste/articles', component: ArticlesComponent },
  { path: 'liste/localites', component: ListeLocaliteComponent },
  { path: 'liste/messages', component: MessageComponent },
  { path: 'liste/allimentation', component: listeallimentationsComponent },
  { path: 'liste/Achats', component: AchatsComponent },
    
  { path: 'liste/devis', component: listedevisComponent },
  { path: 'liste/bondecommandes', component: BondecommandesComponent },

{ path: 'liste/commande', component: listeCommandesComponent },
{ path: 'liste/categories', component: CategoriesComponent },
{ path: 'liste/caisses', component: CaissesComponent },
{ path: 'liste/seances', component: SeancesComponent },
{ path: 'caisseparam', component: CaisseparamComponent },
{ path: 'articleparam', component: ArticleparamComponent },


{ path: 'clotureSeance', component: FermetureSeanceComponent },
{ path: 'rapport/:id', component: SeancerapportComponent },
{ path: 'rapportdate', component: DaterapportComponent },

{ path: 'rapportarticle', component: ArticlerapportComponent },
{ path: 'rapportcaisse', component: CaisserapportComponent },

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
