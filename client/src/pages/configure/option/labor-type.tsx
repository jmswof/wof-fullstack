import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useAuthContext } from '../../../context/AuthContext';
import { useEffect, useState } from 'react';
import { Alert, Button, Checkbox, FormControl, FormControlLabel, FormHelperText, Input, InputLabel, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';

const LaborType: React.FC = () => {
  document.title = 'World of Floors - Labor Type';
  const {user} = useAuthContext();
  const [labors, setLabors] = useState<object[]>([]);
  const [label, setLabel] = useState<string>('');
  const [short, setShort] = useState<string>('');
  const [active, setActive] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
      fetch(`${process.env.WOF_SERVER}/configure/labor-type?type=all`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
        }
      })
      .then(response => response.json())
      .then(response => {
        setLabors(response);
      })
      .catch(error => {
        console.log(error);
      })

  }, []);

  const submitCreate = () => {
    setError('');
    if (!label || !short) {
      setError('Empty form fields cannot be added.');
      return;
    }

    fetch(`${process.env.WOF_SERVER}/configure/labor-type`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
      },
      body: JSON.stringify({label, short, active})
    })
    .then(response => response.json())
    .then(response => {
      if (response.acknowledged === true && response.insertedId != null) {
        setLabors([...labors, {'_id': response.insertedId, 'label': label, 'short': short, 'active': active}]);
        setActive(true);
        setLabel('');
        setShort('');
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
                <FormHelperText>New Labor Type to display</FormHelperText>
              </FormControl>
            </TableCell>
            <TableCell>
              <FormControl required>
                <InputLabel>Short</InputLabel>
                <Input value={short} onChange={(e) => setShort(e.target.value)} />
                <FormHelperText>A shorter label</FormHelperText>
              </FormControl>
            </TableCell>
            <TableCell>
              <FormControl required>
                <FormControlLabel label='Active' control={<Checkbox value={active} onChange={e => setActive(!active)} checked={active} />} />
              </FormControl>
            </TableCell>
            <TableCell>
              <Button fullWidth variant='contained' onClick={submitCreate}>
                <Typography>Create Labor Type</Typography>
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {labors.map((labor, index) => {
            return (
            <TableRow key={index}>
              <TableCell>
                <Typography variant='h6'>{labor['label']}</Typography>
              </TableCell>
              <TableCell>
                <Typography>{labor['short']}</Typography>
              </TableCell>
              <TableCell>
                <Typography>{labor['active'] ? 'Yes' : 'No'}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant='caption' fontSize={12}><pre>{JSON.stringify(labor, null, 2)}</pre></Typography>
              </TableCell>
            </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell align='center' colSpan={4}>
              <Typography variant='caption'>{labors.length} Labor Type(s)</Typography>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default LaborType;