import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useAuthContext } from '../../context/AuthContext';
import { useEffect } from 'react';

const Home: React.FC = () => {
  document.title = 'World of Floors';

  const {user} = useAuthContext();

  return (
    <div>
      <Box display={'flex'} sx={{mt: 2}} justifyContent={'center'}>
        <Typography variant='h3' gutterBottom>World of Floor (POC)</Typography>
      </Box>
      <Box display={'flex'} sx={{mt: 2}} justifyContent={'center'}>
        <Typography variant='h5'>Built with TypeScript, React, Webpack</Typography>
      </Box>
      <Box display={'flex'} sx={{mt: 2}} justifyContent={'center'}>
        <table width={'520px'}>
          <tbody>
            <tr>
              <th align='left'>Products</th>
              <td>A page with CRUD ability on a list of products.</td>
            </tr>
            <tr>
              <th align='left'>Parameters & Props</th>
              <td>A page that accept path variable, and functional component that accept props.</td>
            </tr>
            <tr>
              <th align='left'>Login</th>
              <td>A basic auth login form.</td>
            </tr>
          </tbody>
        </table>
      </Box>
    </div>
  );
};

export default Home;