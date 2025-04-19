export class Transaction {
  public country: string;
  public flag: string;
  public quantity: number;
  public date: Date;
  public description: string;
  public chartLineIds: number[];
  public companyOwnerId: number;
  public totalPrice: number;
  public phone: string;
  public address: string;
  public postalCode: number;
  public city: string;
  public province: string;
  public createdAt: Date;

  constructor(country: string, flag: string, totalPrice: number, quantity: number, date: Date, description: string, chartLineIds: number[], companyOwnerId: number, phone: string, address: string, postalCode: number, city: string, province: string, createdAt: Date) {
    this.country = country;
    this.totalPrice = totalPrice;
    this.date = date;
    this.flag = flag;
    this.quantity = quantity;
    this.description = description;
    this.chartLineIds = chartLineIds;
    this.companyOwnerId = companyOwnerId;
    this.totalPrice = totalPrice;
    this.phone = phone;
    this.address = address;
    this.postalCode = postalCode;
    this.city = city;
    this.province = province;
    this.createdAt = createdAt;

  }
}

