import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useAuthContext } from '../../../context/AuthContext';
import { useEffect, useState } from 'react';

const JobService: React.FC = () => {

  const {user} = useAuthContext();
  const [jobServices, setJobServices] = useState<object[]>([]);
  const [label, setLabel] = useState<string>('');
  const [active, setActive] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetch(`${process.env.WOF_SERVER}/configure/job-service?type=all`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
      }
    })
    .then(response => response.json())
    .then(response => {
      setJobServices(response);
    })
    .catch(error => {
      console.log(error);
    })
  }, []);

  const submitCreate = () => {
    setError('');
    if (!label) {
      setError('Empty form fields cannot be added.');
      return;
    }

    fetch(`${process.env.WOF_SERVER}/configure/job-service`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
      },
      body: JSON.stringify({label, active})
    })
    .then(response => response.json())
    .then(response => {
      if (response.acknowledged === true && response.insertedId != null) {
        setJobServices([...jobServices, {'_id': response.insertedId, 'label': label, 'active': active}]);
        setActive(true);
        setLabel('');
      }
    })
    .catch(() => {
      setError('Please check your form data and try again.');
    })
  }

  return (
    <TableContainer sx={{maxHeight: '65vh'}}>
      { error && <Box display={'flex'} sx={{m: 3}} justifyContent={'center'}>
        <Alert variant='standard' color='error'>
          <Typography>{error}</Typography>
        </Alert>
      </Box>
      }
      <Table stickyHeader sx={{tableLayout: 'fixed'}}>
        <TableHead>
          <TableRow>
            <TableCell>
              <FormControl required>
                <InputLabel>Label</InputLabel>
                <Input value={label} onChange={(e) => setLabel(e.target.value)} />
                <FormHelperText>New Job Service to display</FormHelperText>
              </FormControl>
            </TableCell>
            <TableCell>
              <FormControl required>
                <FormControlLabel label='Active' control={<Checkbox value={active} onChange={e => setActive(!active)} checked={active} />} />
              </FormControl>
            </TableCell>
            <TableCell>
              <Button fullWidth variant='contained' onClick={submitCreate}>
                <Typography>Create Job Service</Typography>
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobServices.map((jobService, index) => {
            return (
            <TableRow key={index}>
              <TableCell>
                <Typography variant='h6'>{jobService['label']}</Typography>
              </TableCell>
              <TableCell>
                <Typography>{jobService['active'] ? 'Yes' : 'No'}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant='caption' fontSize={12}><pre>{JSON.stringify(jobService, null, 2)}</pre></Typography>
              </TableCell>
            </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell align='center' colSpan={3}>
              <Typography variant='caption'>{jobServices.length} Job Service(s)</Typography>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default JobService;