import { CountryModel } from './country.model';
import { PublicHolidayModel } from './public-holiday.model';
import { WeekendModel } from './weekend.model';

export interface CountryInfoDataModel {
  country: CountryModel;
  holidays: PublicHolidayModel[];
  weekend: WeekendModel;
}
