import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from "@mui/material/Divider";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useAuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Admin: React.FC = () => {
  document.title = 'World of Floors - Admin';
  const navigate = useNavigate();

  const {user} = useAuthContext();

  return (
    <Container component={Paper} sx={{my: 5, p: 2}}>
      <Box display={'flex'} justifyContent={'center'}>
        <Typography variant='h3'>Administration</Typography>
      </Box>

      <Typography variant='h5'>Project Management</Typography>
      <Divider sx={{borderBottomWidth: 4}} />
      <Box display={'flex'} sx={{my: 3}}>
        <Button sx={{mx: 1, boxShadow: 3}} variant='outlined'>
          <Typography variant='caption'>Projects</Typography>
        </Button>
        <Button sx={{mx: 1, boxShadow: 3}} variant='outlined'>
          <Typography variant='caption'>Project Coordinator Dashboard</Typography>
        </Button>
        <Button sx={{mx: 1, boxShadow: 3}} variant='outlined'
          onClick={() => navigate('/admin/command-center')}
        >
          <Typography variant='caption'>Command Center</Typography>
        </Button>
        <Button sx={{mx: 1, boxShadow: 3}} variant='outlined'>
          <Typography variant='caption'>Recovery Center</Typography>
        </Button>
        <Button sx={{mx: 1, boxShadow: 3}} variant='outlined'>
          <Typography variant='caption'>Call Center</Typography>
        </Button>
        <Button sx={{mx: 1, boxShadow: 3}} variant='outlined'>
          <Typography variant='caption'>Installation Calendar</Typography>
        </Button>
      </Box>

      <Typography variant='h5'>Scheduling</Typography>
      <Divider sx={{borderBottomWidth: 4}} />
      <Box display={'flex'} sx={{my: 3}}>
      <Button sx={{mx: 1, boxShadow: 3}} variant='outlined'
          onClick={() => navigate('/admin/schedule-appointment')}
        >
          <Typography variant='caption'>Schedule New Appointment</Typography>
        </Button>
        <Button sx={{mx: 1, boxShadow: 3}} variant='outlined'>
          <Typography variant='caption'>Block Appointment Times</Typography>
        </Button>
        <Button sx={{mx: 1, boxShadow: 3}} variant='outlined'>
          <Typography variant='caption'>View Blocked Appointment Times</Typography>
        </Button>
        <Button sx={{mx: 1, boxShadow: 3}} variant='outlined'>
          <Typography variant='caption'>View/Edit Service Area</Typography>
        </Button>
      </Box>

      <Typography variant='h5'>Pricing</Typography>
      <Divider sx={{borderBottomWidth: 4}} />
      <Box display={'flex'} sx={{my: 3}}>
        <Button sx={{mx: 1, boxShadow: 3}} variant='outlined'>
          <Typography variant='caption'>Labor Rates</Typography>
        </Button>
        <Button sx={{mx: 1, boxShadow: 3}} variant='outlined'>
          <Typography variant='caption'>Product Costs</Typography>
        </Button>
        <Button sx={{mx: 1, boxShadow: 3}} variant='outlined'>
          <Typography variant='caption'>Product Pricing</Typography>
        </Button>
        <Button sx={{mx: 1, boxShadow: 3}} variant='outlined'>
          <Typography variant='caption'>Financing</Typography>
        </Button>
        <Button sx={{mx: 1, boxShadow: 3}} variant='outlined'>
          <Typography variant='caption'>Accessory Product Pricing</Typography>
        </Button>
        <Button sx={{mx: 1, boxShadow: 3}} variant='outlined'>
          <Typography variant='caption'>Pricing Controls</Typography>
        </Button>
      </Box>

      <Typography variant='h5'>Employee Management</Typography>
      <Divider sx={{borderBottomWidth: 4}} />
      <Box display={'flex'} sx={{my: 3}}>
        <Button sx={{mx: 1, boxShadow: 3}} variant='outlined'>
          <Typography variant='caption'>Contractors</Typography>
        </Button>
        <Button sx={{mx: 1, boxShadow: 3}} variant='outlined'>
          <Typography variant='caption'>Contractor Rate Settings</Typography>
        </Button>
        <Button sx={{mx: 1, boxShadow: 3}} variant='outlined'>
          <Typography variant='caption'>Sales Agents</Typography>
        </Button>
        <Button sx={{mx: 1, boxShadow: 3}} variant='outlined'
          onClick={() => navigate('/admin/manage-users')}
        >
          <Typography variant='caption'>Web and Tablet Users</Typography>
        </Button>
      </Box>

      <Typography variant='h5'>Inventory</Typography>
      <Divider sx={{borderBottomWidth: 4}} />
      <Box display={'flex'} sx={{my: 3}}>
        <Button sx={{mx: 1, boxShadow: 3}} variant='outlined'>
          <Typography variant='caption'>Add Hard Surface</Typography>
        </Button>
        <Button sx={{mx: 1, boxShadow: 3}} variant='outlined'>
          <Typography variant='caption'>Add Soft Surface</Typography>
        </Button>
        <Button sx={{mx: 1, boxShadow: 3}} variant='outlined'
          onClick={() => navigate('/config/floor-type')}
        >
          <Typography variant='caption'>Floor Type</Typography>
        </Button>
      </Box>
    </Container>
  );
};

export default Admin;