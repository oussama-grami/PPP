import {Bilan_Carbone} from "./bilan";

export class Immobilisation extends Bilan_Carbone{
  surface!:number;
  nbVoituresLegers!:number;
  nbVoituresLourds!:number;
  nbVoituresUtilitaires!:number;
  nbServeurs!:number;
  nbImprimantesIndiv!:number;
  nbImprimantesMilti!:number;
  nbEcran!:number;
  nbPc!:number;
  nbPostes!:number;
}
