import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import PhoneIcon from '@mui/icons-material/Phone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useAuthContext } from '../../../context/AuthContext';
import { useEffect, useState } from 'react';

const DelegateAppointment: React.FC = () => {

  document.title = 'World of Floors - Delegate Appointment';

  const [floorTypes, setFloorTypes] = useState<[]>([]);
  const [ustates, setUStates] = useState<[]>([]);
  const [references, setReferences] = useState<[]>([]);
  const [colors, setColors] = useState<[]>([]);
  const [priorities, setPriorities] = useState<[]>([]);
  const [agents, setAgents] = useState<object[]>([{}]);
  const [appointments, setAppointments] = useState<object[]>([]);
  const [delegate, setDelegate] = useState<{}>({});
  const {user} = useAuthContext();

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
      fetch(process.env.WOF_SERVER + '/appointments?type=unassigned', {
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
    .then(([ustates, references, priorities, colors, floorTypes, agents, appointments]) => {
      setUStates(ustates);
      setReferences(references);
      setPriorities(priorities);
      setColors(colors);
      setFloorTypes(floorTypes);
      setAgents(agents);
      setAppointments(appointments);
    })
    .catch(error => {
      console.log(error);
    })
  }, []);

  const handleSubmit = async () => {
    if (Object.keys(delegate).length < 1) {
      return; // Nothing's delegated.
    }

    await fetch(process.env.WOF_SERVER + '/appointments', {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
      },
      body: JSON.stringify(delegate)
    })
    .then(response => response.json())
    .then(() => {
      setAppointments([...appointments.filter(appointment => !Object.keys(delegate).some(id => id === appointment['_id']))]);
      setDelegate({});
    });
  }
  
  return (
    <Container component={Paper} sx={{my: 5, p: 2}}>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'} sx={{m: 2}}>
        <Typography variant='h3'>Delegate Appointment</Typography>
        <Typography variant='caption'>{appointments.length} Unassigned Appointments</Typography>
      </Box>
      <TableContainer sx={{maxHeight: '69vh', tableLayout: 'fixed'}}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Date</TableCell>
              <TableCell align='center'>Customer</TableCell>
              <TableCell align='center'>Contact</TableCell>
              <TableCell align='center'>Extras</TableCell>
              <TableCell align='center'>Sale Agent</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { appointments.map(appointment =>
              <TableRow key={appointment['_id']}>
                <TableCell>
                  <Box sx={{ p: 1 }}>
                    <Box>
                      <Typography variant='caption'>
                        {(new Date(appointment['date'])).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant='caption'>
                        {(new Date(appointment['date'])).toLocaleTimeString()}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant='caption'>
                        {appointment['customer'].address.isResidential ? 'Residential' : 'Business'}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ p: 1 }}>
                    <Box><Typography variant='caption'>{appointment['customer'].lastName}, {appointment['customer'].firstName}</Typography></Box>
                    <Box><Typography variant='caption'>{appointment['customer'].address.street1}</Typography></Box>
                    <Box>
                      <Typography variant='caption'>
                        {appointment['customer'].address.city} { ustates.find(state => state['_id'] === appointment['customer'].address.ustate)['short'] } {appointment['customer'].address.zipCode}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display={'flex'} flexDirection={'row'}>
                    <PhoneIcon fontSize='small' sx={{ mr: 1 }} />
                    <Typography variant='caption'>
                      {appointment['customer'].phoneNumber}
                    </Typography>
                  </Box>
                  <Box display={'flex'} flexDirection={'row'}>
                    <PhoneIphoneIcon fontSize='small' sx={{ mr: 1 }} />
                    <Typography variant='caption'>
                      {appointment['customer'].mobileNumber}
                    </Typography>
                  </Box>
                  <Box display={'flex'} flexDirection={'row'}>
                    <MailOutlineIcon fontSize='small' sx={{ mr: 1 }} />
                    <Typography variant='caption'>
                      {appointment['customer'].email}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ p: 1 }}>
                    <Box>
                      <Typography variant='caption'>
                        <b>Color</b> {colors.filter(color => appointment['colorPreference'].includes(color['_id'])).map(color => color['label']).join(', ')}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant='caption'>
                        <b>Floor</b> {floorTypes.filter(floorType => appointment['floorType'].includes(floorType['_id'])).map(floorType => floorType['label']).join(', ')}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant='caption'>
                        <b>Reference</b> {references.filter(reference => appointment['reference'].includes(reference['_id'])).map(reference => reference['label']).join(', ')}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <FormControl sx={{m: 1}} size='small'>
                    <InputLabel>Sale Agent</InputLabel>
                    <Select sx={{width: '20rem'}}
                      defaultValue={''}
                      onChange={ e => {
                        delegate[appointment['_id']] = e.target.value;
                        setDelegate(delegate);
                      }}
                      input={<OutlinedInput label='Sale Agent' />}
                    >
                    { agents.map(agent => {
                      return <MenuItem key={agent['_id']} value={agent['_id']}>{agent['firstName']} {agent['lastName']}</MenuItem>
                    })}
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell align='center' colSpan={5}>
                <Button variant='contained' fullWidth onClick={handleSubmit}>
                  Delegate Agents
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell align='center' colSpan={5}>
                <Typography variant='caption'>{appointments.length} Unassigned Appointments</Typography>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default DelegateAppointment;