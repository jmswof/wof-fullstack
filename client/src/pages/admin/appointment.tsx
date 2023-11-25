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
import { useAuthContext } from '../../context/AuthContext';
import { FormEvent, useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import dayjs = require('dayjs');

const Appointment: React.FC = () => {
  document.title = 'World of Floors - Appointments';

  const {user} = useAuthContext();
  const [agents, setAgents] = useState<[]>([]);
  const [floorTypes, setFloorTypes] = useState<[]>([]);
  const [appointments, setAppointments] = useState<object[]>([]);
  const [appointment, setAppointment] = useState<object>({});

  const [selection, setSelection] = useState(new Array(appointments.length).fill(''));
  const [selectedAgent, setSelectedAgent] = useState<string>('');
  const [selectedFloorTypes, setSelectedFloorTypes] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [showModal, setShowModal] = useState<boolean>(false);

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

  const handleSelection = (e:FormEvent<HTMLInputElement>, id:string):void => {
    const index = selection.indexOf(id);
    if (index < 0)
      selection.push(id);
    else
      selection.splice(index, 1);

    setSelection([...selection]);
  }

  const submitCreate = ():void => {

    if (!selectedAgent || !selectedDate || selectedFloorTypes.length < 1) {
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

  const submitUpdate = (appointment:object):void => {
    fetch(`${process.env.WOF_SERVER}/appointments`, {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
      },
      body: JSON.stringify(appointment)
    })
    .then(response => response.json())
    .then(response => {
      if (response.acknowledged && response.matchedCount === 1) {
        const index = appointments.map(appointment => appointment['_id']).indexOf(appointment['_id']);
        appointments[index] = appointment;
        setAppointments(appointments)
        setAppointment({});
      }
    })
    .catch(error => console.log(error));
  }

  const submitDelete = ():void => {
    if (selection.length < 1)
      return;

    fetch(`${process.env.WOF_SERVER}/appointments`, {
      method: 'DELETE',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
      },
      body: JSON.stringify(selection)
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
      console.log(appointments);
      if (response.acknowledged && response.deletedCount === selection.length) {
        setAppointments([...appointments.filter(appointment => selection.indexOf(appointment['_id']) < 0)]);
        setSelection([]);
      }
    })
    .catch(error => console.log(error));
  };
  
  return (
    <Container component={Paper} sx={{my: 5, p: 2}}>
      <Box display={'flex'} justifyContent={'center'}>
        <Typography variant='h3'>Schedule Management</Typography>
      </Box>
      <TableContainer sx={{maxHeight: '70vh'}}>
        {showModal && <UpdateAppointmentDialog show={showModal}
          appointment={appointment}
          agents={agents}
          floorTypes={floorTypes}
          update={submitUpdate}
          close={() => {
            setShowModal(false);
          }}
        />}
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align='center'>
                <Button onClick={submitDelete}>
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
                  <DatePicker
                    value={selectedDate}
                    sx={{width: '11rem'}}
                    onChange={(e) => {
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
              <TableCell align='center' colSpan={2}>
                <Button variant='contained' onClick={submitCreate}>
                  <Typography>Create</Typography>
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { appointments.map((appt, apptIndex) => (
              <TableRow key={apptIndex}>
                <TableCell>
                  <Checkbox
                    onChange={ (e:FormEvent<HTMLInputElement>):void => handleSelection(e, appt['_id']) }
                    checked={ selection.some(id => id === appt['_id']) }
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
                <TableCell>
                  { dayjs(appt['scheduleDate']).toString() }
                </TableCell>
                <TableCell colSpan={2}>
                  { agents.find(agent => appt['agent'] === agent['uid'])['email'] }
                </TableCell>
                <TableCell>
                  <Button variant='outlined' onClick={() => {
                    console.log(appt);
                    setAppointment(appt);
                    setShowModal(true);
                  }}>
                    UPDATE
                  </Button>
                </TableCell>
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

const UpdateAppointmentDialog = ({appointment, agents, floorTypes, show, update, close}) => {
  const [agent, setAgent] = useState<string>(appointment['agent']);
  const [date, setDate] = useState(dayjs(appointment['date']));
  const [types, setTypes] = useState(appointment['floorTypes']);

  return (
    <Dialog open={show} onClose={close}>
      <DialogTitle>Edit Appointment</DialogTitle>
      <DialogContent sx={{p: 2}}>
        <Box sx={{m: 2}}>
          <FormControl>
            <InputLabel id="floor-type-label">Floor Type</InputLabel>
            <Select
              sx={{ width: '13rem'}}
              labelId="floor-type-label"
              multiple
              value={types}
              onChange={
                e => setTypes(typeof e.target.value === 'string' ? [e.target.value] : e.target.value)
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
              {floorTypes.map((floorType:object) => (
                <MenuItem
                  key={floorType['_id']}
                  value={floorType['_id']}
                >
                  {floorType['name']}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{m: 2}}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={date}
              sx={{width: '11rem'}}
              onChange={(date) => {
                setDate(date);
              }} />
          </LocalizationProvider>
        </Box>
        <Box sx={{m: 2}}>
          <FormControl>
            <InputLabel id="sale-agent-label">Sale Agent</InputLabel>
            <Select sx={{width: '20rem'}}
              labelId="sale-agent-label"
              value={agent}
              onChange={
                e => setAgent(e.target.value)
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
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button onClick={() => {
          console.log(types);
            update({_id: appointment['_id'], agent: agent, scheduleDate: date, floorTypes: types});
            close();
          }}
        >Update</Button>
      </DialogActions>
    </Dialog>
  );
}

export default Appointment;