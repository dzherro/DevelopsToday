import { createActionGroup, props } from '@ngrx/store';

import { CountryModel } from '../../../core/models/country.model';
import { CountryInfoModel } from '../../../core/models/country-info.model';

export const CountryActions = createActionGroup({
  source: 'Country',
  events: {
    'Load Available Countries': props<{ countries: CountryModel[] }>(),
    'Load Available Countries Success': props<{ countries: CountryModel[] }>(),
    'Load Available Countries Failure': props<{ error: string }>(),
  },
});

export const CountryInfoActions = createActionGroup({
  source: 'Country Info',
  events: {
    'Load Country Info': props<{ countryCode: string }>(),
    'Load Country Info Success': props<{ countryInfo: CountryInfoModel }>(),
    'Load Country Info Failure': props<{ error: string }>(),
  },
});

export const SearchActions = createActionGroup({
  source: 'Search',
  events: {
    'Search Changed': props<{ query: string }>(),
    'Search Applied': props<{ query: string }>(),
  },
});
