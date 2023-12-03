import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
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
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppointmentType from '../../../model/appointment-type';
import WofRest from '../../../rest/wof-rest';
import dayjs = require('dayjs');

const ListAppointment: React.FC = () => {

  document.title = 'World of Floors - List Appointment';
  const navigate = useNavigate();
  const wofRest = WofRest();

  const [appointments, setAppointments] = useState<AppointmentType[]>([]);

  useEffect(() => {
    Promise.all([wofRest.appointment.getAll('all')])
      .then(([appointments]) => setAppointments(appointments))
      .catch(error => console.log(error));
  }, []);0

  return (
    <Container component={Paper} sx={{my: 5, p: 2}}>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'} sx={{m: 2}}>
        <Typography variant='h3'>List Appointment</Typography>
        <Typography variant='caption'>{appointments.length} Total Appointments</Typography>
      </Box>
      <TableContainer sx={{maxHeight: '69vh'}}>
        <Table stickyHeader sx={{tableLayout: 'fixed'}}>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Sale Agent</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Extras</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { appointments.map(appointment =>
              <TableRow key={appointment._id} sx={{ cursor: 'pointer' }} onClick={() => navigate(`/admin/appointment/${appointment._id}`)}>
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
                  <Typography>{appointment.active ? 'Active': 'Canceled'}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='h6'>
                    { !appointment.agent && 'Unassigned'}
                    { appointment.agent && appointment.agent.firstName } { appointment.agent && appointment.agent.lastName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ p: 1 }}>
                    <Box><Typography variant='caption'>{appointment.customer.lastName}, {appointment.customer.firstName}</Typography></Box>
                    <Box><Typography variant='caption'>{appointment.customer.address.street1}</Typography></Box>
                    <Box>
                      <Typography variant='caption'>
                        {appointment.customer.address.city} {appointment.customer.address.zipCode} {appointment.customer.address.ustate.short}
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
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell align='center' colSpan={6}>
                <Typography variant='caption'>{appointments.length} Appointments</Typography>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ListAppointment;