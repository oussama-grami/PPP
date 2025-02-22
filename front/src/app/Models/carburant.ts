import {Bilan_Carbone} from "./bilan";
import {TypeCarburant} from "../enumerations/typeCarburant";

export class Carburant extends Bilan_Carbone{
  essence!:number;
  diesel!:number;
  gpl!:number;
  kilometrage!:number;
  efficacite!:number;
  typeCarburant:TypeCarburant = TypeCarburant.Diesel;
}
