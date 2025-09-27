import { HolidayTypesEnum } from './holiday-types.enum';

export interface PublicHolidayModel {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  global: boolean;
  counties: string[];
  launchYear: number;
  types: HolidayTypesEnum[];
}
