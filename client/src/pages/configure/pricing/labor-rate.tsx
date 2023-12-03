import Alert from '@mui/material/Alert';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import OptionType from '../../../model/option-type';
import { useAuthContext } from '../../../context/AuthContext';
import { useEffect, useState } from 'react';
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

const LaborRate: React.FC = () => {

  document.title = 'World of Floors - Labor Rate';
  const {user} = useAuthContext();

  const units = ['sqft', 'lnft', 'each'];

  const [floorType, setFloorType] = useState<OptionType | null>(null);
  const [laborType, setLaborType] = useState<OptionType | null>(null);
  const [jobService, setJobService] = useState<OptionType | null>(null);
  const [unit, setUnit] = useState<string>('');
  const [customerCost, setCustomerCost] = useState<string>('');
  const [laborCost, setLaborCost] = useState<string>('');
  const [active, setActive] = useState<boolean>(true);

  const [error, setError] = useState<string>('');
  const [index, setIndex] = useState<number>(0);

  const [laborRates, setLaborRates] = useState<object[]>([null]);
  const [floorTypes, setFloorTypes] = useState<OptionType[]>([null]);
  const [laborTypes, setLaborTypes] = useState<OptionType[]>([null]);
  const [jobServices, setJobServices] = useState<OptionType[]>([null]);

  useEffect(() => {
    Promise.all([
      fetch(`${process.env.WOF_SERVER}/configure/labor-rate?type=all`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
        }
      }).then(response => response.json()),
      fetch(`${process.env.WOF_SERVER}/configure/labor-type?type=all`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
        }
      }).then(response => response.json()),
      fetch(`${process.env.WOF_SERVER}/configure/floor-type?type=all`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
        }
      }).then(response => response.json()),
      fetch(`${process.env.WOF_SERVER}/configure/job-service?type=all`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
        }
      }).then(response => response.json()),
    ]).then(([laborRates, laborTypes, floorTypes, jobServices]) => {
      setLaborRates(laborRates);
      setLaborTypes(laborTypes);
      setFloorTypes(floorTypes);
      setJobServices(jobServices);
      setIndex(0);
      setFloorType(floorTypes[0]);
    }).catch(error => {
      console.log('errored out');
    });

  }, []);

  const submitCreate = () => {
    setError('');
    if (!customerCost || !floorType || !jobService || !laborCost || !laborType || !unit) {
      setError('Empty form fields cannot be added.');
      return;
    }

    fetch(`${process.env.WOF_SERVER}/configure/labor-rate`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
      },
      body: JSON.stringify({
        active,
        customerCost,
        floorType,
        jobService,
        laborCost,
        laborType,
        unit
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response.acknowledged === true && response.insertedId != null) {
        setLaborRates([...laborRates, {'_id': response.insertedId, floorType, jobService, laborType, laborCost, customerCost, unit, active}]);
        setJobService(null);
        setLaborType(null);
        setUnit('');
        setLaborCost('');
        setCustomerCost('');
        setActive(true);
      }
    })
    .catch(() => {
      setError('Please check your form data and try again.');
    })
  }

  return (
    <Container component={Paper} sx={{my: 5, p: 2}}>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'} sx={{m: 2}}>
        <Typography variant='h3'>Labor Rates</Typography>
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
        { floorType && floorTypes.map(floorType => <Tab key={floorType._id} label={floorType.label} />) }
      </Tabs>

      <TableContainer sx={{maxHeight: '65vh'}}>
        <Table stickyHeader sx={{tableLayout: 'fixed'}}>
          <TableHead>
            <TableRow>
              <TableCell>
                <FormControl required sx={{width: '100%'}}>
                  <Autocomplete options={laborTypes} value={laborType} freeSolo clearOnBlur
                    componentsProps={{ popper: { style: { width: 'fit-content' }}}}
                    renderOption={(props, option) => <li {...props}>{option.label}</li>}
                    filterOptions={(options, params) => filterOptions(options, params)}
                    getOptionLabel={(option) => optionLabel(option)}
                    onChange={(event, option) => {
                      if (option['inputValue']) {
                        // a completely new option
                        fetch(`${process.env.WOF_SERVER}/configure/labor-type`, {
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
                            const lt = {'_id': response.insertedId, 'label': option['inputValue'], 'active': true};
                            setLaborTypes([...laborTypes, lt]);
                            setLaborType(lt);
                          }
                        })
                        .catch((error) => console.log(error) )
                      } else if (typeof option === 'object') {
                        // valid existing option was selected
                        setLaborType(option);
                      }
                    }}
                    renderInput={(params) => {
                      return <TextField {...params} label="Labor Type" error={!laborType} value={laborType} />
                    }}
                  />
                </FormControl>
              </TableCell>
              <TableCell>
                <Autocomplete options={jobServices} value={jobService} freeSolo clearOnBlur
                  componentsProps={{ popper: { style: { width: 'fit-content' }}}}
                  renderOption={(props, option) => <li {...props}>{option.label}</li>}
                  filterOptions={(options, params) => filterOptions(options, params)}
                  getOptionLabel={(option) => optionLabel(option)}
                  onChange={(event, option) => {
                    if (option['inputValue']) {
                      // a completely new option
                      console.log('new value was entered, do a REST call to add new jobService, then setJobServices(response), setJobService(jobService)')
                      fetch(`${process.env.WOF_SERVER}/configure/job-service`, {
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
                          const js = {'_id': response.insertedId, 'label': option['inputValue'], 'active': true};
                          setJobServices([...jobServices, js ]);
                          setJobService(js);
                        }
                      })
                      .catch((error) => console.log(error))
                    } else if (typeof option === 'object') {
                      // valid existing option was selected
                      setJobService(option);
                    }
                  }}
                  renderInput={(params) => {
                    return <TextField {...params} label="Job Service" error={!jobService}/>
                  }} />
              </TableCell>
              <TableCell>
                <FormControl sx={{ width: '100%'}} required>
                  <InputLabel error={!unit}>Unit</InputLabel>
                  <Select error={!unit} value={unit} onChange={e => setUnit(e.target.value)} input={<OutlinedInput label="Unit" error={!unit} />}>
                    {units.map( unit => <MenuItem key={unit} value={unit}>{unit}</MenuItem> )}
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl required sx={{ width: '100%'}}>
                  <TextField label='Customer Cost' type='number' value={customerCost} onChange={(e) => { 
                      setCustomerCost(e.target.value)
                    }}
                     error={!customerCost}
                    inputProps={{ step: 0.01 }}
                    InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                  />
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl required sx={{ width: '100%'}}>
                  <TextField label='Labor Cost' value={laborCost} type='number' onChange={(e) => setLaborCost(e.target.value)} error={!laborCost}
                    inputProps={{ step: 0.01 }}
                    InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                  />
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControlLabel label='Active' control={<Checkbox value={active} onChange={e => setActive(!active)} checked={active} />} />
              </TableCell>
              <TableCell>
                <Button fullWidth variant='contained' onClick={submitCreate}>
                  <Typography>Create</Typography>
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {floorType && laborRates.filter(laborRate => laborRate['floorType']._id === floorType._id).map((laborRate, index) => {
              return (
              <TableRow key={index}>
                <TableCell>
                  <Typography variant='h6'>{laborTypes.find(laborType => laborType['_id'] === laborRate['laborType']._id)['label']}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='h6'>{jobServices.find(jobService => jobService['_id'] === laborRate['jobService']._id)['label']}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{laborRate['unit']}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>${(+laborRate['customerCost']).toFixed(2)}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>${(+laborRate['laborCost']).toFixed(2)}</Typography>
                </TableCell>
                <TableCell colSpan={2}>
                  <Typography>{laborRate['active'] ? 'Yes' : 'No'}</Typography>
                </TableCell>
              </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell align='center' colSpan={7}>
                <Typography variant='caption'>
                  {floorTypes[index] && `${laborRates.filter(laborRate => laborRate['floorType']._id === floorType._id).length} ${floorTypes[index]['label']} Labor Rate(s)`}
                </Typography>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default LaborRate;