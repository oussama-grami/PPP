import {User} from "./user";
import {TypeArbre} from "../enumerations/TypeArbre";
import {Stade} from "../enumerations/Stade";
import {Hauteur} from "../enumerations/Hauteur";

export class Arboriculture{
  id!:number;
  annee!:number;
  nbArbre!:number;
  typeArbre!:TypeArbre;
  stade!:Stade;
  hauteur!:Hauteur;
  user!:User;
}
