import { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import WofRest from '../../rest/wof-rest';
import FirebaseUserType from '../../model/firebase-user-type';
import SaleAgentType from '../../model/sale-agent-type';

const SaleAgent: React.FC = () => {

  const wofRest = WofRest();
  const [error, setError] = useState<string>('');

  const [active, setActive] = useState<boolean>(true);
  const [firebase, setFirebase] = useState<FirebaseUserType | null>(null);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  const [saleAgents, setSaleAgents] = useState<SaleAgentType[]>([]);
  const [firebaseUsers, setFirebaseUsers] = useState<FirebaseUserType[]>([]);

  useEffect(() => {
    Promise.all([
      wofRest.firebaseUser.getAll('all'),
      wofRest.saleAgent.getAll('all')
    ]).then(([firebaseUsers, saleAgents]) => {
      setFirebaseUsers(firebaseUsers);
      setSaleAgents(saleAgents);
    });
  }, []);

  const submitCreate = () => {
    setError('');
    if (!firstName || !lastName || Object.keys(firebase).length < 1) {
      setError('Empty form fields cannot be added.');
      return;
    }

    wofRest.saleAgent.create(active, firebase, firstName, lastName)
      .then(response => {
        if (response.acknowledged === true && response.insertedId != null) {
          setSaleAgents([...saleAgents, {'_id': response.insertedId, firstName, lastName, active, firebase}]);
          setActive(true);
          setFirebase(null);
          setFirstName('');
          setLastName('');
        }
      })
      .catch(() => setError('Please check your form data and try again.'))
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
                <FormControl sx={{width: '100%'}}>
                  <Autocomplete value={firebase} clearOnBlur
                    options={firebaseUsers.filter(user => !saleAgents.some(agent => agent.firebase.uid === user.uid))}
                    componentsProps={{ popper: { style: { width: 'fit-content' }}}}
                    renderOption={(props, option) => <li {...props}>{option.email}</li>}
                    renderInput={(params) => <TextField {...params} label="Firebase User" error={!firebase} />}
                    getOptionLabel={option => option.email}
                    onChange={(event, option) => setFirebase(option)}
                  />
                </FormControl>
              </TableCell>
              <TableCell>
                <Button fullWidth variant='contained' onClick={submitCreate}>
                  <Typography>Create</Typography>
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {saleAgents.map((saleAgent, index) => {
              return (
              <TableRow key={index}>
                <TableCell>
                  <Typography variant='h6'>{saleAgent.firstName}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='h6'>{saleAgent.lastName}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{saleAgent.active ? 'Yes' : 'No'}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{saleAgent.firebase.email}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='caption' fontSize={9}><pre>{JSON.stringify(saleAgent.firebase, null, 2)}</pre></Typography>
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
