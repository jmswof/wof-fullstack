import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useAuthContext } from '../../context/AuthContext';
import { FormEvent, useEffect, useState } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';

const Appointment: React.FC = () => {
  document.title = 'World of Floors - Appointments';

  const {user} = useAuthContext();
  const [agents, setAgents] = useState<[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<string>('');
  const [floorTypes, setFloorTypes] = useState<[]>([]);
  const [selectedFloorTypes, setSelectedFloorTypes] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [appointments, setAppointments] = useState<object[]>([]);
  const [selection, setSelection] = useState(new Array(appointments.length).fill(''));

  const handleSelection = (e:FormEvent<HTMLInputElement>, id:string):void => {
    const index = selection.indexOf(id);
    if (index < 0)
      selection.push(id);
    else
      selection.splice(index, 1);

    setSelection([...selection]);
  }

  const submitCreate = ():void => {

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
        agent: selectedAgent,
        floorTypes: selectedFloorTypes,
        scheduleDate: selectedDate
      })
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
      if (response.acknowledged && response.insertedId !== null) {
        setAppointments([...appointments, { _id: response.insertedId, agent: selectedAgent, floorTypes: selectedFloorTypes, scheduleDate: selectedDate }]);
        setSelectedAgent('');
        setSelectedDate(undefined);
        setSelectedFloorTypes([])
      }
    })
    .catch(error => console.log(error));
  };

  useEffect(() => {
    Promise.all([
      fetch(process.env.WOF_SERVER + '/users', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
        }
      })
      .then(response => response.json()),
      fetch(`${process.env.WOF_SERVER}/configure/floor-type`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
        }
      })
      .then(response => response.json()),
      fetch(process.env.WOF_SERVER + '/appointments', {
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
    .then(([users, floorTypes, appointments]) => {
      setAgents(users);
      setFloorTypes(floorTypes);
      setAppointments(appointments);
    })
    .catch(error => {
      console.log(error);
    })
  }, []);
  
  return (
    <Container sx={{ mb: 5}}>
      <Box display={'flex'} sx={{my: 2}} justifyContent={'center'}>
        <Typography variant='h3'>Schedule New Appointment</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>
                <Button>
                  <DeleteForeverIcon />
                </Button>
              </TableCell>
              <TableCell align='center'>
                <FormControl sx={{ m: 1}}>
                  <InputLabel id="floor-type-label">Floor Type</InputLabel>
                  <Select
                    sx={{ width: '13rem'}}
                    labelId="floor-type-label"
                    multiple
                    value={selectedFloorTypes}
                    onChange={
                      e => setSelectedFloorTypes(typeof e.target.value === 'string' ? [e.target.value] : e.target.value)
                    }
                    input={<OutlinedInput label="Floor Type" />}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          margin: 0
                        },
                      },
                    }}
                  >
                    {floorTypes.map((floorType) => (
                      <MenuItem
                        key={floorType['_id']}
                        value={floorType['_id']}
                      >
                        {floorType['name']}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell align='center'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker sx={{width: '11rem'}} onChange={(e) => {
                    setSelectedDate(e['$d']);
                  }} />
                </LocalizationProvider>
              </TableCell>
              <TableCell align='center'>
                <FormControl sx={{m: 1}}>
                  <InputLabel id="sale-agent-label">Sale Agent</InputLabel>
                  <Select sx={{width: '20rem'}}
                    labelId="sale-agent-label"
                    value={selectedAgent}
                    onChange={
                      e => setSelectedAgent(e.target.value)
                    }
                    input={<OutlinedInput label="Floor Type" />}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          margin: 0
                        },
                      },
                    }}
                  >
                    {agents.map((agent) => (
                      <MenuItem
                        key={agent['uid']}
                        value={agent['uid']}
                      >
                        {agent['email']}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell align='center'>
                <Button variant='contained' onClick={submitCreate}>
                  <Typography>Create</Typography>
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appt, apptIndex) => (
              <TableRow key={apptIndex}>
                <TableCell>
                  <Checkbox
                    onChange={
                      (e:FormEvent<HTMLInputElement>):void => handleSelection(e, appt['_id'])
                    }
                    checked={
                      selection.some(id => id === appt['_id'])}
                    />
                </TableCell>
                <TableCell>
                  <List>
                  { appt['floorTypes'].map(floorType =>
                      <ListItem key={floorType} disablePadding>
                        <ListItemText>
                          <Typography variant='caption'>{floorTypes.find(ft => ft['_id'] === floorType)['name']}</Typography>
                        </ListItemText>
                      </ListItem>
                  )}
                  </List>
                </TableCell>
                <TableCell>{appt['scheduleDate'].toLocaleString()}</TableCell>
                <TableCell colSpan={2}>{agents.find(agent => appt['agent'] === agent['uid'])['email']}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell align='center' colSpan={5}>
                <Typography variant='caption'>{appointments.length} Appointments</Typography>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Appointment;