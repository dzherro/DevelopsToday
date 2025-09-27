import { createReducer, on } from '@ngrx/store';

import { CountryModel } from '../../../core/models/country.model';
import * as CountryActions from './country.actions';

export interface CountryState {
  countries: CountryModel[];
  loading: boolean;
  error: string | null;
}

export const initialState: CountryState = {
  countries: [],
  loading: false,
  error: null,
};

export const countryReducer = createReducer(
  initialState,
  on(CountryActions.loadAvailableCountries, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CountryActions.loadAvailableCountriesSuccess, (state, { countries }) => ({
    ...state,
    loading: false,
    countries,
  })),
  on(CountryActions.loadAvailableCountriesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);