import {Esg} from "./esg";
import {User} from "./user";

export class Score{
  id !:number;
  annee!:number;
  valeur!:number;
  esg!:Esg;
  user!:User;
}
