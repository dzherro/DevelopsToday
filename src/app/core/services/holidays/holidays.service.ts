import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { PublicHolidayModel } from '../../models/public-holiday.model';
import { WeekendModel } from '../../models/weekend.model';

@Injectable({
  providedIn: 'root',
})
export class HolidaysService {
  private readonly apiUrl = environment.apiUrl;

  private readonly http = inject(HttpClient);

  public getHolidays(year: number, countryCode: string): Observable<PublicHolidayModel[]> {
    return this.http.get<PublicHolidayModel[]>(
      `${this.apiUrl}PublicHolidays/${year}/${countryCode}`,
    );
  }

  public getLongWeekends(year: number, countryCode: string): Observable<WeekendModel[]> {
    return this.http.get<WeekendModel[]>(`${this.apiUrl}LongWeekend/${year}/${countryCode}`);
  }
}
