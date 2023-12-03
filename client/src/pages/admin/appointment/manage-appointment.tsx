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
import { useParams } from 'react-router-dom';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SaleAgentType from '../../../model/sale-agent-type';
import AppointmentType from '../../../model/appointment-type';
import UnitedStateType from '../../../model/united-state-type';
import OptionType from '../../../model/option-type';
import WofRest from '../../../rest/wof-rest';
import { Dayjs } from 'dayjs';
import dayjs = require('dayjs');

const ManageAppointment: React.FC = () => {

  document.title = 'World of Floors - Manage Appointment';
  const { appointmentId } = useParams();

  const wofRest = WofRest();

  const [saleAgents, setSaleAgents] = useState<SaleAgentType[]>([]);
  const [floorTypes, setFloorTypes] = useState<OptionType[]>([]);
  const [ustates, setUStates] = useState<UnitedStateType[]>([]);
  const [references, setReferences] = useState<OptionType[]>([]);
  const [colors, setColors] = useState<OptionType[]>([]);
  const [priorities, setPriorities] = useState<OptionType[]>([]);
  const [appointment, setAppointment] = useState<AppointmentType | null>(null);

  const [active, setActive] = useState<boolean>(true);
  const [agent, setAgent] = useState<SaleAgentType | null>(null);
  const [date, setDate] = useState<Dayjs | null>(null);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [street1, setStreet1] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [ustate, setUState] = useState<UnitedStateType>(null);
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
      wofRest.appointment.get(appointmentId),
      wofRest.color.getAll('all'),
      wofRest.floorType.getAll('all'),
      wofRest.priority.getAll('all'),
      wofRest.reference.getAll('all'),
      wofRest.saleAgent.getAll('all'),
      wofRest.ustate.getAll('all'),
    ])
    .then(([appointment, colors, floorTypes, priorities, references, saleAgents, ustates]) => {
      setAppointment(appointment);
      setColors(colors);
      setFloorTypes(floorTypes);
      setPriorities(priorities);
      setReferences(references);
      setSaleAgents(saleAgents)
      setUStates(ustates);

      setActive(appointment.active);
      setAgent(appointment.agent);
      setCity(appointment.customer.address.city);
      setColorPreference(appointment.colorPreference);
      setDate(dayjs(appointment.date));
      setEmail(appointment.customer.email);
      setFirstName(appointment.customer.firstName);
      setFloorType(appointment.floorType);
      setInternalNotes(appointment.internalNotes);
      setIsResidential(appointment.customer.address.isResidential);
      setLastName(appointment.customer.lastName);
      setMobileNumber(appointment.customer.mobileNumber);
      setPhoneNumber(appointment.customer.phoneNumber);
      setPriority(appointment.priority);
      setReference(appointment.reference);
      setSalesNotes(appointment.salesNotes);
      setStreet1(appointment.customer.address.street1);
      setTotalRooms(appointment.totalRooms);
      setUState(appointment.customer.address.ustate);
      setZipCode(appointment.customer.address.zipCode);
    })
    .catch(error => console.log(error))
  }, []);

  const appt = {
    _id: appointmentId,
    active,
    agent,
    date,
    totalRooms,
    floorType,
    reference,
    internalNotes,
    salesNotes,
    colorPreference,
    priority,
    customer: {
      firstName,
      lastName,
      mobileNumber,
      phoneNumber,
      email,
      address: {
        street1,
        city,
        ustate,
        zipCode,
        isResidential,
      }
    }
  };

  const handleSubmit = () => {
    wofRest.appointment.update(appt).then(response => console.log(response));
  }

  return (
    <Container component={Paper} sx={{my: 5, p: 2}}>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'} sx={{m: 2}}>
        <Typography variant='h3'>Manage Appointment</Typography>
        <Typography variant='caption'>Appointment: {date !== null && date.format('MM/DD/YYYY')} {date !== null && date.format('HH:mmA')}</Typography>
      </Box>
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
          <FormControl sx={{m: 1, width: '13rem'}}>
            <Autocomplete value={ustate} options={ustates} clearOnBlur
              componentsProps={{ popper: { style: { width: 'fit-content' }}}}
              renderOption={(props, option) => <li {...props}>{option.label}</li>}
              renderInput={(params) => <TextField {...params} label="State" error={!ustate} />}
              getOptionLabel={option => option.label}
              isOptionEqualToValue={(option, value) => option._id === value._id}
              onChange={(event, option) => {
                console.log(option);
                setUState(option);
              }}
              size='small'
            />
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
                onChange={e => setDate(e)}
              />
            </LocalizationProvider>
          </FormControl>
          <TextField label='Rooms' type='number' value={totalRooms} size='small' onChange={e => setTotalRooms(parseInt(e.target.value))} sx={{m:1, width: '5rem'}} />
          <FormControlLabel sx={{m: 1}} label="Active?" control={<Checkbox value={active} onChange={e => setActive(!active)} checked={active} size='small' />} />
          <FormControl sx={{m: 1, width: '13rem'}}>
            <Autocomplete value={agent} options={saleAgents} clearOnBlur
              componentsProps={{ popper: { style: { width: 'fit-content' }}}}
              renderOption={(props, option) => <li {...props}>{option.firstName} {option.lastName}</li>}
              renderInput={(params) => <TextField {...params} label="Sale Agent" />}
              getOptionLabel={option => `${option.firstName} ${option.lastName}`}
              onChange={(event, option) => setAgent(option)}
              isOptionEqualToValue={(option, value) => option._id === value._id}
              size='small'
            />
          </FormControl>
        </Box>
        <Box display={'flex'} flexDirection={'row'}>
          <FormControl sx={{m: 1, width: '13rem'}}>
            <Autocomplete value={floorType} options={floorTypes} multiple clearOnBlur
              componentsProps={{ popper: { style: { width: 'fit-content' }}}}
              renderOption={(props, option) => <li {...props}>{option.label}</li>}
              renderInput={(params) => <TextField {...params} label="Floor Type" error={!floorType.length} />}
              getOptionLabel={option => option.label}
              isOptionEqualToValue={(option, value) => option._id === value._id}
              onChange={(event, option) => setFloorType(option)}
              size='small'
            />
          </FormControl>
          <FormControl sx={{m: 1, width: '13rem'}}>
            <Autocomplete value={colorPreference} options={colors} multiple clearOnBlur
              componentsProps={{ popper: { style: { width: 'fit-content' }}}}
              renderOption={(props, option) => <li {...props}>{option.label}</li>}
              renderInput={(params) => <TextField {...params} label="Color Preference" />}
              getOptionLabel={option => option.label}
              isOptionEqualToValue={(option, value) => option._id === value._id}
              onChange={(event, option) => setColorPreference(option)}
              size='small'
            />
          </FormControl>
          <FormControl sx={{m: 1, width: '13rem'}}>
            <Autocomplete value={priority} options={priorities} multiple clearOnBlur
              componentsProps={{ popper: { style: { width: 'fit-content' }}}}
              renderOption={(props, option) => <li {...props}>{option.label}</li>}
              renderInput={(params) => <TextField {...params} label="Priority" />}
              getOptionLabel={option => option.label}
              isOptionEqualToValue={(option, value) => option._id === value._id}
              onChange={(event, option) => setPriority(option)}
              size='small'
            />
          </FormControl>
          <FormControl sx={{m: 1, width: '13rem'}}>
            <Autocomplete value={reference} options={references} multiple clearOnBlur
              componentsProps={{ popper: { style: { width: 'fit-content' }}}}
              renderOption={(props, option) => <li {...props}>{option.label}</li>}
              renderInput={(params) => <TextField {...params} label="Reference" />}
              getOptionLabel={option => option.label}
              isOptionEqualToValue={(option, value) => option._id === value._id}
              onChange={(event, option) => setReference(option)}
              size='small'
            />
          </FormControl>
        </Box>
      </Box>
      <Box component={Paper} sx={{p:2, my:2}} elevation={4}>
        <Typography variant='h6'>Extras</Typography>
        <Box display={'flex'} flexDirection={'row'}>
          <TextField label='Internal Note' multiline value={internalNotes} onChange={event => setInternalNotes(event.target.value)} sx={{ m:1, width: '94%' }} maxRows={4} minRows={4} inputProps={{ maxLength: 512 }} />
          <TextField label='Appointment and Salesperson Notes' multiline value={salesNotes} onChange={event => setSalesNotes(event.target.value)} sx={{ m:1, width: '94%' }} maxRows={4} minRows={4} inputProps={{ maxLength: 512 }} />
        </Box>
      </Box>
      <Box component={Paper} sx={{p:2, my:2}} elevation={4}>
        <Box display={'flex'} flexDirection={'column'}>
          <Button variant='contained' onClick={handleSubmit} disabled={!appointment}>
            <Typography>Update Appointment</Typography>
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ManageAppointment;