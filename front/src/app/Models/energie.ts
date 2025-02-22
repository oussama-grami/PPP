import {Bilan_Carbone} from "./bilan";

export class Energie extends Bilan_Carbone{
  nbEmployee !: number;
  pourcentageTeleTravail!:number;
  electricite!:number;
  propane!:number;
  gaz!:number;
  fioul!:number;
  charbon!:number;
  fluideFrig!:number;
  gpl!:number;
}
