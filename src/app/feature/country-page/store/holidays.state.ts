import { createFeature, createReducer, createSelector, on } from '@ngrx/store';

import { PublicHolidayModel } from '../../../core/models/public-holiday.model';
import { WeekendModel } from '../../../core/models/weekend.model';

import { HolidaysActions, WeekendsActions } from './holidays.actions';

export interface HolidaysState {
  holidays: PublicHolidayModel[];
  loading: boolean;
  error: string | null;
}

export interface LongWeekendsState {
  weekends: WeekendModel[];
  loading: boolean;
  error: string | null;
}

export const initialHolidaysState: HolidaysState = {
  holidays: [],
  loading: false,
  error: null,
};

export const initialLongWeekendsState: LongWeekendsState = {
  weekends: [],
  loading: false,
  error: null,
};

export const HolidaysFeature = createFeature({
  name: 'holidays',
  reducer: createReducer(
    initialHolidaysState,
    on(HolidaysActions.loadHolidays, (state) => ({ ...state, loading: true, error: null })),
    on(HolidaysActions.loadHolidaysSuccess, (state, { holidays }) => ({
      ...state,
      loading: false,
      error: null,
      holidays,
    })),
    on(HolidaysActions.loadHolidaysFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),
  ),
  extraSelectors: ({ selectHolidaysState }) => ({
    selectHolidays: createSelector(selectHolidaysState, (state) => state.holidays),
  }),
});

export const WeekendsFeature = createFeature({
  name: 'weekends',
  reducer: createReducer(
    initialLongWeekendsState,
    on(WeekendsActions.loadWeekends, (state) => ({ ...state, loading: true, error: null })),
    on(WeekendsActions.loadWeekendsSuccess, (state, { weekends }) => ({
      ...state,
      loading: false,
      error: null,
      weekends,
    })),
    on(WeekendsActions.loadWeekendsFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),
  ),
  extraSelectors: ({ selectWeekendsState }) => ({
    selectWeekends: createSelector(selectWeekendsState, (state) => state.weekends),
  }),
});
