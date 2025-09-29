import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { combineLatest, map, Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { HolidaysFeature, WeekendsFeature } from '../country-page/store/holidays.state';
import { HolidaysActions, WeekendsActions } from '../country-page/store/holidays.actions';

import { PublicHolidayModel } from '../../core/models/public-holiday.model';
import { CountryInfoDataModel } from '../../core/models/country-info-data.model';
import { WeekendModel } from '../../core/models/weekend.model';
import { CountryModel } from '../../core/models/country.model';

import { CountryItemComponent } from '../country-item/country-item.component';

import { pickRandom } from '../../shared/utils/pickRandom';

@Component({
  selector: 'app-random-countries-widget',
  imports: [CommonModule, CountryItemComponent],
  templateUrl: './random-countries-widget.component.html',
  styleUrl: './random-countries-widget.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RandomCountriesWidgetComponent implements OnInit {
  @Input() maxItems = 3;
  @Input() year = 2025;
  @Input() countries: CountryModel[] = [];

  public weekends$!: Observable<WeekendModel[]>;
  public holidays$!: Observable<PublicHolidayModel[]>;

  public selectedCountries: CountryModel[] = [];

  public countriesWithData$!: Observable<CountryInfoDataModel[]>;

  private readonly store = inject(Store);

  ngOnInit(): void {
    this.selectedCountries = pickRandom(this.countries, this.maxItems);
    this.loadDataForCountries(this.selectedCountries);

    this.weekends$ = this.store.select(WeekendsFeature.selectWeekends);
    this.holidays$ = this.store.select(HolidaysFeature.selectHolidays);

    this.countriesWithData$ = combineLatest([this.weekends$, this.holidays$]).pipe(
      map(([weekends, holidays]) =>
        this.selectedCountries.map((country, index) => ({
          country,
          holidays: holidays?.filter((h) => h.countryCode === country.countryCode),
          weekend: weekends?.[index],
        })),
      ),
    );
  }

  private loadDataForCountries(countries: CountryModel[]): void {
    for (const c of countries) {
      this.store.dispatch(
        HolidaysActions.loadHolidays({ year: this.year, countryCode: c.countryCode }),
      );
      this.store.dispatch(
        WeekendsActions.loadWeekends({ year: this.year, countryCode: c.countryCode }),
      );
    }
  }
}
