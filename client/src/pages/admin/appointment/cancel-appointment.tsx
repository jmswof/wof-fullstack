import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import Checkbox from '@mui/material/Checkbox';
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
import { useAuthContext } from '../../../context/AuthContext';
import { useEffect, useState } from 'react';

const CancelAppointment: React.FC = () => {
  document.title = 'World of Floors - Cancel Appointment';

  const [saleAgents, setSaleAgents] = useState<object[]>([]);
  const [appointments, setAppointments] = useState<object[]>([]);
  const [error, setError] = useState<string>('');
  const [selection, setSelection] = useState(new Array(appointments.length).fill(''));
  const {user} = useAuthContext();

  const handleSelection = (id:string):void => {
    const index = selection.indexOf(id);
    if (index < 0)
      selection.push(id);
    else
      selection.splice(index, 1);

    setSelection([...selection]);
  }

  useEffect(() => {
    Promise.all([
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
      fetch(process.env.WOF_SERVER + '/appointments?type=active', {
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
    .then(([saleAgents, appointments]) => {
      setSaleAgents(saleAgents);
      setAppointments(appointments);
    })
    .catch(error => {
      console.log(error);
    })
  }, []);

  const handleSubmit = async () => {
    setError('');
    if (selection.length < 1) {
      setError('Nothing is selected');
      return; // Nothing's selected
    }
    console.log(selection);
    await fetch(process.env.WOF_SERVER + '/appointments', {
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
      if (response.acknowledged && response.modifiedCount === selection.length) {
        setAppointments([...appointments.filter(appointment => selection.indexOf(appointment['_id']) < 0)]);
        setSelection([]);
      }
    })
    .catch(error => {
      console.log(error);
    });
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
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align='center'>
                <Button fullWidth onClick={() => {
                  console.log(selection);
                }}>
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
              <TableRow key={appointment['_id']}>
                <TableCell align='center'>
                  <Checkbox onChange={(e:any):void => handleSelection(appointment['_id'])} checked={selection.some(id => id === appointment['_id'])}/>
                </TableCell>
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
                  <Typography variant='h6'>
                    { appointment['agent'] && saleAgents.find(saleAgent => saleAgent['_id'] === appointment['agent'])['firstName']} { appointment['agent'] && saleAgents.find(saleAgent => saleAgent['_id'] === appointment['agent'])['lastName']}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ p: 1 }}>
                    <Box><Typography variant='caption'>{appointment['customer'].lastName}, {appointment['customer'].firstName}</Typography></Box>
                    <Box><Typography variant='caption'>{appointment['customer'].address.street1}</Typography></Box>
                    <Box>
                      <Typography variant='caption'>
                        {appointment['customer'].address.city} {appointment['customer'].address.state} {appointment['customer'].address.zipCode}
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
                        <b>Color</b> {appointment['colorPreference'].join(', ')}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant='caption'>
                        <b>Floor</b> {appointment['floorType'].join(', ')}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant='caption'>
                        <b>Reference</b> {appointment['reference'].join(', ')}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell align='center' colSpan={6}>
                <Button variant='contained' fullWidth onClick={handleSubmit}>
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