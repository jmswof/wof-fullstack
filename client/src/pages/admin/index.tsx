import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from "@mui/material/Divider";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const Admin: React.FC = () => {
  document.title = 'World of Floors - Admin';
  const navigate = useNavigate();

  return (
    <Container component={Paper} sx={{my: 5, p: 2}}>
      <Box display={'flex'} justifyContent={'center'} sx={{m: 2}}>
        <Typography variant='h3'>Administration</Typography>
      </Box>

      <Typography variant='h5'>Project Management</Typography>
      <Divider sx={{borderBottomWidth: 4}} />
      <Box flexWrap='wrap' sx={{my: 3}}>
        <Button sx={{m: 1, boxShadow: 3}} variant='outlined'>
          <Typography variant='caption'>Projects</Typography>
        </Button>
        <Button sx={{m: 1, boxShadow: 3}} variant='outlined'>
          <Typography variant='caption'>Project Coordinator Dashboard</Typography>
        </Button>
        <Button sx={{m: 1, boxShadow: 3}} variant='outlined' onClick={() => navigate('/admin/command-center')}>
          <Typography variant='caption'>Command Center (DEMO)</Typography>
        </Button>
        <Button sx={{m: 1, boxShadow: 3}} variant='outlined'>
          <Typography variant='caption'>Recovery Center</Typography>
        </Button>
        <Button sx={{m: 1, boxShadow: 3}} variant='outlined'>
          <Typography variant='caption'>Call Center</Typography>
        </Button>
        <Button sx={{m: 1, boxShadow: 3}} variant='outlined'>
          <Typography variant='caption'>Installation Calendar</Typography>
        </Button>
      </Box>

      <Typography variant='h5'>Scheduling</Typography>
      <Divider sx={{borderBottomWidth: 4}} />
      <Box flexWrap='wrap' sx={{my: 3}}>
        <Button sx={{m: 1, boxShadow: 3}} variant='contained'
            onClick={() => navigate('/admin/new-appointment')}
          >
          <Typography variant='caption'>Schedule New Appointment</Typography>
        </Button>
        <Button sx={{m: 1, boxShadow: 3}} variant='contained'
            onClick={() => navigate('/admin/delegate-appointment')}
          >
          <Typography variant='caption'>Delegate Appointment</Typography>
        </Button>
        <Button sx={{m: 1, boxShadow: 3}} variant='contained'
            onClick={() => navigate('/admin/list-appointment')}
          >
          <Typography variant='caption'>List Appointments</Typography>
        </Button>
        <Button sx={{m: 1, boxShadow: 3}} variant='contained'
            onClick={() => navigate('/admin/cancel-appointment')}
          >
          <Typography variant='caption'>Cancel Appointment</Typography>
        </Button>
        <Button sx={{m: 1, boxShadow: 3}} variant='outlined'>
          <Typography variant='caption'>View/Edit Service Area</Typography>
        </Button>
      </Box>

      <Typography variant='h5'>Configuration</Typography>
      <Divider sx={{borderBottomWidth: 4}} />
      <Box flexWrap='wrap' sx={{my: 3}}>
        <Button sx={{m: 1, boxShadow: 3}} variant='contained' onClick={() => navigate('/config/site-option')}>
          <Typography variant='caption'>Site Option</Typography>
        </Button>

        <Button sx={{m: 1, boxShadow: 3}} variant='contained' onClick={() => navigate('/config/labor-rate')}>
          <Typography variant='caption'>Labor Rates</Typography>
        </Button>

        <Button sx={{m: 1, boxShadow: 3}} variant='contained' onClick={() => navigate('/config/job-service')}>
          <Typography variant='caption'>Job Services</Typography>
        </Button>

        <Button sx={{m: 1, boxShadow: 3}} variant='outlined' onClick={() => navigate('/config/cost-rate')}>
          <Typography variant='caption'>Costs and Financing</Typography>
        </Button>
      </Box>

      <Typography variant='h5'>Employee Management</Typography>
      <Divider sx={{borderBottomWidth: 4}} />
      <Box flexWrap='wrap' sx={{my: 3}}>
        <Button sx={{m: 1, boxShadow: 3}} variant='contained' onClick={() => navigate('/config/sale-agent')}>
          <Typography variant='caption'>Sales Agents</Typography>
        </Button>
        <Button sx={{m: 1, boxShadow: 3}} variant='contained' onClick={() => navigate('/admin/firebase-users')}>
          <Typography variant='caption'>Firebase Users</Typography>
        </Button>
        <Button sx={{m: 1, boxShadow: 3}} variant='outlined' onClick={() => navigate('/config/contractor-rate')}>
          <Typography variant='caption'>Contractors</Typography>
        </Button>
      </Box>

      <Typography variant='h5'>Inventory</Typography>
      <Divider sx={{borderBottomWidth: 4}} />
      <Box flexWrap='wrap' sx={{my: 3}}>
        <Button sx={{m: 1, boxShadow: 3}} variant='outlined'>
          <Typography variant='caption'>Add Hard Surface</Typography>
        </Button>
        <Button sx={{m: 1, boxShadow: 3}} variant='outlined'>
          <Typography variant='caption'>Add Soft Surface</Typography>
        </Button>
      </Box>
    </Container>
  );
};

export default Admin;
