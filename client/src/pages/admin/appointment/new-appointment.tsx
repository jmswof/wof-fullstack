import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useAuthContext } from '../../../context/AuthContext';
import { useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs = require('dayjs');

const NewAppointment: React.FC = () => {
  document.title = 'World of Floors - New Appointment';

  // API data
  const {user} = useAuthContext();
  const [floorTypes, setFloorTypes] = useState<[]>([]);
  const [ustates, setUStates] = useState<[]>([]);
  const [references, setReferences] = useState<[]>([]);
  const [colors, setColors] = useState<[]>([]);
  const [priorities, setPriorities] = useState<[]>([]);
  const [appointments, setAppointments] = useState<object[]>([]);

  const [error, setError] = useState('');

  // Customer Form Data
  const [date, setDate] = useState(dayjs());
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [street1, setStreet1] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [ustate, setUState] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [priority, setPriority] = useState<string[]>([]);
  const [reference, setReference] = useState<string[]>([]);
  const [floorType, setFloorType] = useState<string[]>([]);
  const [colorPreference, setColorPreference] = useState<string[]>([]);
  const [internalNotes, setInternalNotes] = useState<string>('');
  const [salesNotes, setSalesNotes] = useState<string>('');
  const [isResidential, setIsResidential] = useState<boolean>(true);
  const [totalRooms, setTotalRooms] = useState<number>(0);

  useEffect(() => {
    Promise.all([
      fetch(`${process.env.WOF_SERVER}/configure/us-state?type=all`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
        }
      })
      .then(response => response.json()),
      fetch(`${process.env.WOF_SERVER}/configure/reference?type=all`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
        }
      })
      .then(response => response.json()),
      fetch(`${process.env.WOF_SERVER}/configure/priority?type=all`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
        }
      })
      .then(response => response.json()),
      fetch(`${process.env.WOF_SERVER}/configure/color?type=all`, {
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
      })
      .then(response => response.json()),
      fetch(`${process.env.WOF_SERVER}/appointments`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
        }
      })
      .then(response => response.json())
    ])
    .then(([ustates, references, priorities, colors, floorTypes, appointments]) => {
      setUStates(ustates);
      setReferences(references);
      setPriorities(priorities);
      setColors(colors);
      setFloorTypes(floorTypes);
      setAppointments(appointments);
    })
    .catch(error => {
      console.log(error);
    })
  }, []);

  const submitCreate = ():void => {
    setError('');
    if (!date || !firstName || !lastName || !street1 || !city || !ustate || !zipCode || !mobileNumber || !phoneNumber || !email || !priority.length || !reference.length || !floorTypes.length || !colorPreference.length || !internalNotes || !salesNotes || !totalRooms) {
      setError('Empty form fields cannot be added.');
      return;
    }

    fetch(`${process.env.WOF_SERVER}/appointments`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
      },
      body: JSON.stringify({
        active: true,
        agent: null,
        date: date,
        totalRooms: totalRooms,
        floorType: floorType,
        reference: reference,
        internalNotes: internalNotes,
        salesNotes: salesNotes,
        colorPreference: colorPreference,
        priority: priority,
        customer: {
          firstName: firstName,
          lastName: lastName,
          mobileNumber: mobileNumber,
          phoneNumber: phoneNumber,
          email: email,
          address: {
            street1: street1,
            city: city,
            ustate: ustate,
            zipCode: zipCode,
            isResidential: isResidential
          }
        }
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response.acknowledged && response.insertedId !== null) {
        setAppointments([...appointments, { _id: response.insertedId, floorTypes: floorTypes, scheduleDate: date }]);
        // Reset
        setDate(dayjs());
        setTotalRooms(0);
        setFloorType([]);
        setReference([]);
        setInternalNotes('');
        setSalesNotes('');
        setColorPreference([]);
        setPriority([]);
        setFirstName('');
        setLastName('');
        setMobileNumber('');
        setPhoneNumber('');
        setEmail('');
        setStreet1('');
        setCity('');
        setUState('');
        setZipCode('');
        setIsResidential(true);
      }
    })
    .catch(error => console.log(error));
  };
  
  return (
    <Container component={Paper} sx={{my: 5, p: 2}}>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'} sx={{m: 2}}>
        <Typography variant='h3'>Schedule New Appointment</Typography>
        <Typography variant='caption'>{appointments.length} Total Appointments</Typography>
      </Box>
      { error && <Box display={'flex'} sx={{m: 3}} justifyContent={'center'}>
          <Alert variant='standard' color='error'>
            <Typography>{error}</Typography>
          </Alert>
        </Box>
        }
      <Box component={Paper} sx={{p:2}} elevation={4}>
        <Typography variant='h6'>Customer</Typography>
        <Box display={'flex'} flexDirection={'row'}>
          <TextField label='First Name' value={firstName} size='small' onChange={e => setFirstName(e.target.value)} sx={{m:1}} />
          <TextField label='Last Name' value={lastName} size='small' onChange={e => setLastName(e.target.value)} sx={{m:1}} />
          <TextField label='Mobile Number' type='tel' value={mobileNumber} size='small' onChange={e => setMobileNumber(e.target.value)} sx={{m:1}} />
          <TextField label='Phone Number' type='tel' value={phoneNumber} size='small' onChange={e => setPhoneNumber(e.target.value)} sx={{m:1}} />
        </Box>
        <Box display={'flex'} flexDirection={'row'}>
          <TextField label='Email' type='email' value={email} size='small' onChange={e => setEmail(e.target.value)} sx={{m:1, width: '50%'}} />
        </Box>
        <Box display={'flex'} flexDirection={'row'}>
          <TextField label='Street Address' value={street1} size='small' onChange={e => setStreet1(e.target.value)} sx={{m:1}} />
          <TextField label='City' value={city} size='small' onChange={e => setCity(e.target.value)} sx={{m:1}} />
          <FormControl sx={{m: 1, width: '13rem'}} size='small'>
            <InputLabel>State</InputLabel>
            <Select value={ustate} onChange={ e => setUState(e.target.value) }
              input={<OutlinedInput label="State" />}
            >
              {ustates.map( ustate => <MenuItem key={ustate['_id']} value={ustate['_id']}>{ustate['label']}</MenuItem> )}
            </Select>
          </FormControl>
          <TextField label='Zip Code' value={zipCode} size='small' onChange={e => setZipCode(e.target.value)} sx={{m:1}} />
          <FormControlLabel label="Is Residential?" control={<Checkbox value={isResidential} onChange={e => setIsResidential(!isResidential)} checked={isResidential} size='small' />} />
        </Box>
        <Box display={'flex'} flexDirection={'row'}>
          <FormControl sx={{m:1, width: '10rem'}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                slotProps={{ textField: { size: 'small' } }}
                value={date}
                //defaultValue={date}
                onChange={e => setDate(e)}
              />
            </LocalizationProvider>
          </FormControl>
          <TextField label='Rooms' type='number' value={totalRooms} size='small' onChange={e => setTotalRooms(parseInt(e.target.value))} sx={{m:1, width: '5rem'}} />
          <FormControl sx={{ m: 1, width: '13rem'}} size='small'>
            <InputLabel>Floor Type</InputLabel>
            <Select
              multiple
              value={floorType}
              onChange={e => setFloorType(typeof e.target.value === 'string' ? [e.target.value] : e.target.value)}
              input={<OutlinedInput label="Floor Type" />}
            >
              {floorTypes.map( floorType => <MenuItem key={floorType['_id']} value={floorType['_id']}>{floorType['label']}</MenuItem> )}
            </Select>
          </FormControl>
        </Box>
        <Box display={'flex'} flexDirection={'row'}>
          <FormControl sx={{m: 1, width: '13rem'}} size='small'>
            <InputLabel>How did you heard about us?</InputLabel>
            <Select value={reference} multiple onChange={ e => setReference(typeof e.target.value === 'string' ? [e.target.value] : e.target.value) }
              input={<OutlinedInput label="How did you heard about us?" />}
            >
              {references.map( reference => <MenuItem key={reference['_id']} value={reference['_id']}>{reference['label']}</MenuItem> )}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box component={Paper} sx={{p:2, my:2}} elevation={4}>
        <Typography variant='h6'>Extras</Typography>
        <Box display={'flex'} flexDirection={'row'}>
          <TextField label='Internal Note' multiline value={internalNotes} onChange={event => setInternalNotes(event.target.value)} sx={{ m:1, width: '94%' }} maxRows={4} minRows={4} inputProps={{ maxLength: 512 }} />
          <TextField label='Appointment and Salesperson Notes' multiline value={salesNotes} onChange={event => setSalesNotes(event.target.value)} sx={{ m:1, width: '94%' }} maxRows={4} minRows={4} inputProps={{ maxLength: 512 }} />
          <Box display={'flex'} flexDirection={'column'}>
            <FormControl sx={{m: 1}} size='small'>
              <InputLabel>Color Preference(s)</InputLabel>
              <Select value={colorPreference} multiple onChange={ e => setColorPreference(typeof e.target.value === 'string' ? [e.target.value] : e.target.value) } input={<OutlinedInput label="Color Preference(s)" />}>
                {colors.map( color => <MenuItem key={color['_id']} value={color['_id']}>{color['label']}</MenuItem> )}
              </Select>
            </FormControl>
            <FormControl sx={{m: 1, width: '10rem'}} size='small'>
              <InputLabel>Priorities</InputLabel>
              <Select value={priority} multiple onChange={ e => setPriority(typeof e.target.value === 'string' ? [e.target.value] : e.target.value) } input={<OutlinedInput label="Priorities" />}>
                {priorities.map( priority => <MenuItem key={priority['_id']} value={priority['_id']}>{priority['label']}</MenuItem> )}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>
      <Box component={Paper} sx={{p:2, my:2}} elevation={4}>
        <Box display={'flex'} flexDirection={'column'}>
          <Button variant='contained' onClick={submitCreate}>
            <Typography>Create</Typography>
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default NewAppointment;
