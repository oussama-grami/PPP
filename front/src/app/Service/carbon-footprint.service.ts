import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Company} from '../Models/company';
import {Carburant} from '../Models/carburant';
import {Energie} from '../Models/energie';
import {DeplacemetAerien} from '../Models/deplacemetAerien';
import {Fret} from '../Models/fret';
import {Consommables} from '../Models/consommables';
import {Immobilisation} from '../Models/immobilisation';

@Injectable({
  providedIn: 'root'
})
export class CarbonFootprintService {
  // Variables to store form data
  private infoData: Company | null = null;
  private carburantData: Carburant | null = null;
  private energieData: Energie | null = null;
  private depData: DeplacemetAerien | null = null;
  private fretData: Fret | null = null;
  private consData: Consommables | null = null;
  private immeData: Immobilisation | null = null;

  constructor(private httpClient: HttpClient) {}

  // Methods to update form data
  updateInfo(info: Company): void {
    this.infoData = info;
  }

  updateCarburant(carburant: Carburant): void {
    this.carburantData = carburant;
  }

  updateEnergie(energie: Energie): void {
    this.energieData = energie;
  }

  updateDeplacementAerien(dep: DeplacemetAerien): void {
    this.depData = dep;
  }

  updateFret(fret: Fret): void {
    this.fretData = fret;
  }

  updateConsommable(cons: Consommables): void {
    this.consData = cons;
  }

  updateImmobilisation(imme: Immobilisation): void {
    this.immeData = imme;
  }

  // Collect all form data into a single object
  getAllFormData() {
    return {
      info: this.infoData,
      carburant: this.carburantData,
      energie: this.energieData,
      dep: this.depData,
      fret: this.fretData,
      cons: this.consData,
      imme: this.immeData
    };
  }

  // Send all data to the backend
  /* submitAllData():Observable<any> {
    const url = 'http://localhost:8080/api/calculator/add/company';
    const allData = this.getAllFormData();

    return this.httpClient.post(url, allData);

  }*/
  submitAllData(){
   alert("done with success ");
  }
}
