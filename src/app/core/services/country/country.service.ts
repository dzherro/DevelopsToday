import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { CountryModel } from '../../models/country.model';
import { CountryInfoModel } from '../../models/country-info.model';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private readonly apiUrl = environment.apiUrl;

  private readonly http = inject(HttpClient);

  public getAvailableCountries(): Observable<CountryModel[]> {
    return this.http.get<CountryModel[]>(`${this.apiUrl}AvailableCountries`);
  }

  public getCountryInfo(countryCode: string): Observable<CountryInfoModel> {
    return this.http.get<CountryInfoModel>(`${this.apiUrl}CountryInfo/${countryCode}`);
  }
}
