import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useAuthContext } from '../../../context/AuthContext';
import { useEffect } from 'react';

const NewContractor: React.FC = () => {
  document.title = 'World of Floors - Accessory Cost';

  const {user} = useAuthContext();
  
  return (
    <Box display={'flex'} sx={{mt: 2}} justifyContent={'center'}>
      <p>New Contractor Form stuffs.</p>
    </Box>
  );
};

export default NewContractor;