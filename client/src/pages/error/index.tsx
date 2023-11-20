import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useAuthContext } from '../../context/AuthContext';
import { useEffect } from 'react';

const Error: React.FC = () => {
  document.title = 'World of Floors - Admin';

  const {user} = useAuthContext();

  useEffect(() => {
    console.log(user);
  });

  return (
    <div>
      <Box display={'flex'} sx={{mt: 2}} justifyContent={'center'}>
        <Typography variant='h3' gutterBottom>World of Floor (Error)</Typography>
      </Box>

      <Box display={'flex'} sx={{mt: 2}} justifyContent={'center'}>
        <p>Error: The page cannot be found. Sorry about that...</p>
      </Box>
    </div>
  );
};

export default Error;