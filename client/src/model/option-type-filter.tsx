import { FilterOptionsState, createFilterOptions } from '@mui/material';
import OptionType from './option-type';

const filter = createFilterOptions<OptionType>();

export const filterOptions = (options:OptionType[], params: FilterOptionsState<OptionType>) => {
  const filtered = filter(options, params);
  if (params.inputValue !== '' && !options.some(option => params.inputValue === option.label)) {
    filtered.push({
      inputValue: params.inputValue,
      label: `New "${params.inputValue}"`,
      active: true
    });
  }
  return filtered;
};

export const optionLabel = (option) => {
  if (typeof option === 'object') {
    if (option.inputValue)
      return option.inputValue;

    return option.label;
  }
  return option;
};