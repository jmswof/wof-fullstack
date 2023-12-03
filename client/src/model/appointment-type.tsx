import { Dayjs } from 'dayjs';
import OptionType from './option-type';
import SaleAgentType from './sale-agent-type';
import UnitedStateType from './united-state-type';

export default interface AppointmentType {
  _id: string;
  active: boolean;
  agent:SaleAgentType;
  date: Dayjs;
  totalRooms:number;
  floorType: OptionType[];
  reference: OptionType[];
  internalNotes: string;
  salesNotes: string;
  colorPreference: OptionType[];
  priority: OptionType[];
  customer: {
    firstName: string;
    lastName: string;
    mobileNumber: string;
    phoneNumber: string;
    email: string;
    address: {
      street1: string;
      city: string;
      ustate: UnitedStateType;
      zipCode: string;
      isResidential: boolean;
    }
  }
}