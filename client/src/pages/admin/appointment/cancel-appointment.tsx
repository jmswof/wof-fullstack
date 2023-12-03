import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Paper from '@mui/material/Paper';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import PhoneIcon from '@mui/icons-material/Phone';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import AppointmentType from '../../../model/appointment-type';
import WofRest from '../../../rest/wof-rest';
import { useEffect, useState } from 'react';
import dayjs = require('dayjs');

const CancelAppointment: React.FC = () => {

  document.title = 'World of Floors - Cancel Appointment';
  const wofRest = WofRest();

  const [appointments, setAppointments] = useState<AppointmentType[]>([]);

  const [error, setError] = useState<string>('');
  const [selection, setSelection] = useState<AppointmentType[]>([]);

  const handleSelection = (appt:AppointmentType):void => {
    const index = selection.map(select => select._id).indexOf(appt._id);

    if (index < 0)
      selection.push(appt);
    else
      selection.splice(index, 1);

    setSelection([...selection]);
  }

  useEffect(() => {
    Promise.all([wofRest.appointment.getAll('active')])
      .then(([appointments]) => setAppointments(appointments))
      .catch(error => console.log(error))
  }, []);

  const handleDelete = async () => {
    setError('');
    if (selection.length < 1) {
      setError('Nothing is selected');
      return; // Nothing's selected
    }

    console.log(selection);
    wofRest.appointment.delete(selection)
      .then(response => {
        if (response.acknowledged && response.modifiedCount === selection.length) {
          setAppointments([...appointments.filter(appointment => selection.map(select => select._id).indexOf(appointment._id) < 0)]);
          setSelection([]);
        }
      }).catch(error => console.log(error));
  }
  
  return (
    <Container component={Paper} sx={{my: 5, p: 2}}>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'} sx={{m: 2}}>
        <Typography variant='h3'>Cancel Appointment</Typography>
        <Typography variant='caption'>{appointments.length} Active Appointments</Typography>
      </Box>
      { error && <Box display={'flex'} sx={{m: 3}} justifyContent={'center'}>
        <Alert variant='standard' color='error'>
          <Typography>{error}</Typography>
        </Alert>
      </Box>
      }
      <TableContainer sx={{maxHeight: '69vh'}}>
        <Table stickyHeader sx={{tableLayout: 'fixed'}}>
          <TableHead>
            <TableRow>
              <TableCell align='center'>
                <Button fullWidth onClick={handleDelete}>
                  <CancelPresentationIcon fontSize='small' />
                </Button>
              </TableCell>
              <TableCell align='center'>Date</TableCell>
              <TableCell align='center'>Sale Agent</TableCell>
              <TableCell align='center'>Customer</TableCell>
              <TableCell align='center'>Contact</TableCell>
              <TableCell align='center'>Extras</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { appointments.map(appointment =>
              <TableRow key={appointment._id}>
                <TableCell align='center'>
                  <Checkbox onChange={(e:any):void => handleSelection(appointment)} checked={selection.some(select => select._id === appointment._id)}/>
                </TableCell>
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
                        {appointment['customer'].address.isResidential ? 'Residential' : 'Business'}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant='h6'>
                    { appointment.agent && appointment.agent.firstName} { appointment.agent && appointment.agent.lastName }
                  </Typography>
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
              </TableRow>
            )}
            <TableRow>
              <TableCell align='center' colSpan={6}>
                <Button variant='contained' fullWidth onClick={handleDelete}>
                  Cancel Appointment
                </Button>
              </TableCell>
            </TableRow>
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

export default CancelAppointment;