import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import TabletAndroidIcon from '@mui/icons-material/TabletAndroid';
import TabletMacIcon from '@mui/icons-material/TabletMac';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { keyframes } from '@mui/material';

const CommandCenter: React.FC = () => {
  document.title = 'World of Floors - Command Center';

  const fade = keyframes`
    0%,100% { opacity: 0 }
    50% { opacity: 1 }
  `;

  return (
    <Container component={Paper} sx={{my: 5, p: 2}}>
      <Box display={'flex'} justifyContent={'center'}>
        <Typography variant='h3'>Command Center</Typography>
      </Box>
      <Box display={'flex'} justifyContent={'center'}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width='33%' align='center'>
                  <Button variant='outlined' color='warning'>
                    Inactive
                  </Button>
                </TableCell>
                <TableCell width='33%' align='center'>
                  <Button variant='outlined' color='success'>
                    Active
                  </Button>
                </TableCell>
                <TableCell width='33%' align='center'>
                  <Button variant='outlined' color='info'>
                    Attention
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Box display={'flex'}>
                    <Box>
                      <IconButton onClick={() => alert('demo')} color='warning'>
                        <TabletMacIcon sx={{p: 1, fontSize: '48px'}}/>
                      </IconButton>
                      <Box display={'flex'} justifyContent={'center'}>
                        <Typography variant='caption'>iPad #1</Typography>
                      </Box>
                    </Box>
                    <Box>
                      <IconButton onClick={() => alert('demo')} color='warning'>
                        <TabletAndroidIcon sx={{p: 1, fontSize: '48px'}}/>
                      </IconButton>
                      <Box display={'flex'} justifyContent={'center'}>
                        <Typography variant='caption'>Android #2</Typography>
                      </Box>
                    </Box>
                    <Box>
                      <IconButton onClick={() => alert('demo')} color='warning'>
                        <TabletMacIcon sx={{p: 1, fontSize: '48px'}}/>
                      </IconButton>
                      <Box display={'flex'} justifyContent={'center'}>
                        <Typography variant='caption'>iPad #2</Typography>
                      </Box>
                    </Box>
                    <Box>
                      <IconButton onClick={() => alert('demo')} color='warning'>
                        <TabletMacIcon sx={{p: 1, fontSize: '48px'}}/>
                      </IconButton>
                      <Box display={'flex'} justifyContent={'center'}>
                        <Typography variant='caption'>iPad #6</Typography>
                      </Box>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display={'flex'}>
                    <Box>
                      <IconButton onClick={() => alert('demo')} color='success'>
                        <TabletMacIcon sx={{p: 1, fontSize: '48px'}}/>
                      </IconButton>
                      <Box display={'flex'} justifyContent={'center'}>
                        <Typography variant='caption'>iPad #5</Typography>
                      </Box>
                    </Box>
                    <Box>
                      <IconButton onClick={() => alert('demo')} color='success'>
                        <TabletMacIcon sx={{p: 1, fontSize: '48px'}}/>
                      </IconButton>
                      <Box display={'flex'} justifyContent={'center'}>
                        <Typography variant='caption'>iPad #3</Typography>
                      </Box>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display={'flex'}>
                    <Box>
                      <IconButton onClick={() => alert('demo')} color='info'>
                        <TabletAndroidIcon sx={{p: 1, fontSize: '48px', animation: `${fade} 2s steps(15, start) infinite`}}/>
                      </IconButton>
                      <Box display={'flex'} justifyContent={'center'}>
                        <Typography variant='caption'>Android #4</Typography>
                      </Box>
                    </Box>
                    <Box>
                      <IconButton onClick={() => alert('demo')} color='info'>
                        <TabletMacIcon sx={{p: 1, fontSize: '48px', animation: `${fade} 2s steps(15, start) infinite`}}/>
                      </IconButton>
                      <Box display={'flex'} justifyContent={'center'}>
                        <Typography variant='caption'>iPad #7</Typography>
                      </Box>
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default CommandCenter;