import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useAuthContext } from '../../../context/AuthContext';
import { useEffect } from 'react';

const ListContractor: React.FC = () => {
  document.title = 'World of Floors - Financing';

  const {user} = useAuthContext();
  
  return (
    <Box display={'flex'} sx={{mt: 2}} justifyContent={'center'}>
      <p>List Contractors stuffs</p>
    </Box>
  );
};

export default ListContractor;