import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { CountryModel } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getAvailableCountries(): Observable<CountryModel[]> {
    return this.http.get<CountryModel[]>(`${this.apiUrl}AvailableCountries`);
  }
}
