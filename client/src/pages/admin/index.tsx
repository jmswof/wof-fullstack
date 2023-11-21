import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { useAuthContext } from '../../context/AuthContext';
import { grey } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

const Admin: React.FC = () => {
  document.title = 'World of Floors - Admin';
  const navigate = useNavigate();

  const {user} = useAuthContext();

  return (
    <Container sx={{ p: 3 }}>
      <Box display={'flex'}>
        <Typography variant='h4' margin={'0 auto'}>Admin</Typography>
      </Box>

      <Typography variant='h5'>Project Management</Typography>
      <Divider sx={{borderBottomWidth: 4, borderColor: grey[800]}} />
      <Box display={'flex'} sx={{my: 3}}>
        <Button sx={{mx: 1, backgroundColor: grey[300], borderRadius: '12px', boxShadow: 2}}>
          <Typography variant='button'>
            Projects
          </Typography>
        </Button>
        <Button sx={{mx: 1, backgroundColor: grey[300], borderRadius: '12px', boxShadow: 2}}>
          <Typography variant='button'>
            Project Coordinator Dashboard
          </Typography>
        </Button>
        <Button
          sx={{mx: 1, backgroundColor: grey[300], borderRadius: '12px', boxShadow: 2}}
          onClick={() => navigate('/admin/command-center')}>
          <Typography variant='button'>
            Command Center
          </Typography>
        </Button>
        <Button sx={{mx: 1, backgroundColor: grey[300], borderRadius: '12px', boxShadow: 2}}>
          <Typography variant='button'>
            Recovery Center
          </Typography>
        </Button>
        <Button sx={{mx: 1, backgroundColor: grey[300], borderRadius: '12px', boxShadow: 2}}>
          <Typography variant='button'>
            Call Center
          </Typography>
        </Button>
        <Button sx={{mx: 1, backgroundColor: grey[300], borderRadius: '12px', boxShadow: 2}}>
          <Typography variant='button'>
            Installation Calendar
          </Typography>
        </Button>
      </Box>

      <Typography variant='h5'>Scheduling</Typography>
      <Divider sx={{borderBottomWidth: 4, borderColor: grey[800]}} />
      <Box display={'flex'} sx={{my: 3}}>
        <Button sx={{mx: 1, backgroundColor: grey[300], borderRadius: '12px', boxShadow: 2}}>
          <Typography variant='button'>
            Schedule New Appointment
          </Typography>
        </Button>
        <Button sx={{mx: 1, backgroundColor: grey[300], borderRadius: '12px', boxShadow: 2}}>
          <Typography variant='button'>
            Block Appointment Times
          </Typography>
        </Button>
        <Button sx={{mx: 1, backgroundColor: grey[300], borderRadius: '12px', boxShadow: 2}}>
          <Typography variant='button'>
            View Blocked Appointment Times
          </Typography>
        </Button>
        <Button sx={{mx: 1, backgroundColor: grey[300], borderRadius: '12px', boxShadow: 2}}>
          <Typography variant='button'>
            View/Edit Service Area
          </Typography>
        </Button>
      </Box>

      <Typography variant='h5'>Pricing</Typography>
      <Divider sx={{borderBottomWidth: 4, borderColor: grey[800]}} />
      <Box display={'flex'} sx={{my: 3}}>
        <Button sx={{mx: 1, backgroundColor: grey[300], borderRadius: '12px', boxShadow: 2}}>
          <Typography variant='button'>
            Labor Rates
          </Typography>
        </Button>
        <Button sx={{mx: 1, backgroundColor: grey[300], borderRadius: '12px', boxShadow: 2}}>
          <Typography variant='button'>
            Product Costs
          </Typography>
        </Button>
        <Button sx={{mx: 1, backgroundColor: grey[300], borderRadius: '12px', boxShadow: 2}}>
          <Typography variant='button'>
            Product Pricing
          </Typography>
        </Button>
        <Button sx={{mx: 1, backgroundColor: grey[300], borderRadius: '12px', boxShadow: 2}}>
          <Typography variant='button'>
            Financing
          </Typography>
        </Button>
        <Button sx={{mx: 1, backgroundColor: grey[300], borderRadius: '12px', boxShadow: 2}}>
          <Typography variant='button'>
            Accessory Product Pricing
          </Typography>
        </Button>
        <Button sx={{mx: 1, backgroundColor: grey[300], borderRadius: '12px', boxShadow: 2}}>
          <Typography variant='button'>
            Pricing Controls
          </Typography>
        </Button>
      </Box>

      <Typography variant='h5'>Employee Management</Typography>
      <Divider sx={{borderBottomWidth: 4, borderColor: grey[800]}} />
      <Box display={'flex'} sx={{my: 3}}>
        <Button sx={{mx: 1, backgroundColor: grey[300], borderRadius: '12px', boxShadow: 2}}>
          <Typography variant='button'>
            Contractors
          </Typography>
        </Button>
        <Button sx={{mx: 1, backgroundColor: grey[300], borderRadius: '12px', boxShadow: 2}}>
          <Typography variant='button'>
            Contractor Rate Settings
          </Typography>
        </Button>
        <Button sx={{mx: 1, backgroundColor: grey[300], borderRadius: '12px', boxShadow: 2}}>
          <Typography variant='button'>
            Sales Agents
          </Typography>
        </Button>
      </Box>

      <Typography variant='h5'>Inventory</Typography>
      <Divider sx={{borderBottomWidth: 4, borderColor: grey[800]}} />
      <Box display={'flex'} sx={{my: 3}}>
        <Button sx={{mx: 1, backgroundColor: grey[300], borderRadius: '12px', boxShadow: 2}}>
          <Typography variant='button'>
            Add Hard Surface
          </Typography>
        </Button>
        <Button sx={{mx: 1, backgroundColor: grey[300], borderRadius: '12px', boxShadow: 2}}>
          <Typography variant='button'>
            Add Soft Surface
          </Typography>
        </Button>
      </Box>
    </Container>
  );
};

export default Admin;