import { AffectationMessage } from './AffectationMessage';

export class DetailCommande {
    Identifiant: number = 0;
    NumerodeLot:string="";
    Description:string="";
    IdCommande: number = 0;
    IdArticle: number = 0;
    PathImageArticle: string = "";
    IdCreePar: number = 0;
    DateCreation:string="";
    DateValidation:string="";
    LibelleTypeUnite:string="";
    IdSituationCommande: number = 0;
    IdValiderPar: number = 0;
    LibelleArticle: string = "";
    Quantite: number = 0;
    DateExpiration:string=""
    QuantiteServi:number=0;
    Montant: number = 0;
    TauxTVA	:number=0
    IdCaisse:number=0
    IdTypeUnite :number=0
    AffectationMessages : AffectationMessage[] = [];
	LibelleCaisse: string = "";
}