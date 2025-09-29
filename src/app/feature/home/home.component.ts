import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Store } from '@ngrx/store';

import { Observable, Subject, take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { CountryActions, SearchActions } from './store/country.actions';
import { CountryFeature } from './store/country.state';
import { CountryModel } from '../../core/models/country.model';

import { CountryItemComponent } from '../country-item/country-item.component';
import { RandomCountriesWidgetComponent } from '../random-countries-widget/random-countries-widget.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CountryItemComponent, RandomCountriesWidgetComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);

  public year = 2025;
  public maxItems = 3;

  public search$ = new Subject<string>();

  public countries$!: Observable<CountryModel[]>;

  ngOnInit(): void {
    this.store.dispatch(CountryActions.loadAvailableCountries({ countries: [] }));

    this.countries$ = this.store.select(CountryFeature.selectFilteredCountries);

    this.store
      .select(CountryFeature.selectSearchQuery)
      .pipe(take(1))
      .subscribe((query) => this.search$.next(query));

    this.search$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((query) => this.store.dispatch(SearchActions.searchChanged({ query })));
  }

  public onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.search$.next(value);
  }
}
