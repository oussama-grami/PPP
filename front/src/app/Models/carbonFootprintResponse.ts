import { LocalDateTime } from 'js-joda'; // Or use string if you're using the standard Date object.

export interface CarbonFootprintResponse {
  beginDate: Date;
  endDate: Date;
  createdDate: LocalDateTime;
  id: number;
  country: string;
  activitySector: string;
  companyName: string;
  totalEmissions: number;

}
