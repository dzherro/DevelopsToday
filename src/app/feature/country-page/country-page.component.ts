import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { distinctUntilChanged, map, Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { PublicHolidayModel } from '../../core/models/public-holiday.model';
import { WeekendModel } from '../../core/models/weekend.model';

import { HolidaysActions, WeekendsActions } from './store/holidays.actions';
import { HolidaysFeature, WeekendsFeature } from './store/holidays.state';

@Component({
  selector: 'app-country-page',
  imports: [CommonModule],
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.scss',
})
export class CountryPageComponent implements OnInit {
  public countryCode = '';

  public selectedYear = new Date().getFullYear();
  public readonly years: number[] = Array.from({ length: 11 }, (_, i) => 2020 + i);

  public weekends$!: Observable<WeekendModel[]>;
  public holidays$!: Observable<PublicHolidayModel[]>;

  private readonly store = inject(Store);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.listenToRouteParams();

    this.weekends$ = this.store.select(WeekendsFeature.selectWeekends);
    this.holidays$ = this.store.select(HolidaysFeature.selectHolidays);
  }

  private listenToRouteParams(): void {
    this.activatedRoute.paramMap
      .pipe(
        map((pm) => (pm.get('countryCode') || '').trim().toUpperCase()),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((code) => {
        if (!code) return;
        this.countryCode = code;

        if (!this.years.includes(this.selectedYear)) {
          this.selectedYear = this.years.at(-1)!;
        }

        this.loadData(this.selectedYear, this.countryCode);
      });
  }

  public onYearSelect(year: number): void {
    if (year === this.selectedYear) return;
    this.selectedYear = year;
    if (!this.countryCode) return;
    this.loadData(year, this.countryCode);
  }

  private loadData(year: number, countryCode: string): void {
    this.store.dispatch(HolidaysActions.loadHolidays({ year, countryCode }));
    this.store.dispatch(WeekendsActions.loadWeekends({ year, countryCode }));
  }
}
