import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CountryState } from './country.reducer';

export const selectCountryState = createFeatureSelector<CountryState>('country');

export const selectCountries = createSelector(selectCountryState, (s) => s.countries);
