import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Country, CountryApiResponse } from '../Models/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private readonly REST_COUNTRIES_API = 'https://restcountries.com/v3.1/all?fields=name,cca2,idd';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<Country[]> {
    return this.http.get<CountryApiResponse[]>(this.REST_COUNTRIES_API)
      .pipe(
        map(response => this.processCountries(response)),
        catchError(() => of(this.getFallbackCountries()))
      );
  }

  private processCountries(response: CountryApiResponse[]): Country[] {
    return response
      .filter(country => country.idd && country.idd.root)
      .map((country, index) => ({
        id: index + 1,
        name: country.name.common,
        code: country.cca2,
        phone: country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] || '' : '')
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  private getFallbackCountries(): Country[] {
    return [
      { id: 1, name: "United States", code: "US", phone: "+1" },
      { id: 2, name: "United Kingdom", code: "GB", phone: "+44" },
      { id: 3, name: "Germany", code: "DE", phone: "+49" },
      { id: 4, name: "France", code: "FR", phone: "+33" },
      { id: 5, name: "Canada", code: "CA", phone: "+1" },
      { id: 6, name: "Australia", code: "AU", phone: "+61" },
      { id: 7, name: "Japan", code: "JP", phone: "+81" },
      { id: 8, name: "Tunisia", code: "TN", phone: "+216" },
      { id: 9, name: "Morocco", code: "MA", phone: "+212" },
      { id: 10, name: "Egypt", code: "EG", phone: "+20" }
    ].sort((a, b) => a.name.localeCompare(b.name));
  }

  findTunisia(countries: Country[]): Country | undefined {
    return countries.find(country =>
      country.code === 'TN' || country.name.toLowerCase().includes('tunisia')
    );
  }
}
