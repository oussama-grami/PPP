import {Role} from "../enumerations/Role";
import {Score} from "./score";
import {Bilan_Carbone} from "./bilan";
import {Arboriculture} from "./arboriculture";
import {Panneaux} from "./panneaux";

export class User{
  id!:number;
  email!:string;
  password!:string;
  nom!:string;
  domaine!:string;
  numTelephone!:number;
  pays!:string;
  role!:Role;
  reponces!:Score[];
  Bilans!:Bilan_Carbone[];
  arboricultures!:Arboriculture[];
  panneaux!:Panneaux[];
}
