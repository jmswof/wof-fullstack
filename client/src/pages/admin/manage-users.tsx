import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useAuthContext } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';

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
    <Container sx={{mb:5}}>
      <Box display={'flex'} sx={{mt: 2}} justifyContent={'center'}>
        <Typography variant='h3'>World of Floors Users</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
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
              )
            )}
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