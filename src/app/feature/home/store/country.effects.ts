import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, debounceTime, distinctUntilChanged, exhaustMap, map, of } from 'rxjs';

import { CountryService } from '../../../core/services/country/country.service';
import { CountryActions, CountryInfoActions, SearchActions } from './country.actions';

@Injectable()
export class CountryEffects {
  private actions$ = inject(Actions);
  private countryService = inject(CountryService);

  loadAvailableCountries$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CountryActions.loadAvailableCountries),
      exhaustMap(() =>
        this.countryService.getAvailableCountries().pipe(
          map((countries) => CountryActions.loadAvailableCountriesSuccess({ countries })),
          catchError((error) => of(CountryActions.loadAvailableCountriesFailure({ error: error }))),
        ),
      ),
    );
  });

  loadCountryInfo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CountryInfoActions.loadCountryInfo),
      exhaustMap(({ countryCode }) =>
        this.countryService.getCountryInfo(countryCode).pipe(
          map((countryInfo) => CountryInfoActions.loadCountryInfoSuccess({ countryInfo })),
          catchError((error) => of(CountryInfoActions.loadCountryInfoFailure({ error: error }))),
        ),
      ),
    );
  });

  applySearch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchActions.searchChanged),
      debounceTime(400),
      map(({ query }) => query.trim().toLowerCase()),
      distinctUntilChanged(),
      map((query) => SearchActions.searchApplied({ query })),
    ),
  );
}
