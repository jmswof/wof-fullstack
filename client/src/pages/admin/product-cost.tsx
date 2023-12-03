import Alert from '@mui/material/Alert';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
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
import OptionType from '../../model/option-type';
import ProductCostType from '../../model/product-cost';
import { useAuthContext } from '../../context/AuthContext';
import {useEffect, useState} from 'react';
import { FilterOptionsState, createFilterOptions } from '@mui/material';

const filter = createFilterOptions<OptionType>();

const filterOptions = (options:OptionType[], params: FilterOptionsState<OptionType>) => {
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

const optionLabel = (option) => {
  if (typeof option === 'object') {
    if (option.inputValue)
      return option.inputValue;

    return option.label;
  }
  return option;
};

const ProductCost: React.FC = () => {

  document.title = 'World of Floors - Product Cost';

  const {user} = useAuthContext();
  const [floorTypes, setFloorTypes] = useState<OptionType[]>([]);
  const [vendors, setVendors] = useState<OptionType[]>([]);
  const [productCosts, setProductCosts] = useState<ProductCostType[]>([]);
  const [productCategories, setProductCategories] = useState<OptionType[]>([]);
  const [productBrands, setProductBrands] = useState<OptionType[]>([]);
  const [vendor, setVendor] = useState<OptionType | null>(null);
  const [productCategory, setProductCategory] = useState<OptionType | null>(null);
  const [productBrand, setProductBrand] = useState<OptionType | null>(null);
  const [floorType, setFloorType] = useState<OptionType | null>(null);
  const [boxCost, setBoxCost] = useState<number>(0);
  const [palletCost, setPalletCost] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [index, setIndex]= useState<number>(0);
  const [active, setActive] = useState<boolean>(true);

  useEffect(() => {
    Promise.all([
      fetch(`${process.env.WOF_SERVER}/configure/floor-type?type=all`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
        }
      }).then(response => response.json()),
      fetch(`${process.env.WOF_SERVER}/configure/product-brand?type=all`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
        }
      }).then(response => response.json()),
      fetch(`${process.env.WOF_SERVER}/configure/product-category?type=all`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
        }
      }).then(response => response.json()),
      fetch(`${process.env.WOF_SERVER}/configure/product-cost?type=all`, {
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
    .then(([floorTypes, productBrands, productCategories, productCosts, vendors]) => {
      setIndex(0);
      setFloorType(floorTypes[0]);
      setFloorTypes(floorTypes);
      setProductBrands(productBrands);
      setProductCategories(productCategories);
      setProductCosts(productCosts);
      setVendors(vendors);
    }).catch(error => console.log(error));
  }, []);

  const submitCreate = () => {
    setError('');
    console.log(!boxCost, !palletCost, !floorType, !productBrand, !productCategory, !vendor);
    if (!boxCost || !floorType || !palletCost || !vendor || !productBrand || !productCategory) {
      setError('Empty form fields cannot be added.');
      return;
    }

    fetch(`${process.env.WOF_SERVER}/configure/product-cost`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
      },
      body: JSON.stringify({
        active,
        boxCost,
        floorType,
        palletCost,
        productBrand,
        productCategory,
        vendor
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response.acknowledged === true && response.insertedId != null) {
        setProductCosts([...productCosts, {'_id': response.insertedId, active, boxCost, floorType, palletCost, productBrand, productCategory, vendor}]);
        setActive(true);
        setBoxCost(0);
        setPalletCost(0);
        setProductBrand(null);
        setProductCategory(null);
        setVendor(null);
      }
    })
    .catch(() => {
      setError('Please check your form data and try again.');
    })
  }
  
  return (
    <Container component={Paper} sx={{my: 5, p: 2}}>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'} sx={{m: 2}}>
        <Typography variant='h3'>Product Cost</Typography>
      </Box>
      { error && <Box display={'flex'} sx={{m: 3}} justifyContent={'center'}>
        <Alert variant='standard' color='error'>
          <Typography>{error}</Typography>
        </Alert>
      </Box>
      }
      <Tabs value={index} onChange={(e, index) => {
        setIndex(index);
        setFloorType(floorTypes[index]);
      }}>
        { floorTypes.map(floorType => <Tab key={floorType['_id']} label={floorType['label']} />) }
      </Tabs>

      <TableContainer>
        <Table sx={{ tableLayout: 'fixed'}}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Autocomplete value={productCategory} options={productCategories} clearOnBlur freeSolo
                  filterOptions={(options, params) => filterOptions(options, params)}
                  getOptionLabel={(option) => optionLabel(option)}
                  renderOption={(props, option) => <li {...props}>{option.label}</li>}
                  renderInput={(params) => <TextField {...params} label="Product Category" error={!productCategory} />}
                  onChange={(event, option) => {
                    if (option['inputValue']) {
                      // a completely new option
                      fetch(`${process.env.WOF_SERVER}/configure/product-category`, {
                        method: 'POST',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
                        },
                        body: JSON.stringify({label: option['inputValue'], active: true})
                      })
                      .then(response => response.json())
                      .then(response => {
                        if (response.acknowledged === true && response.insertedId != null) {
                          const pc = {'_id': response.insertedId, 'label': option['inputValue'], 'active': true};
                          setProductCategories([...productCategories, pc]);
                          setProductCategory(pc);
                        }
                      })
                      .catch((error) => console.log(error) )
                    } else if (typeof option === 'object') {
                      // valid existing option was selected
                      setProductCategory(option);
                    }
                  }}
                />
              </TableCell>
              <TableCell>
                <Autocomplete value={productBrand} options={productBrands} clearOnBlur freeSolo
                  filterOptions={(options, params) => filterOptions(options, params)}
                  getOptionLabel={(option) => optionLabel(option)}
                  renderOption={(props, option) => <li {...props}>{option.label}</li>}
                  renderInput={(params) => <TextField {...params} label="Product Brand" error={!productBrand} />}
                  onChange={(event, option) => {
                    if (option['inputValue']) {
                      // a completely new option
                      fetch(`${process.env.WOF_SERVER}/configure/product-brand`, {
                        method: 'POST',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
                        },
                        body: JSON.stringify({label: option['inputValue'], active: true})
                      })
                      .then(response => response.json())
                      .then(response => {
                        if (response.acknowledged === true && response.insertedId != null) {
                          const pb = {'_id': response.insertedId, 'label': option['inputValue'], 'active': true};
                          setProductBrands([...productBrands, pb]);
                          setProductBrand(pb);
                        }
                      })
                      .catch((error) => console.log(error) )
                    } else if (typeof option === 'object') {
                      // valid existing option was selected
                      setProductBrand(option);
                    }
                  }}
                />
              </TableCell>
              <TableCell>
                <Autocomplete value={vendor} options={vendors} clearOnBlur freeSolo
                  filterOptions={(options, params) => filterOptions(options, params)}
                  getOptionLabel={(option) => optionLabel(option)}
                  renderOption={(props, option) => <li {...props}>{option.label}</li>}
                  renderInput={(params) => <TextField {...params} label="Vendor" error={!vendor} />}
                  onChange={(event, option) => {
                    if (option['inputValue']) {
                      // a completely new option
                      fetch(`${process.env.WOF_SERVER}/configure/vendor`, {
                        method: 'POST',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
                        },
                        body: JSON.stringify({label: option['inputValue'], active: true})
                      })
                      .then(response => response.json())
                      .then(response => {
                        if (response.acknowledged === true && response.insertedId != null) {
                          const v = {'_id': response.insertedId, 'label': option['inputValue'], 'active': true};
                          setVendors([...vendors, v]);
                          setVendor(v);
                        }
                      })
                      .catch((error) => console.log(error) )
                    } else if (typeof option === 'object') {
                      // valid existing option was selected
                      setVendor(option);
                    }
                  }}
                />
              </TableCell>
              <TableCell>
                <FormControl sx={{width: '100%'}}>
                  <TextField label='Box Cost' type='number' value={boxCost} onChange={e => setBoxCost(parseFloat(e.target.value))} error={!boxCost}
                    inputProps={{ step: 0.01 }}
                    InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                  />
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl sx={{width: '100%'}}>
                  <TextField label='Pallet Cost' type='number' value={palletCost} onChange={e => setPalletCost(parseFloat(e.target.value))} error={!palletCost}
                    inputProps={{ step: 0.01 }}
                    InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                  />
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControlLabel label='Active' control={<Checkbox value={active} onChange={e => setActive(!active)} checked={active} />} />
              </TableCell>
              <TableCell>
                <FormControl sx={{width: '100%'}}>
                  <Button variant='contained' onClick={submitCreate}>
                    <Typography>Create</Typography>
                  </Button>
                </FormControl>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {floorType && productCosts.filter(productCost => productCost['floorType']._id === floorType._id).map((productCost) => {
              return (
              <TableRow key={productCost._id}>
                <TableCell>{productCost.productCategory.label}</TableCell>
                <TableCell>{productCost.productBrand.label}</TableCell>
                <TableCell>{productCost.vendor.label}</TableCell>
                <TableCell>{productCost.boxCost}</TableCell>
                <TableCell>{productCost.palletCost}</TableCell>
                <TableCell colSpan={2}><Typography>{productCost.active ? 'Yes' : 'No'}</Typography></TableCell>
              </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell align='center' colSpan={7}>
                <Typography variant='caption'>
                  {floorTypes[index] && `${productCosts.filter(productCost => productCost.floorType._id === floorType._id).length} ${floorTypes[index]['label']} Product Cost(s)`}
                </Typography>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ProductCost;