import Alert from '@mui/material/Alert';
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
import { useAuthContext } from '../../../context/AuthContext';
import { useEffect, useState } from 'react';

const LaborRate: React.FC = () => {

  document.title = 'World of Floors - Labor Rate';
  const {user} = useAuthContext();

  const [floorType, setFloorType] = useState<string>('');
  const [laborType, setLaborType] = useState<string>('');
  const [jobService, setJobService] = useState<string>('');
  const [customerCost, setCustomerCost] = useState<string>('');
  const [laborCost, setLaborCost] = useState<string>('');
  const [active, setActive] = useState<boolean>(true);

  const [error, setError] = useState<string>('');
  const [index, setIndex] = useState<number>(0);

  const [laborRates, setLaborRates] = useState<object[]>([]);
  const [floorTypes, setFloorTypes] = useState<object[]>([]);
  const [laborTypes, setLaborTypes] = useState<object[]>([]);
  const [jobServices, setJobServices] = useState<object[]>([]);

  useEffect(() => {
    Promise.all([
      fetch(`${process.env.WOF_SERVER}/configure/labor-rate?type=all`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
        }
      })
      .then(response => response.json()),
      fetch(`${process.env.WOF_SERVER}/configure/labor-type?type=all`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
        }
      })
      .then(response => response.json()),
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
      })
      .then(response => response.json()),
    ])
    .then(([laborRates, laborTypes, floorTypes, jobServices]) => {
      setLaborRates(laborRates);
      setLaborTypes(laborTypes);
      setFloorTypes(floorTypes);
      setJobServices(jobServices);
      setIndex(0);
      setFloorType(floorTypes[0]['_id']);
    })
    .catch(error => {
      console.log('errored out');
    });

  }, []);

  const submitCreate = () => {
    setError('');
    if (!floorType || !jobService || !laborType || !customerCost || !laborCost) {
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
      body: JSON.stringify({floorType, jobService, laborType, laborCost, customerCost, active})
    })
    .then(response => response.json())
    .then(response => {
      if (response.acknowledged === true && response.insertedId != null) {
        setLaborRates([...laborRates, {'_id': response.insertedId, floorType, jobService, laborType, laborCost, customerCost, active}]);
        setJobService('');
        setLaborType('');
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
        setFloorType(floorTypes[index]['_id']);
      }}>
        { floorTypes.map(floorType => <Tab key={floorType['_id']} label={floorType['label']} />) }
      </Tabs>

      <TableContainer sx={{maxHeight: '65vh'}}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <FormControl sx={{ m: 1, width: '11rem'}} size='small' required>
                  <InputLabel>Labor Type</InputLabel>
                  <Select value={laborType} error={!laborType} onChange={e => setLaborType(e.target.value)} input={<OutlinedInput label="Labor Type" />}>
                    {laborTypes.map( laborType => <MenuItem key={laborType['_id']} value={laborType['_id']}>{laborType['label']}</MenuItem> )}
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl sx={{ m: 1, width: '11rem'}} size='small' required>
                  <InputLabel>Job Service</InputLabel>
                  <Select error={!jobService} value={jobService} onChange={e => setJobService(e.target.value)} input={<OutlinedInput label="Job Service" />}>
                    {jobServices.map( jobService => <MenuItem key={jobService['_id']} value={jobService['_id']}>{jobService['label']} ({jobService['unit']})</MenuItem> )}
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl required sx={{ m: 1, width: '7rem'}}>
                  <TextField label='Customer Cost' size='small' type='number' value={customerCost} onChange={(e) => { 
                      setCustomerCost(e.target.value)
                    }}
                     error={!customerCost}
                    inputProps={{ step: 0.01 }}
                    InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                  />
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl required sx={{ m: 1, width: '7rem'}}>
                  <TextField label='Labor Cost' size='small' value={laborCost} type='number' onChange={(e) => setLaborCost(e.target.value)} error={!laborCost}
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
                  <Typography>Create Labor Rate</Typography>
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {laborRates.filter(laborRate => laborRate['floorType'] === floorType).map((laborRate, index) => {
              return (
              <TableRow key={index}>
                <TableCell>
                  <Typography variant='h6'>{laborTypes.find(laborType => laborType['_id'] === laborRate['laborType'])['label']}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='h6'>{jobServices.find(jobService => jobService['_id'] === laborRate['jobService'])['label']}</Typography>
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
              <TableCell align='center' colSpan={6}>
                <Typography variant='caption'>
                  {floorTypes[index] && `${laborRates.filter(laborRate => laborRate['floorType'] === floorType).length} ${floorTypes[index]['label']} Labor Rate(s)`}
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