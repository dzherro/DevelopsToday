import { createFeature, createReducer, createSelector, on } from '@ngrx/store';

import { CountryModel } from '../../../core/models/country.model';

import { CountryActions, CountryInfoActions, SearchActions } from './country.actions';
import { CountryInfoModel } from '../../../core/models/country-info.model';

export interface CountryState {
  countries: CountryModel[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

export interface CountryInfoState {
  countryInfo: CountryInfoModel | null;
  loading: boolean;
  error: string | null;
}

export const initialCountryState: CountryState = {
  countries: [],
  loading: false,
  error: null,
  searchQuery: '',
};

export const initialCountryInfoState: CountryInfoState = {
  countryInfo: null,
  loading: false,
  error: null,
};

export const CountryFeature = createFeature({
  name: 'country',
  reducer: createReducer(
    initialCountryState,
    on(CountryActions.loadAvailableCountries, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(CountryActions.loadAvailableCountriesSuccess, (state, { countries }) => ({
      ...state,
      loading: false,
      error: null,
      countries,
    })),
    on(CountryActions.loadAvailableCountriesFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),
    on(SearchActions.searchApplied, (state, { query }) => ({
      ...state,
      searchQuery: query,
    })),
  ),
  extraSelectors: ({ selectCountryState }) => ({
    selectCountries: createSelector(selectCountryState, (state) => state.countries),
    selectSearchQuery: createSelector(selectCountryState, (state) => state.searchQuery),
    selectFilteredCountries: createSelector(selectCountryState, (state) =>
      state.countries.filter((country) =>
        country.name.toLowerCase().includes(state.searchQuery.toLowerCase()),
      ),
    ),
  }),
});

export const CountryInfoFeature = createFeature({
  name: 'countryInfo',
  reducer: createReducer(
    initialCountryInfoState,
    on(CountryInfoActions.loadCountryInfo, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(CountryInfoActions.loadCountryInfoSuccess, (state, { countryInfo }) => ({
      ...state,
      loading: false,
      error: null,
      countryInfo,
    })),
    on(CountryInfoActions.loadCountryInfoFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),
  ),
  extraSelectors: ({ selectCountryInfoState }) => ({
    selectCountryInfo: createSelector(selectCountryInfoState, (state) => state.countryInfo),
  }),
});
