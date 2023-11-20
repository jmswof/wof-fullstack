import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useAuthContext } from '../../context/AuthContext';
import { useEffect } from 'react';

const Reports: React.FC = () => {
  document.title = 'World of Floors - Admin';

  const {user} = useAuthContext();
  
  return (
    <div>
      <Box display={'flex'} sx={{mt: 2}} justifyContent={'center'}>
        <Typography variant='h3' gutterBottom>World of Floor (Reports)</Typography>
      </Box>

      <Box display={'flex'} sx={{mt: 2}} justifyContent={'center'}>
        <p>Reports stuffs here</p>
      </Box>
    </div>
  );
};

export default Reports;