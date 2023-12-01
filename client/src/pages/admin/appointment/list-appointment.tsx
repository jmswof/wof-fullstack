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
import { useAuthContext } from '../../../context/AuthContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ListAppointment: React.FC = () => {
  document.title = 'World of Floors - List Appointment';

  const navigate = useNavigate();
  const [saleAgents, setSaleAgents] = useState<object[]>([]);
  const [appointments, setAppointments] = useState<object[]>([]);
  const [ustates, setUStates] = useState<object[]>([]);
  const [floorTypes, setFloorTypes] = useState<object[]>([]);
  const [colors, setColors] = useState<object[]>([]); 
  const [priorities, setPriorities] = useState<object[]>([]);
  const [references, setReferences] = useState<object[]>([]);
  const {user} = useAuthContext();

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
      fetch(`${process.env.WOF_SERVER}/appointments`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
        }
      })
      .then(response => response.json())
    ])
    .then(([saleAgents, ustates, references, priorities, colors, floorTypes, appointments]) => {
      setSaleAgents(saleAgents);
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
              <TableCell align='center'>Date</TableCell>
              <TableCell align='center'>Status</TableCell>
              <TableCell align='center'>Sale Agent</TableCell>
              <TableCell align='center'>Customer</TableCell>
              <TableCell align='center'>Contact</TableCell>
              <TableCell align='center'>Extras</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { appointments.map(appointment =>
              <TableRow key={appointment['_id']} sx={{ cursor: 'pointer' }} onClick={() => navigate(`/admin/appointment/${appointment['_id']}`)}>
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
                  <Typography>{appointment['active'] ? 'Active': 'Canceled'}</Typography>
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