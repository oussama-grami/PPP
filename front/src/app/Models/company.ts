export class Company {
  constructor(
    public companyName: string,
    public country: string,
    public activitySector: string,
    public beginDate: Date,
    public endDate: Date
  ) {}
}
