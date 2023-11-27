import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useAuthContext } from '../../context/AuthContext';
import { useEffect, useState } from 'react';

const SaleAgent: React.FC = () => {

  const {user} = useAuthContext();
  const [saleAgents, setSaleAgents] = useState<object[]>([]);
  const [firebaseUsers, setFirebaseUsers] = useState<object[]>([]);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [firebase, setFirebase] = useState<object>({});
  const [fid, setFid] = useState<string>('');
  const [active, setActive] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    Promise.all([
      fetch(`${process.env.WOF_SERVER}/configure/sale-agent?type=all`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
        }
      })
      .then(response => response.json()),
      fetch(`${process.env.WOF_SERVER}/configure/firebase-user?type=all`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
        }
      })
      .then(response => response.json())

    ]).then(([saleAgents, firebaseUsers]) => {
      setSaleAgents(saleAgents);
      setFirebaseUsers(firebaseUsers);
    });

  }, []);

  const submitCreate = () => {
    setError('');
    if (!firstName || !lastName || Object.keys(firebase).length === 0) {
      setError('Empty form fields cannot be added.');
      return;
    }

    fetch(`${process.env.WOF_SERVER}/configure/sale-agent`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
      },
      body: JSON.stringify({firstName, lastName, active, firebase})
    })
    .then(response => response.json())
    .then(response => {
      if (response.acknowledged === true && response.insertedId != null) {
        setSaleAgents([...saleAgents, {'_id': response.insertedId, 'firstName': firstName, 'lastName': lastName, 'active': active, 'firebase': firebase}]);
        setActive(true);
        setFirebase({});
        setFid('')
        setFirstName('');
        setLastName('');
      }
    })
    .catch(() => {
      setError('Please check your form data and try again.');
    })
  }

  return (
    <Container component={Paper} sx={{my: 5, p: 2}}>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'} sx={{m: 2}}>
        <Typography variant='h3'>Sale Agent</Typography>
      </Box>
      <TableContainer sx={{maxHeight: '65vh'}}>
        { error && <Box display={'flex'} sx={{m: 3}} justifyContent={'center'}>
          <Alert variant='standard' color='error'>
            <Typography>{error}</Typography>
          </Alert>
        </Box>
        }
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <FormControl required size='small'>
                  <InputLabel>First Name</InputLabel>
                  <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  <FormHelperText>First Name</FormHelperText>
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl required size='small'>
                  <InputLabel>Last Name</InputLabel>
                  <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  <FormHelperText>Last Name</FormHelperText>
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl required>
                  <FormControlLabel label='Active' control={<Checkbox value={active} onChange={e => setActive(!active)} checked={active} />} />
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl sx={{m: 1}} size='small'>
                  <InputLabel>Firebase User</InputLabel>
                  <Select sx={{width: '20rem'}}
                    value={fid}
                    onChange={ e => {
                      setFid(e.target.value);
                      setFirebase(firebaseUsers.find(firebaseUser => firebaseUser['uid'] === e.target.value));
                    }}
                    input={<OutlinedInput label='Firebase User' />}
                  >
                  { firebaseUsers.filter(fu => !saleAgents.some(sa => sa['firebase'].uid === fu['uid'])).map( firebaseUser => <MenuItem key={firebaseUser['uid']} value={firebaseUser['uid']}>{firebaseUser['email']}</MenuItem> ) }
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <Button fullWidth variant='contained' onClick={submitCreate}>
                  <Typography>Create Sale Agent</Typography>
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {saleAgents.map((saleAgent, index) => {
              return (
              <TableRow key={index}>
                <TableCell>
                  <Typography variant='h6'>{saleAgent['firstName']}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='h6'>{saleAgent['lastName']}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{saleAgent['active'] ? 'Yes' : 'No'}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{saleAgent['firebase'].email}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='caption' fontSize={9}><pre>{JSON.stringify(saleAgent['firebase'], null, 2)}</pre></Typography>
                </TableCell>
              </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell align='center' colSpan={5}>
                <Typography variant='caption'>{saleAgents.length} Sale Agent(s)</Typography>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default SaleAgent;
