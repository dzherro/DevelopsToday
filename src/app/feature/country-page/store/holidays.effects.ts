import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, exhaustMap, map, of } from 'rxjs';

import { HolidaysService } from '../../../core/services/holidays/holidays.service';
import { HolidaysActions, WeekendsActions } from './holidays.actions';

@Injectable()
export class HolidaysEffects {
  private actions$ = inject(Actions);
  private holidayService = inject(HolidaysService);

  loadHolidays$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(HolidaysActions.loadHolidays),
      exhaustMap((action) =>
        this.holidayService.getHolidays(action.year, action.countryCode).pipe(
          map((holidays) => HolidaysActions.loadHolidaysSuccess({ holidays })),
          catchError((error) => of(HolidaysActions.loadHolidaysFailure({ error }))),
        ),
      ),
    );
  });

  loadLongWeekends$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WeekendsActions.loadWeekends),
      exhaustMap((action) =>
        this.holidayService.getLongWeekends(action.year, action.countryCode).pipe(
          map((weekends) => WeekendsActions.loadWeekendsSuccess({ weekends })),
          catchError((error) => of(WeekendsActions.loadWeekendsFailure({ error }))),
        ),
      ),
    );
  });
}
