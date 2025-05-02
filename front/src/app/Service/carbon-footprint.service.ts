import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { Company } from '../Models/company';
import { Carburant } from '../Models/carburant';
import { Energy } from '../Models/energy';
import { Aerien } from '../Models/aerien';
import { Freight } from '../Models/freight';
import { Consumables } from '../Models/consumables';
import { Immobilisation } from '../Models/immobilisation';
import { CarbonFootprintRequest } from "../Models/carbonFootprintRequest";
import { Unit } from "../enumerations/unit";
import { CarburantType } from "../enumerations/carburantType";
import {CarbonFootprintResponse} from "../Models/carbonFootprintResponse";
import { map, switchMap, tap } from 'rxjs/operators';

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
  private readonly apiUrl = 'http://localhost:8080/api/carbon';
  private calculations: CarbonFootprintResponse[] = [];

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

  submitAllData(): Observable<any> {
    const formData = this.getAllFormData();

    const companyData = formData.info;
    const carburantData = formData.carburant;
    const energyData = formData.energy;
    const aerienData = formData.aerien;
    const freightData = formData.freight;
    const consumablesData = formData.cons;
    const immobilisationData = formData.imme;

    const payload: CarbonFootprintRequest = {
      country: companyData?.country ?? '',
      companyName: companyData?.companyName ?? '',
      activitySector: companyData?.activitySector ?? '',
      annualConsumptionOfCoal: energyData?.annualConsumptionOfCoal ?? 0,
      annualConsumptionOfElectricity: energyData?.annualConsumptionOfElectricity ?? 0,
      annualConsumptionOfFuel: energyData?.annualConsumptionOfFuel ?? 0,
      annualConsumptionOfGPL: energyData?.annualConsumptionOfGPL ?? 0,
      annualConsumptionOfNaturalGas: energyData?.annualConsumptionOfNaturalGas ?? 0,
      annualConsumptionOfPropane: energyData?.annualConsumptionOfPropane ?? 0,
      annualConsumptionOfRefrigerant: energyData?.annualConsumptionOfRefrigerant ?? 0,
      beginDate: companyData?.beginDate ?? new Date(),
      builtAreaOfCompany: immobilisationData?.surfaceArea ?? 0,
      carburantType: carburantData?.carburantType ?? CarburantType.DIESEL,
      consumptionOfLPG: carburantData?.lpgFuelConsumption ?? 0,
      drivenDistance: carburantData?.vehicleMileage ?? 0,
      endDate: companyData?.endDate ?? new Date(),
      expensesOnPaper: consumablesData?.expensesOnPaper ?? 0,
      expensesOnSmallOfficeSupplies: consumablesData?.expensesOnSmallOfficeSupplies ?? 0,
      fuelConsumptionOfDiesel: carburantData?.dieselFuelConsumption ?? 0,
      fuelConsumptionOfGasoline: carburantData?.gasolineFuelConsumption ?? 0,
      numberOfCommercialVehicles: immobilisationData?.numberOfUtilityVehicles ?? 0,
      numberOfDesktopComputers: immobilisationData?.numberOfPCs ?? 0,
      numberOfFlatPanelScreens: immobilisationData?.numberOfMonitors ?? 0,
      numberOfFullTimeEmployees: energyData?.numberOfEmployees ?? 0,
      numberOfHeavyVehicles: immobilisationData?.numberOfHeavyVehicles ?? 0,
      numberOfIndividualPrinters: immobilisationData?.numberOfIndividualPrinters ?? 0,
      numberOfLaptops: immobilisationData?.numberOfWorkstations ?? 0,
      numberOfLightDutyVehicles: immobilisationData?.numberOfLightVehicles ?? 0,
      numberOfLongHaulRoundTrips: aerienData?.numberOfLongHaulRoundTrips ?? 0,
      numberOfMediumHaulRoundTrips: aerienData?.numberOfMediumHaulRoundTrips ?? 0,
      numberOfMultifunctionPrinters: immobilisationData?.numberOfMultiPrinters ?? 0,
      numberOfServers: immobilisationData?.numberOfServers ?? 0,
      numberOfShortHaulRoundTrips: aerienData?.numberOfShortHaulRoundTrips ?? 0,
      percentageOfTelework: energyData?.percentageOfTelework ?? 0,
      tonsOfAirFreightLong: freightData?.freightAirLong ?? 0,
      tonsOfAirFreightShort: freightData?.freightAirShort ?? 0,
      tonsOfSeaFreightLong: freightData?.freightSeaLong ?? 0,
      tonsOfSeaFreightShort: freightData?.freightSeaShort ?? 0,
      unitFourniture: consumablesData?.unitOfficeSupplies ?? Unit.DOLLAR,
      unitPaper: consumablesData?.unitPaper ?? Unit.DOLLAR,
      vehicleFuelEfficiency: carburantData?.fuelEfficiency ?? 0,
      companyOwnerId: 7,
    };

    return this.httpClient.post(this.apiUrl, payload);
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



  getCalculationById(id: number): Observable<CarbonFootprintResponse> {
    return this.httpClient.get<CarbonFootprintResponse>(`${this.apiUrl}/${id}`);
  }

  getAllByCompanyOwnerId(companyOwnerId: number): Observable<CarbonFootprintResponse[]> {
    return this.httpClient.get<CarbonFootprintResponse[]>(`${this.apiUrl}`, {
      params: { companyOwnerId: companyOwnerId.toString() }
    }).pipe(
      map(responses => {
        this.calculations = responses; // cache list
        return responses;
      })
    );
  }

  getTotalEmission(id: number): Observable<number> {
    if (this.calculations.length > 0) {
      const found = this.calculations.find(c => c.id === id);
      if (found) {
        return of(found.totalEmissions);
      }
    }
    return this.getCalculationById(id).pipe(map(c => c.totalEmissions));
  }
  getCalculationByIdOrLast(companyOwnerId: number, id?: number): Observable<CarbonFootprintResponse | null> {
    // If ID is provided, try to find the calculation by ID
    if (id) {
      const found = this.calculations.find(c => c.id === id);
      if (found) {
        return of(found);
      }
    }

    // If ID is not found or not provided, get the most recent calculation
    return this.getLastCalculation(companyOwnerId);
  }

  getLastCalculation(companyOwnerId: number): Observable<CarbonFootprintResponse | null> {
    if (this.calculations.length > 0) {
      return of(this.getLatestFromList());
    }

    return this.getAllByCompanyOwnerId(companyOwnerId).pipe(
      map(() => this.getLatestFromList())
    );
  }

  private getLatestFromList(): CarbonFootprintResponse | null {
    if (this.calculations.length === 0) return null;

    return this.calculations.reduce((latest, current) => {
      const latestDate = new Date((latest.createdDate as unknown) as string).getTime();
      const currentDate = new Date((current.createdDate as unknown) as string).getTime();
      return currentDate > latestDate ? current : latest;
    });
  }
// Delete a carbon footprint record by ID
  deleteById(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateImmobilisation(immeData: Immobilisation) {
    this.immeData = immeData;
  }
}
