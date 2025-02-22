import {Categorie} from "../enumerations/Categorie";
import {Partie} from "../enumerations/Partie";

export class Esg{
  id!:number;
  q1!:string;
  q2!:string;
  q3!:string;
  q4!:string;
  q5!:string;
  categorie!:Categorie;
  partie!:Partie;

}
