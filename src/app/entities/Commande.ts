import { DetailCommande } from './DetailCommande';
export class Commande {
    public Identifiant: number = 0;
    public Montant: number = 0;
    public DateCommande : string = "";
    public Numero : string = "";
    public IdEtatCommande: number = 0;
    public CodeEtatCommande : string = "";
    public IdSeance?: number = 0;
    public IdServeur? : number | null;
    public NomServeur : string = "";   
    public IdLocalite? : number | null;
    public LibelleLocalite : string = "";
    public IdCreePar: number = 0;
    public LibelleCaisse:string="";
    public CodeCommande:string="";
    public IdSource: number|any = null;
    public MontantDeclaration: number = 0;
    
    public DetailCommandes : DetailCommande[] = [];	
}