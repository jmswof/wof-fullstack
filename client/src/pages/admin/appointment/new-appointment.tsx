import Alert from '@mui/material/Alert';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import UnitedStateType from '../../../model/united-state-type';
import OptionType from '../../../model/option-type';
import WofRest from '../../../rest/wof-rest';

const NewAppointment: React.FC = () => {

  document.title = 'World of Floors - New Appointment';

  const wofRest = WofRest();

  const [floorTypes, setFloorTypes] = useState<OptionType[]>([]);
  const [ustates, setUStates] = useState<UnitedStateType[]>([]);
  const [references, setReferences] = useState<OptionType[]>([]);
  const [colors, setColors] = useState<OptionType[]>([]);
  const [priorities, setPriorities] = useState<OptionType[]>([]);
  const [appointments, setAppointments] = useState<object[]>([]);

  const [error, setError] = useState('');

  // Customer Form Data
  const [date, setDate] = useState<Dayjs>(null);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [street1, setStreet1] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [ustate, setUState] = useState<UnitedStateType | null>(null);
  const [zipCode, setZipCode] = useState<string>('');
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [priority, setPriority] = useState<OptionType[]>([]);
  const [reference, setReference] = useState<OptionType[]>([]);
  const [floorType, setFloorType] = useState<OptionType[]>([]);
  const [colorPreference, setColorPreference] = useState<OptionType[]>([]);
  const [internalNotes, setInternalNotes] = useState<string>('');
  const [salesNotes, setSalesNotes] = useState<string>('');
  const [isResidential, setIsResidential] = useState<boolean>(true);
  const [totalRooms, setTotalRooms] = useState<number>(0);

  useEffect(() => {
    Promise.all([
      wofRest.ustate.getAll('all'),
      wofRest.reference.getAll('all'),
      wofRest.priority.getAll('all'),
      wofRest.color.getAll('all'),
      wofRest.floorType.getAll('all'),
      wofRest.appointment.getAll('all')
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

    const appt = {
      _id: null,
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
    };

    wofRest.appointment.create(appt)
    .then(response => {
      if (response.acknowledged && response.insertedId !== null) {
        appt._id = response.insertedId;
        setAppointments([...appointments, appt]);
        // Reset
        setDate(null);
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
        setUState(null);
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
          <TextField label='First Name' value={firstName} error={!firstName} size='small' sx={{m:1}} onChange={e => setFirstName(e.target.value)} />
          <TextField label='Last Name' value={lastName} error={!lastName} size='small' sx={{ m:1 }} onChange={e => setLastName(e.target.value)} />
          <TextField label='Mobile Number' type='tel' value={mobileNumber} error={!mobileNumber} size='small' sx={{ m:1 }} onChange={e => setMobileNumber(e.target.value)} />
          <TextField label='Phone Number' type='tel' value={phoneNumber} error={!phoneNumber} size='small' sx={{ m:1 }} onChange={e => setPhoneNumber(e.target.value)} />
        </Box>
        <Box display={'flex'} flexDirection={'row'}>
          <TextField label='Email' type='email' value={email} error={!email} size='small' sx={{ m:1 }} onChange={e => setEmail(e.target.value)} />
        </Box>
        <Box display={'flex'} flexDirection={'row'}>
          <TextField label='Street Address' value={street1} error={!street1} size='small' sx={{ m:1 }} onChange={e => setStreet1(e.target.value)} />
          <TextField label='City' value={city} error={!city} size='small' sx={{ m:1 }} onChange={e => setCity(e.target.value)} />
          <FormControl sx={{m: 1, width: '13rem'}}>
            <Autocomplete value={ustate} options={ustates} clearOnBlur
              componentsProps={{ popper: { style: { width: 'fit-content' }}}}
              renderOption={(props, option) => <li {...props}>{option.label}</li>}
              renderInput={(params) => <TextField {...params} label="State" error={!ustate} />}
              getOptionLabel={option => option.label}
              onChange={(event, option) => setUState(option)}
              size='small'
            />
          </FormControl>
          <TextField label='Zip Code' value={zipCode} error={!zipCode} size='small' sx={{ m:1 }} onChange={e => setZipCode(e.target.value)} />
          <FormControlLabel label="Is Residential?" control={<Checkbox value={isResidential} onChange={e => setIsResidential(!isResidential)} checked={isResidential} size='small' />} />
        </Box>
        <Box display={'flex'} flexDirection={'row'}>
          <FormControl sx={{m:1, width: '10rem'}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker slotProps={{ textField: { size: 'small', error: !date } }} value={date} onChange={e => setDate(e)} />
            </LocalizationProvider>
          </FormControl>
          <TextField label='Rooms' type='number' value={totalRooms} error={!totalRooms} size='small' sx={{ m:1 }} onChange={e => setTotalRooms(parseInt(e.target.value))} />
        </Box>
        <Box display={'flex'} flexDirection={'row'}>
          <FormControl sx={{m: 1, width: '13rem'}}>
            <Autocomplete value={floorType} options={floorTypes} multiple clearOnBlur
              componentsProps={{ popper: { style: { width: 'fit-content' }}}}
              renderOption={(props, option) => <li {...props}>{option.label}</li>}
              renderInput={(params) => <TextField {...params} label="Floor Type" error={!floorType.length} />}
              getOptionLabel={option => option.label}
              onChange={(event, option) => setFloorType(option)}
              size='small'
            />
          </FormControl>
          <FormControl sx={{m: 1, width: '13rem'}}>
            <Autocomplete value={reference} options={references} multiple clearOnBlur
              componentsProps={{ popper: { style: { width: 'fit-content' }}}}
              renderOption={(props, option) => <li {...props}>{option.label}</li>}
              renderInput={(params) => <TextField {...params} label="Reference" error={!reference.length} />}
              getOptionLabel={option => option.label}
              onChange={(event, option) => setReference(option)}
              size='small'
            />
          </FormControl>
          <FormControl sx={{m: 1, width: '13rem'}}>
            <Autocomplete value={colorPreference} options={colors} multiple clearOnBlur
              componentsProps={{ popper: { style: { width: 'fit-content' }}}}
              renderOption={(props, option) => <li {...props}>{option.label}</li>}
              renderInput={(params) => <TextField {...params} label="Color Preference" error={!colorPreference.length} />}
              getOptionLabel={option => option.label}
              onChange={(event, option) => setColorPreference(option)}
              size='small'
            />
          </FormControl>
          <FormControl sx={{m: 1, width: '13rem'}}>
            <Autocomplete value={priority} options={priorities} multiple clearOnBlur
              componentsProps={{ popper: { style: { width: 'fit-content' }}}}
              renderOption={(props, option) => <li {...props}>{option.label}</li>}
              renderInput={(params) => <TextField {...params} label="Priority" error={!priority.length} />}
              getOptionLabel={option => option.label}
              onChange={(event, option) => setPriority(option)}
              size='small'
            />
          </FormControl>
        </Box>
      </Box>
      <Box component={Paper} sx={{p:2, my:2}} elevation={4}>
        <Typography variant='h6'>Extras</Typography>
        <Box display={'flex'} flexDirection={'row'}>
          <TextField label='Internal Note' multiline value={internalNotes} error={!internalNotes} onChange={event => setInternalNotes(event.target.value)} sx={{ m:1, width: '50%' }} maxRows={4} minRows={4} inputProps={{ maxLength: 512 }} />
          <TextField label='Appointment and Salesperson Notes' multiline value={salesNotes} error={!salesNotes} onChange={event => setSalesNotes(event.target.value)} sx={{ m:1, width: '50%' }} maxRows={4} minRows={4} inputProps={{ maxLength: 512 }} />
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
