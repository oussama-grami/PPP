import {Bilan_Carbone} from "./bilan";
import {Unite} from "../enumerations/unite";

export class Consommables extends Bilan_Carbone{
  montantPapier!:number;
  montantFournitures!:number;
  unite1!:Unite;
  unite2!:Unite;

}
