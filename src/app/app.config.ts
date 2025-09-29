import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { CountryEffects } from './feature/home/store/country.effects';
import { HolidaysEffects } from './feature/country-page/store/holidays.effects';

import { CountryFeature, CountryInfoFeature } from './feature/home/store/country.state';
import { HolidaysFeature, WeekendsFeature } from './feature/country-page/store/holidays.state';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideRouter(routes),
    provideStore(),
    provideState(CountryFeature),
    provideState(HolidaysFeature),
    provideState(WeekendsFeature),
    provideState(CountryInfoFeature),
    provideEffects(CountryEffects, HolidaysEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
