import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Home: React.FC = () => {
  document.title = 'Demo - World of Floors';

  const ws = new WebSocket('ws://192.168.0.67:8080/products');

  ws.addEventListener('open', event => {
    ws.send('connection estblished');
  });

  ws.addEventListener('message', event => {
    console.log('message from server');
    console.log(event);
  })

  return (
    <>
      <Box display={'flex'} sx={{mt: 2}} justifyContent={'center'}>
        <Typography variant='h3' gutterBottom>Jason's Demo</Typography>
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
    </>
  );
};

export default Home;