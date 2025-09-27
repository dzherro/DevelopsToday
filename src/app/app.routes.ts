import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { countryReducer } from './feature/home/store/country.reducer';
import { CountryEffects } from './feature/home/store/country.effects';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadComponent: () => import('./feature/home/home.component').then((m) => m.HomeComponent),
    providers: [provideState('country', countryReducer), provideEffects(CountryEffects)],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];
