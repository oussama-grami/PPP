import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Company} from '../Models/company';
import {Carburant} from '../Models/carburant';
import {Energy} from '../Models/energy';
import {Aerien} from '../Models/aerien';
import {Freight} from '../Models/freight';
import {Consumables} from '../Models/consumables';
import {Immobilisation} from '../Models/immobilisation';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CarbonFootprintService {
  // Variables to store form data
  private infoData: Company | null = null;
  private carburantData: Carburant | null = null;
  private energyData: Energy | null = null;
  private aerienData: Aerien | null = null;
  private freightData: Freight | null = null;
  private consData: Consumables | null = null;
  private immeData: Immobilisation | null = null;

  constructor(private httpClient: HttpClient) {}

  // Methods to update form data
  updateInfo(info: Company): void {
    this.infoData = info;
  }

  updateCarburant(carburant: Carburant): void {
    this.carburantData = carburant;
  }

  updateEnergy(energy: Energy): void {
    this.energyData = energy;
  }

  updateAerien(aerien: Aerien): void {
    this.aerienData = aerien;
  }

  updateFreight(freight: Freight): void {
    this.freightData = freight;
  }

  updateConsumables(cons: Consumables): void {
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
      energy: this.energyData,
      aerien: this.aerienData,
      freight: this.freightData,
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
  // Simulated API call - Replace this with an actual backend call if needed
  calculateEmissions(year: number, companyId: number): Observable<number[]> {
    // Example values: Fetch this from an API if necessary
    const emissions = [100, 150, 80, 50, 120, 90]; // Replace with actual API response
    return of(emissions);
  }
}
