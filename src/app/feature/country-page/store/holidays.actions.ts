import { createActionGroup, props } from '@ngrx/store';

import { PublicHolidayModel } from '../../../core/models/public-holiday.model';
import { WeekendModel } from '../../../core/models/weekend.model';

export const HolidaysActions = createActionGroup({
  source: 'Holidays',
  events: {
    'Load Holidays': props<{ year: number; countryCode: string }>(),
    'Load Holidays Success': props<{ holidays: PublicHolidayModel[] }>(),
    'Load Holidays Failure': props<{ error: string }>(),
  },
});

export const WeekendsActions = createActionGroup({
  source: 'Weekends',
  events: {
    'Load Weekends': props<{ year: number; countryCode: string }>(),
    'Load Weekends Success': props<{ weekends: WeekendModel[] }>(),
    'Load Weekends Failure': props<{ error: string }>(),
  },
});
