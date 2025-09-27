import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { CountryService } from '../../../core/services/country.service';
import * as CountryActions from './country.actions';


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
          catchError(() => of(CountryActions.loadAvailableCountriesFailure({ error: 'Error loading countries' }))),
        ),
      ),
    );
  });
}
 