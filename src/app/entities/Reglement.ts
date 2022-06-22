import { DetailReglement } from './DetailReglement';
export class Reglement {
    public Identifiant: number = 0;
    public Numero : string = "";
    public Montant: number = 0;
    public DateReglement : string = "";
    public IdModeReglement: number = 0;
    public IdCommande?: number = 0;
    public NumeroCommande : string = "";
    public LibelleModeReglement : string = "";    
    public IdCreePar: number = 0;
    public EnActivite: number = 0;
    public DetailReglements : DetailReglement[] = [];
    public  Datecheque : string = "";
    public  Ncheque: string = "";
    public  NomBanque: string = "";
    public  NCompte : string = "";
}