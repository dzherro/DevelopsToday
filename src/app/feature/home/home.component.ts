import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { loadAvailableCountries } from './store/country.actions';
import { selectCountries } from './store/country.selectors';
import { CountryModel } from '../../core/models/country.model';
import { Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {

  private readonly store = inject(Store);

  public countries$!: Observable<CountryModel[]>;

  ngOnInit(): void {
    this.store.dispatch(loadAvailableCountries());

    this.countries$ = this.store.select(selectCountries).pipe(
      tap((countries) => {
        console.log(countries);
      })
    );
  }
}
