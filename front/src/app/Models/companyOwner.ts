export class CompanyOwner{
  firstName: string;
  lastName: string;
  email: string;
  country: number;
  companyName: string;
  companyCode: string;
  domaine: string;
  numTelephone: string;
  role: string;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    country: number,
    companyName: string,
    companyCode: string,
    domaine: string,
    numTelephone: string,
    role: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.country = country;
    this.companyName = companyName;
    this.companyCode = companyCode;
    this.domaine = domaine;
    this.numTelephone = numTelephone;
    this.role = role;
  }
}
