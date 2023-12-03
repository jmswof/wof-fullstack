import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Paper from '@mui/material/Paper';
import PhoneIcon from '@mui/icons-material/Phone';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import WofRest from '../../../rest/wof-rest';
import SaleAgentType from '../../../model/sale-agent-type';
import AppointmentType from '../../../model/appointment-type';
import dayjs = require('dayjs');
import DelegateAppointmentType from '../../../model/delegate-appointment-type';

const DelegateAppointment: React.FC = () => {

  document.title = 'World of Floors - Delegate Appointment';
  const wofRest = WofRest();

  const [saleAgents, setSaleAgents] = useState<SaleAgentType[]>([]);
  const [appointments, setAppointments] = useState<AppointmentType[]>([]);
  const [delegation, setDelegation] = useState<DelegateAppointmentType[]>([]);

  useEffect(() => {
    Promise.all([
      wofRest.saleAgent.getAll('all'),
      wofRest.appointment.getAll('unassigned')
    ]).then(([agents, appointments]) => {
      setSaleAgents(agents);
      setAppointments(appointments);
    }).catch(error => console.log(error));
  }, []);

  const delegate = (appointment:AppointmentType, saleAgent:SaleAgentType) => {
    const entry = delegation.find(entry => entry.appointment._id === appointment._id);
    if (!entry) {
      delegation.push({appointment: appointment, saleAgent: saleAgent});
    } else {
      const index = delegation.map(entry => entry.appointment._id).indexOf(appointment._id);

      if (!saleAgent) {
        delegation.splice(index, 1);
      } else {
        delegation[index].saleAgent = saleAgent;
      }
    }

    setDelegation(delegation);
  }

  const handleDelegation = async () => {
    if (!delegation.length) {
      return; // Nothing's delegated.
    }

    await wofRest.appointment.patch(delegation)
    .then((response) => {
      setAppointments([...appointments.filter(appointment => !delegation.some(entry => entry.appointment._id === appointment._id))]);
      setDelegation([]);
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
            { appointments.map((appointment, index) =>
              <TableRow key={appointment._id}>
                <TableCell>
                  <Box sx={{ p: 1 }}>
                  <Box>
                      <Typography variant='caption'>{dayjs(appointment.date).format('MM/DD/YYYY')}</Typography>
                    </Box>
                    <Box>
                      <Typography variant='caption'>{dayjs(appointment.date).format('HH:mmA')}</Typography>
                    </Box>
                    <Box>
                      <Typography variant='caption'>
                        {appointment.customer.address.isResidential ? 'Residential' : 'Business'}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ p: 1 }}>
                    <Box><Typography variant='caption'>{appointment.customer.lastName}, {appointment.customer.firstName}</Typography></Box>
                    <Box><Typography variant='caption'>{appointment.customer.address.street1}</Typography></Box>
                    <Box>
                      <Typography variant='caption'>
                        {appointment.customer.address.city} { appointment.customer.address.ustate.short } {appointment.customer.address.zipCode}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display={'flex'} flexDirection={'row'}>
                    <PhoneIcon fontSize='small' sx={{ mr: 1 }} />
                    <Typography variant='caption'>{appointment.customer.phoneNumber}</Typography>
                  </Box>
                  <Box display={'flex'} flexDirection={'row'}>
                    <PhoneIphoneIcon fontSize='small' sx={{ mr: 1 }} />
                    <Typography variant='caption'>{appointment.customer.mobileNumber}</Typography>
                  </Box>
                  <Box display={'flex'} flexDirection={'row'}>
                    <MailOutlineIcon fontSize='small' sx={{ mr: 1 }} />
                    <Typography variant='caption'>{appointment.customer.email}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ p: 1 }}>
                    <Box>
                      <Typography variant='caption'>
                        <b>Color</b> {appointment.colorPreference.map(color => color.label).join(', ')}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant='caption'>
                        <b>Floor</b> {appointment.floorType.map(floorType => floorType.label).join(', ')}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant='caption'>
                        <b>Reference</b> {appointment.reference.map(reference => reference.label).join(', ')}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                <FormControl sx={{m: 1, width: '13rem'}}>
                  <Autocomplete options={saleAgents} clearOnBlur
                    componentsProps={{ popper: { style: { width: 'fit-content' }}}}
                    renderOption={(props, option) => <li {...props}>{option.firstName} {option.lastName}</li>}
                    renderInput={(params) => <TextField {...params} label="Sale Agent" />}
                    getOptionLabel={option => `${option.firstName} ${option.lastName}`}
                    onChange={(event, option) => delegate(appointment, option)}
                    isOptionEqualToValue={(option, value) => option._id === value._id}
                    size='small'
                  />
                </FormControl>
                </TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell align='center' colSpan={5}>
                <Button variant='contained' fullWidth onClick={handleDelegation}>
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