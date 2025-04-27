import { Injectable } from '@angular/core';
import { Company } from '../Models/company';
import { Carburant } from '../Models/carburant';
import { Energy } from '../Models/energy';
import { Aerien } from '../Models/aerien';
import { Freight } from '../Models/freight';
import { Consumables } from '../Models/consumables';
import { Immobilisation } from '../Models/immobilisation';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { CarbonControllerService } from '../api/services';
import { CarbonFootprintModelRequest, CarbonResponse } from '../api/models';

@Injectable({
  providedIn: 'root',
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
  recommendations: CarbonResponse | null = null;

  // Storage keys for localStorage
  private readonly STORAGE_KEY = 'carbon_recommendations';
  private readonly FORM_DATA_KEY = 'carbon_form_data';

  // BehaviorSubject to track recommendations changes
  private recommendationsSubject = new BehaviorSubject<CarbonResponse | null>(
    null
  );
  // Observable that components can subscribe to
  public recommendations$ = this.recommendationsSubject.asObservable();

  constructor(private carbonAIController: CarbonControllerService) {
    // Load saved recommendations from localStorage on service initialization
    this.loadSavedRecommendations();
    this.loadSavedFormData();
  }

  // Methods to update form data
  updateInfo(info: Company): void {
    this.infoData = info;
    this.saveFormData();
  }

  updateCarburant(carburant: Carburant): void {
    this.carburantData = carburant;
    this.saveFormData();
  }

  updateEnergy(energy: Energy): void {
    this.energyData = energy;
    this.saveFormData();
  }

  updateAerien(aerien: Aerien): void {
    this.aerienData = aerien;
    this.saveFormData();
  }

  updateFreight(freight: Freight): void {
    this.freightData = freight;
    this.saveFormData();
  }

  updateConsumables(cons: Consumables): void {
    this.consData = cons;
    this.saveFormData();
  }

  updateImmobilisation(imme: Immobilisation): void {
    this.immeData = imme;
    this.saveFormData();
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
      imme: this.immeData,
    };
  }

  // Save form data to localStorage
  private saveFormData(): void {
    try {
      const formData = this.getAllFormData();
      localStorage.setItem(this.FORM_DATA_KEY, JSON.stringify(formData));
    } catch (error) {
      console.error('Error saving form data to localStorage:', error);
    }
  }

  // Load saved form data from localStorage
  private loadSavedFormData(): void {
    try {
      const savedData = localStorage.getItem(this.FORM_DATA_KEY);
      if (savedData) {
        const formData = JSON.parse(savedData);
        this.infoData = formData.info;
        this.carburantData = formData.carburant;
        this.energyData = formData.energy;
        this.aerienData = formData.aerien;
        this.freightData = formData.freight;
        this.consData = formData.cons;
        this.immeData = formData.imme;
      }
    } catch (error) {
      console.error('Error loading form data from localStorage:', error);
    }
  }

  // Save recommendations to localStorage
  private saveRecommendations(recommendations: CarbonResponse): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(recommendations));
    } catch (error) {
      console.error('Error saving recommendations to localStorage:', error);
    }
  }

  // Load saved recommendations from localStorage
  private loadSavedRecommendations(): void {
    try {
      const savedRecommendations = localStorage.getItem(this.STORAGE_KEY);
      if (savedRecommendations) {
        const parsedRecommendations = JSON.parse(
          savedRecommendations
        ) as CarbonResponse;
        this.recommendations = parsedRecommendations;
        this.recommendationsSubject.next(parsedRecommendations);
      }
    } catch (error) {
      console.error('Error loading recommendations from localStorage:', error);
    }
  }

  // Clear stored recommendations
  public clearRecommendations(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.recommendations = null;
    this.recommendationsSubject.next(null);
  }

  getEnterpriseRecommendations() {
    const carbonRequest: CarbonFootprintModelRequest = {
      activity_sector: this.infoData?.activitySector,
      annual_consumption_of_GPL: this.energyData?.annualConsumptionOfGPL,
      annual_consumption_of_coal: this.energyData?.annualConsumptionOfCoal,
      annual_consumption_of_electricity:
        this.energyData?.annualConsumptionOfElectricity,
      annual_consumption_of_fuel: this.carburantData?.dieselFuelConsumption,
      annual_consumption_of_natural_gas:
        this.energyData?.annualConsumptionOfNaturalGas,
      annual_consumption_of_propane:
        this.energyData?.annualConsumptionOfPropane,
      annual_consumption_of_refrigerant:
        this.energyData?.annualConsumptionOfRefrigerant,
      built_area_of_company: this.immeData?.surfaceArea,
      consumption_of_LPG: this.carburantData?.lpgFuelConsumption,
      country: this.infoData?.country,
      expenses_of_paper: this.consData?.expensesOnPaper,
      expenses_of_small_office_supplies:
        this.consData?.expensesOnSmallOfficeSupplies,
      fuel_consumption_of_diesel: this.carburantData?.dieselFuelConsumption,
      fuel_consumption_of_gasoline: this.carburantData?.gasolineFuelConsumption,
      number_of_commercial_vehicles: this.immeData?.numberOfUtilityVehicles,
      number_of_desktop_computers: this.immeData?.numberOfWorkstations,
      number_of_flat_panel_screens: this.immeData?.numberOfMonitors,
      number_of_full_time_employees: this.energyData?.numberOfEmployees,
      number_of_heavy_vehicles: this.immeData?.numberOfHeavyVehicles,
      number_of_individual_printers: this.immeData?.numberOfIndividualPrinters,
      number_of_laptops: this.immeData?.numberOfPCs,
      number_of_light_duty_vehicles: this.immeData?.numberOfLightVehicles,
      number_of_long_haul_round_trip:
        this.aerienData?.numberOfLongHaulRoundTrips,
      number_of_medium_haul_round_trip:
        this.aerienData?.numberOfMediumHaulRoundTrips,
      number_of_multifunction_printers: this.immeData?.numberOfMultiPrinters,
      number_of_servers: this.immeData?.numberOfServers,
      number_of_short_haul_round_trip:
        this.aerienData?.numberOfShortHaulRoundTrips,
      percentage_of_telework: this.energyData?.percentageOfTelework,
      tons_of_air_freight_gt_3000: this.freightData?.freightAirLong,
      tons_of_air_freight_lt_3000: this.freightData?.freightAirShort,
      tons_of_sea_freight_gt_3000: this.freightData?.freightSeaLong,
      tons_of_sea_freight_lt_3000: this.freightData?.freightSeaShort,
    };
    console.log('carbonRequest:', carbonRequest);
    this.carbonAIController
      .generateRecommendations({
        body: carbonRequest,
      })
      .subscribe((response) => {
        this.recommendations = response;
        // Save to localStorage for persistence
        this.saveRecommendations(response);
        // Emit the new value to all subscribers
        this.recommendationsSubject.next(response);
        alert('done with success ');
      });
  }

  submitAllData() {
    this.getEnterpriseRecommendations();
  }

  // Simulated API call - Replace this with an actual backend call if needed
  calculateEmissions(year: number, companyId: number): Observable<number[]> {
    // Example values: Fetch this from an API if necessary
    const emissions = [100, 150, 80, 50, 120, 90]; // Replace with actual API response
    return of(emissions);
  }
}
