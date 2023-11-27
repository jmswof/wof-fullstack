import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useAuthContext } from '../../context/AuthContext';
import { useEffect, useState } from 'react';

const FirebaseUsers: React.FC = () => {
  document.title = 'World of Floors - Firebase Users';

  const {user} = useAuthContext();

  const [firebaseUsers, setFirebaseUsers] = useState<[]>([]);

  useEffect(() => {
    fetch(`${process.env.WOF_SERVER}/configure/firebase-user?type=all`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
      }
    })
    .then(response => response.json())
    .then(response => setFirebaseUsers(response))
    .catch(error => console.log(error));
  }, []);
  
  return (
    <Container component={Paper} sx={{my:5, p: 2}}>
      <Box display={'flex'} justifyContent={'center'} sx={{m: 2}}>
        <Typography variant='h3'>Firebase Users</Typography>
      </Box>
      <TableContainer sx={{maxHeight: '70vh'}}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Verified Email</TableCell>
              <TableCell>Disabled</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>Last Sign In</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {firebaseUsers.map((firebaseUser, index) => (
              <TableRow key={firebaseUser['uid']}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{firebaseUser['email']}</TableCell>
                <TableCell>{firebaseUser['emailVerified'] ? 'Yes' : 'No'}</TableCell>
                <TableCell>{firebaseUser['disabled'] ? 'Yes' : 'No'}</TableCell>
                <TableCell>{firebaseUser['creationTime']}</TableCell>
                <TableCell>{firebaseUser['lastSignInTime']}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell align='center' colSpan={6}>
                <Typography variant='caption'>{firebaseUsers.length} Firebase User(s)</Typography>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default FirebaseUsers;