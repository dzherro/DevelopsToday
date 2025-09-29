import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';
import { CountryModel } from '../../core/models/country.model';
import { PublicHolidayModel } from '../../core/models/public-holiday.model';
import { WeekendModel } from '../../core/models/weekend.model';

@Component({
  selector: 'app-country-item',
  imports: [CommonModule],
  templateUrl: './country-item.component.html',
  styleUrl: './country-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryItemComponent {
  @Input() country!: CountryModel;
  @Input() holiday?: PublicHolidayModel;
  @Input() weekend?: WeekendModel;

  private readonly router = inject(Router);

  public navigateToCountry() {
    this.router.navigate([`/country/${this.country.countryCode}`]);
  }
}
