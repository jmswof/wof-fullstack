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

const ManageUsers: React.FC = () => {
  document.title = 'World of Floors - User Management';

  const {user} = useAuthContext();

  const [users, setUsers] = useState<[]>([]);

  useEffect(() => {
    fetch(process.env.WOF_SERVER + '/users', {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
      }
    })
    .then(response => response.json())
    .then(response => setUsers(response))
    .catch(error => console.log(error));
  }, []);
  
  return (
    <Container component={Paper} sx={{my:5, p: 2}}>
      <Box display={'flex'} justifyContent={'center'}>
        <Typography variant='h3'>World of Floor Users</Typography>
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
            {users.map((user, userIndex) => (
              <TableRow key={user['uid']}>
                <TableCell>{userIndex + 1}</TableCell>
                <TableCell>{user['email']}</TableCell>
                <TableCell>{user['emailVerified'] ? 'Yes' : 'No'}</TableCell>
                <TableCell>{user['disabled'] ? 'Yes' : 'No'}</TableCell>
                <TableCell>{user['creationTime']}</TableCell>
                <TableCell>{user['lastSignInTime']}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell align='center' colSpan={6}>
                <Typography variant='caption'>{users.length} Users</Typography>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ManageUsers;