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
import { useEffect, useState } from 'react';

import WofRest from '../../rest/wof-rest';
import FirebaseUserType from '../../model/firebase-user-type';

const FirebaseUsers: React.FC = () => {
  document.title = 'World of Floors - Firebase Users';

  const wofRest = WofRest();

  const [firebaseUsers, setFirebaseUsers] = useState<FirebaseUserType[]>([]);

  useEffect(() => {
    wofRest.firebaseUser.getAll('all')
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
            {firebaseUsers.map((user, index) => (
              <TableRow key={user['uid']}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.emailVerified ? 'Yes' : 'No'}</TableCell>
                <TableCell>{user.disabled ? 'Yes' : 'No'}</TableCell>
                <TableCell>{`${user.creationTime}`}</TableCell>
                <TableCell>{`${user.lastSignInTime}`}</TableCell>
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