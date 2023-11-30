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
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../../context/AuthContext';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs = require('dayjs');

const ManageAppointment: React.FC = () => {
  document.title = 'World of Floors - Manage Appointment';

  const { appointmentId } = useParams();
  const { user } = useAuthContext();

  const [saleAgents, setSaleAgents] = useState<object[]>([]);
  const [floorTypes, setFloorTypes] = useState<[]>([]);
  const [ustates, setUStates] = useState<[]>([]);
  const [references, setReferences] = useState<[]>([]);
  const [colors, setColors] = useState<[]>([]);
  const [priorities, setPriorities] = useState<[]>([]);
  const [appointment, setAppointment] = useState<object>({});

  const [active, setActive] = useState<boolean>(true);
  const [agent, setAgent] = useState<string>('');
  const [date, setDate] = useState(dayjs(new Date()));
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
      fetch(process.env.WOF_SERVER + '/configure/sale-agent?type=all', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
        }
      })
      .then(response => response.json()),
      fetch(`${process.env.WOF_SERVER}/appointments?type=single&id=${appointmentId}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
        }
      })
      .then(response => response.json()),
    ])
    .then(([ustates, references, priorities, colors, floorTypes, saleAgents, appointment]) => {
      setUStates(ustates);
      setReferences(references);
      setPriorities(priorities);
      setColors(colors);
      setFloorTypes(floorTypes);
      setSaleAgents([{
        _id: '0', firstName: 'Unassign', lastName: '', active: false, firebase: {}
      }].concat(saleAgents));
      setAppointment(appointment);
      setDate(dayjs(appointment['date']));
      setFirstName(appointment['customer']['firstName']);
      setLastName(appointment['customer']['lastName']);
      setMobileNumber(appointment['customer'].mobileNumber);
      setPhoneNumber(appointment['customer'].phoneNumber);
      setEmail(appointment['customer'].email);
      setStreet1(appointment['customer'].address.street1);
      setCity(appointment['customer'].address.city);
      setUState(appointment['customer'].address.ustate);
      setZipCode(appointment['customer'].address.zipCode);
      setIsResidential(appointment['customer'].address.isResidential);
      setDate(dayjs(appointment['date']));
      setTotalRooms(appointment['totalRooms']);
      setActive(appointment['active']);
      setAgent(
        appointment['agent'] ? saleAgents.find(agent => agent['_id'] === appointment['agent'])['_id'] : '0'
      )
      setFloorType(
        floorTypes.filter(floorType => appointment['floorType'].includes(floorType['_id'])).map(floorType => floorType['_id'])
      );
      setReference(
        references.filter(reference => appointment['reference'].includes(reference['_id'])).map(reference => reference['_id'])
      );
      setInternalNotes(appointment['internalNotes']);
      setSalesNotes(appointment['salesNotes']);
      setColorPreference(
        colors.filter(color => appointment['colorPreference'].includes(color['_id'])).map(color => color['_id'])
      );
      setPriority(
        priorities.filter(priority => appointment['priority'].includes(priority['_id'])).map(priority => priority['_id'])
      );
    })
    .catch(error => {
      console.log(error);
    })
  }, []);

  const handleSubmit = async () => {
    await fetch(`${process.env.WOF_SERVER}/appointments`, {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
      },
      body: JSON.stringify({
        _id: appointmentId,
        active,
        agent: agent !== '0' ? agent : null,
        date: date.toISOString(),
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
      })
    })
    .then(response => response.json())
    .then(response => {
      console.log(response)
    });
  }

  return (
    <Container component={Paper} sx={{my: 5, p: 2}}>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'} sx={{m: 2}}>
        <Typography variant='h3'>Manage Appointment</Typography>
        <Typography variant='caption'>Appointment: {(new Date(appointment['date'])).toLocaleDateString()} {(new Date(appointment['date'])).toLocaleTimeString()}</Typography>
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
          <FormControlLabel sx={{m: 1}} label="Active?" control={<Checkbox value={active} onChange={e => setActive(!active)} checked={active} size='small' />} />
          <FormControl sx={{m: 1, width: '13rem'}} size='small'>
            <InputLabel>Sale Agent</InputLabel>
            <Select value={agent} onChange={ e => {
                setAgent(e.target.value);
              }}
              input={<OutlinedInput label='Sale Agent' />}
            >
            { saleAgents.map(agent => {
              return <MenuItem key={agent['_id']} value={agent['_id']}>{agent['firstName']} {agent['lastName']}</MenuItem>
            })}
            </Select>
          </FormControl>
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
          <Button variant='contained' onClick={handleSubmit} disabled={Object.keys(appointment).length < 1}>
            <Typography>Update Appointment</Typography>
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ManageAppointment;