import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import { useAuthContext } from '../../../context/AuthContext';
import { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';

const Reference: React.FC = () => {

  const {user} = useAuthContext();
  const [references, setReferences] = useState<object[]>([]);
  const [label, setLabel] = useState<string>('');
  const [active, setActive] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
      fetch(`${process.env.WOF_SERVER}/configure/reference?type=all`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
        }
      })
      .then(response => response.json())
      .then(response => {
        setReferences(response);
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

    fetch(`${process.env.WOF_SERVER}/configure/reference`, {
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
      console.log(response.acknowledged === true);
      console.log(response.insertedId != null);
      if (response.acknowledged === true && response.insertedId != null) {
        setReferences([...references, {'_id': response.insertedId, 'label': label, 'active': active}]);
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
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>
              <FormControl required>
                <InputLabel>Label</InputLabel>
                <Input value={label} onChange={(e) => setLabel(e.target.value)} />
                <FormHelperText>How did you heard about us?</FormHelperText>
              </FormControl>
            </TableCell>
            <TableCell>
              <FormControl required>
                <FormControlLabel label="Active" control={<Checkbox value={active} onChange={e => setActive(!active)} checked={active} />} />
              </FormControl>
            </TableCell>
            <TableCell>
              <Button fullWidth variant='contained' onClick={submitCreate}>
                <Typography>Create Reference</Typography>
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {references.map((reference, index) => {
            return (
            <TableRow key={index}>
              <TableCell>
                <Typography variant='h6'>{reference['label']}</Typography>
              </TableCell>
              <TableCell>
                <Typography>{reference['active'] ? 'Yes' : 'No'}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant='caption' fontSize={12}><pre>{JSON.stringify(reference, null, 2)}</pre></Typography>
              </TableCell>
            </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell align='center' colSpan={3}>
              <Typography variant='caption'>{references.length} Reference(s)</Typography>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default Reference;