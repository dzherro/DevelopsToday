import { createAction, props } from '@ngrx/store';

import { CountryModel } from '../../../core/models/country.model';

export const loadAvailableCountries = createAction('[Country] Load Available Countries');

export const loadAvailableCountriesSuccess = createAction(
  '[Country] Load Available Countries Success',
  props<{ countries: CountryModel[] }>(),
);

export const loadAvailableCountriesFailure = createAction(
  '[Country] Load Available Countries Failure',
  props<{ error: string }>(),
);