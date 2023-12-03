import OptionType from './option-type';

export default interface ProductRateType {
  _id: string;
  active: boolean;
  unit: string;
  floorType: OptionType;
  jobService: OptionType;
  laborType: OptionType;
  customerCost: number;
  laborCost: number;
}