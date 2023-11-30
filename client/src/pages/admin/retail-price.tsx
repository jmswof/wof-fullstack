import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useAuthContext } from '../../context/AuthContext';
import { useEffect } from 'react';

const RetailPrice: React.FC = () => {
  document.title = 'World of Floors - Retail Price';

  const {user} = useAuthContext();
  
  return (
    <Box display={'flex'} sx={{mt: 2}} justifyContent={'center'}>
      <p>Retail Price Form stuffs</p>
    </Box>
  );
};

export default RetailPrice;