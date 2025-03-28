import {Bilan_Carbone} from "./bilan";
import {TypeCarburant} from "../enumerations/typeCarburant";
import {Validators} from "@angular/forms";

export class Carburant {
  essence!:number;
  diesel!:number;
  gpl!:number;
  kilometrage!:number;
  efficacite!:number;
  typeCarburant:TypeCarburant = TypeCarburant.Diesel;
}

