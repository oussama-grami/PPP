import { CarburantType } from "../enumerations/carburantType";

export class Carburant {
  dieselFuelConsumption!: number;               // essence -> dieselFuelConsumption
  gasolineFuelConsumption!: number;             // diesel -> gasolineFuelConsumption
  lpgFuelConsumption!: number;                  // lpg -> lpgFuelConsumption
  vehicleMileage!: number;                      // kilometrage -> vehicleMileage
  fuelEfficiency!: number;                      // efficacite -> fuelEfficiency
  carburantType!: CarburantType; // typeCarburant -> fuelType
}
