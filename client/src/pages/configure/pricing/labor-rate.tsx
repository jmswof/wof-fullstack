import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useAuthContext } from '../../../context/AuthContext';
import { useEffect } from 'react';

const LaborRate: React.FC = () => {
  document.title = 'World of Floors - Labor Rate';

  const {user} = useAuthContext();
  
  return (
    <Box display={'flex'} sx={{mt: 2}} justifyContent={'center'}>
      <p>Labor Rate Form stuffs</p>
    </Box>
  );
};

export default LaborRate;