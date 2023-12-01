import Alert from '@mui/material/Alert';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useAuthContext } from '../../context/AuthContext';
import {useEffect, useState} from 'react';

interface FilmOptionType {
  inputValue?: string;
  title: string;
  year?: number;
}

interface VendorType {
  inputValue?: string;
  _id?: string;
  label: string;
  short?: string;
  active: boolean;
}

const filter = createFilterOptions<FilmOptionType>();
const vendorFilter = createFilterOptions<VendorType>();

const ProductCost: React.FC = () => {
  const [value, setValue] = useState<FilmOptionType | null>(null);

  document.title = 'World of Floors - Product Cost';

  const {user} = useAuthContext();
  const [floorTypes, setFloorTypes] = useState<object[]>([]);
  const [vendors, setVendors] = useState<VendorType[]>([null]);
  const [vendor, setVendor] = useState<VendorType | null>(null);
  const [boxCost, setBoxCost] = useState<number>(0);
  const [palletCost, setPalletCost] = useState<number>(0);
  const [index, setIndex]= useState<number>(0);

  useEffect(() => {
    Promise.all([
      fetch(`${process.env.WOF_SERVER}/configure/floor-type?type=all`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
        }
      }).then(response => response.json()),
      fetch(`${process.env.WOF_SERVER}/configure/vendor?type=all`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
        }
      }).then(response => response.json())
    ])
    .then(([floorTypes, vendors]) => {
      setFloorTypes(floorTypes);
      setVendors(vendors);
      console.log(vendors);
    }).catch(error => console.log(error));
  }, []);
  
  return (
    <Container component={Paper} sx={{my: 5, p: 2}}>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'} sx={{m: 2}}>
        <Typography variant='h3'>Product Cost</Typography>
      </Box>
      <Tabs value={index} onChange={(e, index) => {
        setIndex(index);
      }}>
        { floorTypes.map(floorType => <Tab key={floorType['_id']} label={floorType['label']} />) }
      </Tabs>

      <TableContainer>
        <Table sx={{ tableLayout: 'fixed'}}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Autocomplete value={value} selectOnFocus clearOnBlur handleHomeEndKeys freeSolo
                // options={top100Films}
                  options={styleCategories}
                  onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                      setValue({ title: newValue });
                    } else if (newValue && newValue.inputValue) {
                      // Create a new value from the user input
                      console.log(newValue);
                      setValue({ title: newValue.inputValue });
                    } else {
                      setValue(newValue);
                    }
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    const { inputValue } = params;
                    // Suggest the creation of a new value
                    const isExisting = options.some((option) => inputValue === option.title);
                    if (inputValue !== '' && !isExisting) {
                      filtered.push({ inputValue, title: `Add "${inputValue}"` });
                    }
                    return filtered;
                  }}
                  getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === 'string') {
                      return option;
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                      return option.inputValue;
                    }
                    // Regular option
                    return option.title;
                  }}
                  renderOption={(props, option) => <li {...props}>{option.title}</li>}
                  renderInput={(params) => {
                    return <TextField {...params} label="Style Category" />
                  }}
                />
              </TableCell>
              <TableCell>
                <Autocomplete options={vendors}
                  renderOption={(props, option) => <li {...props}>{option.label}</li>}
                  getOptionLabel={(option) => {
                    if (option.inputValue) {
                      console.log('interesting input value is new here.');
                      return option.inputValue;
                    }
                    return option.label;
                  }}
                  renderInput={(params) => {
                    return <TextField {...params} label="Style Brand" />
                  }} />
              </TableCell>
              <TableCell>
                <Autocomplete options={vendors} value={vendor} freeSolo
                  filterOptions={(options, params) => {
                    const filtered = vendorFilter(options, params);
                    if (params.inputValue !== '' && !options.some(option => params.inputValue === option.label)) {
                      filtered.push({
                        inputValue: params.inputValue,
                        label: `New "${params.inputValue}"`,
                        active: true
                      });
                    }
                    return filtered;
                  }}
                  getOptionLabel={(option) => {
                    if (typeof option === 'object') {
                      if (option.inputValue)
                        return option.inputValue;

                      return option.label;
                    }
                    return option;
                  }}
                  onChange={(event, vendor) => {
                    if (vendor['inputValue']) {
                      console.log('new value was entered, do a REST call to add new vendor, then setVendors(response), setVendor(vendor)')
                    } else if (typeof vendor === 'object') {
                      console.log('a valid vendor was selected');
                      setVendor(vendor);
                    }
                  }}
                  renderOption={(props, option) => <li {...props}>{option.label}</li>}
                  renderInput={(params) => {
                    return <TextField {...params} label="Vendor" />
                  }} />
              </TableCell>
              <TableCell>
                <FormControl sx={{width: '7rem'}}>
                  <TextField label='Box Cost' type='number' value={boxCost} onChange={e => setBoxCost(parseFloat(e.target.value))} />
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl sx={{width: '7rem'}}>
                  <TextField label='Pallet Cost' type='number' value={palletCost} onChange={e => setPalletCost(parseFloat(e.target.value))} />
                </FormControl>
              </TableCell>
              <TableCell>
                <Button variant='contained'>
                  <Typography>Create Cost</Typography>
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell align='center' colSpan={6}>
                <Typography variant='caption'>Category Product(s)</Typography>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
};

const top100Films: readonly FilmOptionType[] = [
  { title: 'Grand Teton', year: 1994 },
  { title: 'West Coast', year: 1972 },
  { title: 'Rolling Hills', year: 1974 },
  { title: 'West Lake', year: 1974 },
];

let styleCategories: FilmOptionType[] = [
  { title: 'Grand Teton', year: 1994 },
  { title: 'West Coast', year: 1972 },
  { title: 'Rolling Hills', year: 1974 },
  { title: 'West Lake', year: 1974 },
];

export default ProductCost;