export interface EventResponse {
  id: number;
  totalEmission: number;
  companyOwnerId: number;
  eventName: string;
  eventType: string;
  created_at: string; // or Date, depending on how the API sends the date
}
