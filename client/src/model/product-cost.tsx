import OptionType from './option-type';

export default interface ProductCostType {
  _id: string;
  active: boolean;
  boxCost: number;
  floorType: OptionType;
  palletCost: number;
  productBrand: OptionType;
  productCategory: OptionType;
  vendor: OptionType;
}