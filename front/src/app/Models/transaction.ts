export class Transaction {
  public country:string;
  public flag:string;
  public cost:number;
  public quantity:number;
  public date:Date;
  constructor(country:string,flag:string,cost:number,quantity:number,date:Date) {
    this.country = country;
    this.cost = cost;
    this.date = date;
    this.flag = flag;
    this.quantity = quantity;

  }
}
